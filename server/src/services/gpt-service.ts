import { ChatOpenAI } from '@langchain/OpenAI';
import dotenv from 'dotenv';
dotenv.config();

// Get the OpenAI API key from the environment variables
const apiKey = process.env.OPENAI_API_KEY;

let model: ChatOpenAI;

if (apiKey) {
    // Initialize the OpenAI model if the API key is provided
    model = new ChatOpenAI({ temperature: 0, openAIApiKey: apiKey, modelName: 'gpt-3.5-turbo' });
}
else {
    console.error('OPENAI_API_KEY is not configured.');
}

// Call the OpenAI API to get a response for the input
export const promptFunc = async (input:string) => {
    try {
        if (model) {
            const response = await model.invoke(input);
            return response;
        }
        return 'No OpenAI API key provided. Unable to provide a response.';
    }
    catch (err) {
        console.error(err);
        throw err;
    }
};
