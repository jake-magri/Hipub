import express from 'express';
import { promptFunc } from '../services/gpt-service.js';
import dotenv from 'dotenv';
dotenv.config();
import { Input } from '../models/Input.js'

// Handle the POST request to send a questiom
// --fix any type usage to not be any--
const sendPrompt = async (req: express.Request, res: express.Response) => {
    const userQuestion = req.body.question;
    try {
        if (!userQuestion) {
            res.status(400).json({ question: null, response: 'Please provide a question in the request body.' });
            return;
        }

        // Check if req.user is undefined or not
        if (!req.user) {
            return res.status(401).json({ response: 'Unauthorized, user not found.' });
        }

        console.log(req.user);

        // store user input from the promp to Input Model and create new 
        const reqUser = req.user.user;
        await Input.create({ input: userQuestion, UserId: reqUser });

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

export default sendPrompt;
