import express from 'express';
import { promptFunc } from '../services/gpt-service.js';
import { PromptTemplate } from '@langchain/core/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';
import dotenv from 'dotenv';
import { Input } from '../models/Input.js';
dotenv.config();

const sendPrompt = async (req: express.Request, res: express.Response) => {
    const userQuestion = req.body.question;
    const placesData: string = req.body.placesData || "The places list data was not provided.";

    if (!userQuestion) {
        return res.status(400).json({ question: null, response: 'Please provide a question in the request body.' });
    }

    if (!req.user) {
        return res.status(401).json({ response: 'Unauthorized, user not found.' });
    }

    const formatInstructions = `You must always return valid JSON in the following format:
{
  "response": "Your response here"
}

- The "response" field should contain a plain text response.
- The JSON object should not include any extra fields, unexpected tokens, or non-JSON elements.
- If there is an error or the output cannot be structured properly, return the following JSON structure instead:
{
  "error": "Your error message here"
}
- Do not include anything else outside of the JSON object, such as plain text or additional formatting.

Please ensure that the JSON structure is always correct and valid, with no additional characters, newlines, or other non-JSON elements.`;

    // console.log(req.user);
    const reqUser = req.user.user;

    try {
        const userInputs = await Input.findAll({ 
            where: { UserId: reqUser },
            order: [['createdAt', 'DESC']], // order by most recent
            limit: 20 // fetch only last 20
         });
        const previousMessages = userInputs.map(input => input.input).join("\n");

        const promptTemplate = new PromptTemplate({
            template: `Use the following conversation history to respond to the user's question and add the conversation to your memory for this userId: {conversationHistory}
            UserId: {userId}
            User's Question: {currentQuestion}
            Your role: Finn the bartender with a lively personality and dark side.
            Response must maintain Finn's character, humor, and personality.
            If asked about Finn's darkside, tell a dark and humorous story about Finn's magical eye that sees all.
            {format_instructions}`,
            inputVariables: ['conversationHistory', 'currentQuestion', 'userId'],
            partialVariables: { format_instructions: formatInstructions },
        });

        const formattedPrompt = await promptTemplate.format({
            conversationHistory: previousMessages,
            currentQuestion: userQuestion,
            userId: reqUser
        });

        await Input.create({ input: userQuestion, UserId: reqUser });

        const rawResponse = await promptFunc(formattedPrompt);

        let responseText: string;
        if (typeof rawResponse === 'string') {
            responseText = rawResponse;
        } else if ('text' in rawResponse) {
            responseText = rawResponse.text;
        } else {
            throw new Error('Unexpected response format from OpenAI API');
        }

        const parser = StructuredOutputParser.fromNamesAndDescriptions({
            response: "Finn's response.",
        });
        const parsedResponse = await parser.parse(responseText);
        let finalResponse = parsedResponse.response;

        if (finalResponse.includes("game")) {
            // If the AI suggests a game, trigger another prompt for game setup
            const followUpPrompt = new PromptTemplate({
                template: `The user wants to play a game. Use the following history to set up the game response.

                Finn can play the following text based games with the user: 20 Questions, Text Adventure, Riddles and Brain Teasers, Hangman, Guess the Number, Story Builder, Would You Rather?, Trivia Quiz and will offer to start a randomly selected game.

                Previous Response: {previousResponse}
                Conversation History: {conversationHistory}
                User's current question: {currentQuestion}

                Prepare Finn to guide the user through the game. Finn should use humor and be engaging.
                {format_instructions}`,
                inputVariables: ['previousResponse', 'conversationHistory', 'currentQuestion'],
                partialVariables: { format_instructions: formatInstructions },
            });

            // Format the follow-up prompt
            const followUpFormattedPrompt = await followUpPrompt.format({
                previousResponse: finalResponse,
                conversationHistory: previousMessages,
                currentQuestion: userQuestion,
            });

            // Call the AI with the follow-up prompt
            const followUpResponse = await promptFunc(followUpFormattedPrompt);

            // Parse and send the follow-up response back to the user
            let followUpText: string;
            if (typeof followUpResponse === 'string') {
                followUpText = followUpResponse;
            } else if ('text' in followUpResponse) {
                followUpText = followUpResponse.text;
            } else {
                throw new Error('Unexpected response format from OpenAI API');
            }

            const followUpParsedResponse = await parser.parse(followUpText);
            finalResponse = followUpParsedResponse.response;
        }


        // Check if the user is asking about nearby places
        if (userQuestion.toLowerCase().includes("nearby") || userQuestion.toLowerCase().includes("bars") || userQuestion.toLowerCase().includes("restaurants")) {
            if (placesData === "The places list data was not provided.") {
                finalResponse = "Please press the button to share your location, and I'll help you find nearby places!";
            } else {
                const placesFollowUpPrompt = new PromptTemplate({
                    template: `The user is asking about nearby places. Use the following conversation history and places data to respond to the user's query.
                    Previous Response: {previousResponse}
                    Conversation History: {conversationHistory}
                    User's current question: {currentQuestion}
                    Places Data: {placesData}
                    Prepare Finn to guide the user to nearby places in a fun, engaging, and humorous way. Finn should incorporate the highest rated place from the places data and use humor to make the response memorable.
                    {format_instructions}`,
                    inputVariables: ['previousResponse', 'conversationHistory', 'currentQuestion', 'placesData'],
                    partialVariables: { format_instructions: formatInstructions},
                });

                const placesFollowUpFormattedPrompt = await placesFollowUpPrompt.format({
                    previousResponse: finalResponse,
                    conversationHistory: previousMessages,
                    currentQuestion: userQuestion,
                    placesData: placesData,
                });

                const placesFollowUpResponse = await promptFunc(placesFollowUpFormattedPrompt);

                let placesFollowUpText: string;
                if (typeof placesFollowUpResponse === 'string') {
                    placesFollowUpText = placesFollowUpResponse;
                } else if ('text' in placesFollowUpResponse) {
                    placesFollowUpText = placesFollowUpResponse.text;
                } else {
                    throw new Error('Unexpected response format from OpenAI API');
                }

                const placesFollowUpParsedResponse = await parser.parse(placesFollowUpText);
                finalResponse = placesFollowUpParsedResponse.response;
            }
        }

        return res.json({ question: userQuestion, response: finalResponse });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ question: userQuestion, response: 'Internal Server Error' });
    }
};


export default sendPrompt;
