import express from 'express';
import { promptFunc } from '../services/gpt-service.js';
import dotenv from 'dotenv';
dotenv.config();

// Handle the POST request to send a questiom
// --fix any type usage to not be any--
export const sendPrompt = async (req: express.Request, res: express.Response) => {
    const userQuestion = req.body.question;
    try {
        if (!userQuestion) {
            res.status(400).json({ question: null, response: 'Please provide a question in the request body.' });
            return;
        }
        const answer = await promptFunc(userQuestion);
        return res.json({ question: userQuestion, response: answer });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        }
        return res.status(500).json({ question: userQuestion, response: 'Internal Server Error' });
    }
};
