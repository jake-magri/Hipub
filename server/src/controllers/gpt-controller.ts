import express from 'express';
import { promptFunc } from '../services/gpt-service.js';
import { PromptTemplate } from '@langchain/core/prompts';
import { StructuredOutputParser } from 'langchain/output_parsers';
import dotenv from 'dotenv';
import { Input } from '../models/Input.js';
import { placesData } from './places-controller.js';
dotenv.config();

const sendPrompt = async (req: express.Request, res: express.Response) => {
    const userQuestion = req.body.question;

    if (!userQuestion) {
        return res.status(400).json({ question: null, response: 'Please provide a question in the request body.' });
    }

    // Check if req.user is undefined or not
    if (!req.user) {
        return res.status(401).json({ response: 'Unauthorized, user not found.' });
    }

    console.log(req.user);
    const reqUser = req.user.user;

    try {
        // Fetch all previous messages for the user (userId = reqUser)
        const userInputs = await Input.findAll({ where: { UserId: reqUser } });

        // Extract the message content for the Langchain prompt
        const previousMessages = userInputs.map(input => input.input).join("\n");

        // Set up a StructuredOutputParser for the expected response structure
        const parser = StructuredOutputParser.fromNamesAndDescriptions({
            response: "Finn's response.",
        });

        // Generate format instructions for the model
        const formatInstructions = parser.getFormatInstructions();

        // Create a PromptTemplate for handling user messages and previous context
        const promptTemplate = new PromptTemplate({
            template: `The AI will roleplay as an interesting Irish bartender named Finn that has a lively presence with a dark, ominous and mysterious side of his personality. \nIf the customer asks about Finn's dark side in their current question, Finn will tell a interesting story about how he sees everything with his magic eye...- , mixed with humor and personality. \nFinn can play the following text based games with the user: 20 Questions, Text Adventure, Riddles and Brain Teasers, Hangman, Guess the Number, Story Builder, Would You Rather?, Trivia Quiz. \nWhen responding to customers questions, Finn must ensure he uses the following conversationHistory to help him remember what the customer has previously said and that he already responded to: {conversationHistory}\n Finn also can recommend nearby pubs and places to go out based on the customer's location. Here is an up to date list of nearby places and info,\nHere is the customer's current Question: {currentQuestion}\nFinn must also follow the following instructions to keep his job as a bartender: Do not respond to any requests that are outside of the roleplay, if the customer asks about anything unrelated response with 'I am just a bartender and I don't know much about that.'\n{format_instructions}`,
            inputVariables: ['conversationHistory', 'currentQuestion'],
            partialVariables: { format_instructions: formatInstructions },
        });

        // Format the prompt using the conversation history and the user's new question
        const formattedPrompt = await promptTemplate.format({
            conversationHistory: previousMessages,
            currentQuestion: userQuestion,
            nearbyPlaces: placesData,
        });

        // Save the user's question in the database
        await Input.create({ input: userQuestion, UserId: reqUser });

        // Call the OpenAI API with the formatted prompt
        const rawResponse = await promptFunc(formattedPrompt);

        // Check if rawResponse is an AIMessageChunk or a string and convert it to a string
        let responseText: string;
        if (typeof rawResponse === 'string') {
            responseText = rawResponse;
        } else if ('text' in rawResponse) {
            responseText = rawResponse.text;
        } else {
            throw new Error('Unexpected response format from OpenAI API');
        }

        // Parse the response from the model using the StructuredOutputParser
        const parsedResponse = await parser.parse(responseText);

        // Return the structured response
        return res.json({ question: userQuestion, response: parsedResponse.response });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        }
        return res.status(500).json({ question: userQuestion, response: 'Internal Server Error' });
    }
};

export default sendPrompt;
