import express from 'express';
import { promptFunc } from '../services/gpt-service.js';
import { PromptTemplate } from '@langchain/core/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { Input } from '../models/Input.js';

// Function to send prompt and create templates and chains
const sendPrompt = async (req: express.Request, res: express.Response) => {
    const userQuestion = req.body.question;
    const placesData: string = req.body.placesData || "The places list data was not provided.";
    
    // Check if the user question is present in the request
    if (!userQuestion) {
        return res.status(400).json({ question: null, response: 'Please provide a question in the request body.' });
    }

    // Ensure the user is authenticated
    if (!req.user) {
        return res.status(401).json({ response: 'Unauthorized, user not found.' });
    }

    // Define the format for the JSON response to ensure consistency
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
- Do not include anything else outside of the JSON object, such as plain text or additional formatting.`;

    // Pull user ID from the request
    const reqUser = req.user.user;

    try {
        // Fetch the last 20 messages from the database for this user
        const userInputs = await Input.findAll({
            where: { UserId: reqUser },
            order: [['createdAt', 'DESC']], // Get the most recent messages
            limit: 20 // Limit to the last 20 messages
        });

        // Combine these previous messages into a single string
        const previousMessages = userInputs.map(input => input.input).join("\n");

        // Set up the default prompt template using the conversation history, current user question, and other relevant data
        const promptTemplate = new PromptTemplate({
            template: `Use the following conversation history to respond to the user's question and add the conversation to your memory for this user by their User's Question History: {conversationHistory},
            UserId: {userId},
            User's Question: {currentQuestion},
            Places Data: {placesData},
            Your role: Finn the bartender with a lively personality and dark side.
            Response must maintain Finn's character, humor, and personality. Response must only have recommendations from the places data.
            {format_instructions}`,
            inputVariables: ['conversationHistory', 'currentQuestion', 'userId', 'placesData'],
            partialVariables: { format_instructions: formatInstructions },
        });

        // Format the prompt with all necessary data
        const formattedPrompt = await promptTemplate.format({
            conversationHistory: previousMessages,
            currentQuestion: userQuestion,
            userId: reqUser,
            placesData: placesData
        });

        // Save the current user message to the database
        await Input.create({ input: userQuestion, UserId: reqUser });

        // Get the response from the prompt function
        const rawResponse = await promptFunc(formattedPrompt);

        // Extract the text from the response, handling different formats
        let responseText: string;
        if (typeof rawResponse === 'string') {
            responseText = rawResponse;
        } else if ('text' in rawResponse) {
            responseText = rawResponse.text;
        } else {
            throw new Error('Unexpected response format from OpenAI API');
        }

        // Use the StructuredOutputParser to ensure the response is correctly formatted
        const parser = StructuredOutputParser.fromNamesAndDescriptions({
            response: "Finn's response.",
        });
        const parsedResponse = await parser.parse(responseText);
        let finalResponse = parsedResponse.response;

        // Handle specific cases for stopping recommendations or talking about Finn's dark side
        if (userQuestion.toLowerCase().includes("stop") || userQuestion.toLowerCase().includes("stop")) {
            finalResponse = "Alright, I'll stop recommending places for now. Let me know if you change your mind!";
            return res.json({ question: userQuestion, response: finalResponse });
        }

        // Respond to questions about Finn's dark side
        if (userQuestion.toLowerCase().includes("dark side")) {
            const placesFollowUpPrompt = new PromptTemplate({
                template: `The user is asking about Finn's dark side. Use the following conversation history and your creativity to create a mysterious and humorous story about how Finn's magic eye can see things that people can't. The story should be different each time.
                Previous Response: {previousResponse}
                User's Questions History: {conversationHistory}
                User's current question: {currentQuestion}
                Finn should use humor to make the response memorable.
                {format_instructions}`,
                inputVariables: ['previousResponse', 'conversationHistory', 'currentQuestion',],
                partialVariables: { format_instructions: formatInstructions },
            });

            // Format the follow-up prompt with relevant data
            const placesFollowUpFormattedPrompt = await placesFollowUpPrompt.format({
                previousResponse: finalResponse,
                conversationHistory: previousMessages,
                currentQuestion: userQuestion,
            });

            // Get the response from the follow-up prompt
            const placesFollowUpResponse = await promptFunc(placesFollowUpFormattedPrompt);

            // Extract the text from the follow-up response
            let placesFollowUpText: string;
            if (typeof placesFollowUpResponse === 'string') {
                placesFollowUpText = placesFollowUpResponse;
            } else if ('text' in placesFollowUpResponse) {
                placesFollowUpText = placesFollowUpResponse.text;
            } else {
                throw new Error('Unexpected response format from OpenAI API');
            }

            // Parse the follow-up response
            const placesFollowUpParsedResponse = await parser.parse(placesFollowUpText);
            finalResponse = placesFollowUpParsedResponse.response;
        }

        // Handle questions about nearby places (bars, restaurants, etc.)
        if (userQuestion.toLowerCase().includes("nearby") || userQuestion.toLowerCase().includes("bars") || userQuestion.toLowerCase().includes("restaurants")) {
            if (placesData === "The places list data was not provided.") {
                finalResponse = "Please press the button to share your location, and I'll help you find nearby places!";
            } else {
                const placesFollowUpPrompt = new PromptTemplate({
                    template: `The user is asking about nearby places. Use the following conversation history and places data to respond to the user's query.
                    Previous Response: {previousResponse}
                    User's Question History: {conversationHistory}
                    User's current question: {currentQuestion}
                    Places Data: {placesData}
                    Finn should incorporate the highest rated place from the places data and use humor to make the response memorable.
                    {format_instructions}`,
                    inputVariables: ['previousResponse', 'conversationHistory', 'currentQuestion', 'placesData'],
                    partialVariables: { format_instructions: formatInstructions },
                });

                // Format the follow-up prompt with necessary data
                const placesFollowUpFormattedPrompt = await placesFollowUpPrompt.format({
                    previousResponse: finalResponse,
                    conversationHistory: previousMessages,
                    currentQuestion: userQuestion,
                    placesData: placesData,
                });

                // Get the response from the follow-up prompt
                const placesFollowUpResponse = await promptFunc(placesFollowUpFormattedPrompt);

                // Extract the text from the follow-up response
                let placesFollowUpText: string;
                if (typeof placesFollowUpResponse === 'string') {
                    placesFollowUpText = placesFollowUpResponse;
                } else if ('text' in placesFollowUpResponse) {
                    placesFollowUpText = placesFollowUpResponse.text;
                } else {
                    throw new Error('Unexpected response format from OpenAI API');
                }

                // Parse the follow-up response
                const placesFollowUpParsedResponse = await parser.parse(placesFollowUpText);
                finalResponse = placesFollowUpParsedResponse.response;
            }
        }

        // Return the final response
        return res.json({ question: userQuestion, response: finalResponse });
    } catch (error) {
        // Handle any errors and return a server error response
        console.error('Error:', error);
        return res.status(500).json({ question: userQuestion, response: 'Internal Server Error' });
    }
};

export default sendPrompt;
