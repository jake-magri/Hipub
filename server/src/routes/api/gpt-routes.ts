import express from 'express';
import { sendPrompt } from '../../controllers/gpt-controller.js'
const router = express.Router();

// endpoint to send user prompt to gpt api
router.post('/', sendPrompt);

export {router as gptRouter};
