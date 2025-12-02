import express from 'express'
import dotenv from 'dotenv'
import chatbot from "../controllers/chatController.js";
dotenv.config()

const chatRoute = express.Router();
chatRoute.post('/chat',chatbot)

export default chatRoute

