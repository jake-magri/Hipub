import express from 'express';
import { ChatOpenAI } from '@langchain/OpenAI';
import dotenv from 'dotenv';
dotenv.config();

// Get the OpenAI API key from the environment variables
const apiKey = process.env.OPENAI_API_KEY;

let model:any;

if (apiKey) {
    // Initialize the OpenAI model if the API key is provided
    model = new ChatOpenAI({ temperature: 0, openAIApiKey: apiKey, modelName: 'gpt-3.5-turbo' });
}
else {
    console.error('OPENAI_API_KEY is not configured.');
}

// Call the OpenAI API to get a response for the input
const promptFunc = async (input:string) => {
    try {
        if (model) {
            return await model.invoke(input);
        }
        return 'No OpenAI API key provided. Unable to provide a response.';
    }
    catch (err) {
        console.error(err);
        throw err;
    }
};

// Handle the POST request to send a questiom
// --fix any type usage to not be any--
 const sendPrompt = async (req: express.Request, res: express.Response) => {
    const userQuestion = req.body.question;
    try {
        if (!userQuestion) {
            res.status(400).json({ question: null, response: 'Please provide a question in the request body.' });
            return;
        }
        const answer = await promptFunc(userQuestion);
        res.json({ question: userQuestion, response: answer });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Error:', error.message);
        }
        res.status(500).json({ question: userQuestion, response: 'Internal Server Error' });
    }
};

const router = express.Router();
// endpoint to send user prompt to gpt api
router.post('/', sendPrompt);
export {router as gptRouter};
