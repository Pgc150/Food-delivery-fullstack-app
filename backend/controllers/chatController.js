import express from 'express'
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatbot = async(req,res) => {


    try {
        const {message,history} = req.body;
        

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        const formattedHistory = (history || []).map(msg => ({
            role:msg.sender === "user" ? "user" : "model",
            parts : [{text:msg.text}]
        }))

        const chat = model.startChat({
            history:formattedHistory
        })

        const result = await chat.sendMessage([
            {text:message}
        ]) 

        // const result = await chat.sendMessage(message)
        const responseText = await result.response.text();
        
        res.json({ response: responseText });
       
    } catch (error) {
        console.error("Error connecting to Gemini",error);
        res.status(500).json({error:"Failed to generate response"})
    }
}

export default chatbot