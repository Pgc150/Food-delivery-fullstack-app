import { create } from 'zustand'
import axios from 'axios'

export const useChatStore = create((set,get)=>({
    messages:[],
    loading:false,
    error:null,


    sendMessage : async(text) => {
        const {messages} = get();

        const userMsg = {sender:"user",text};
        set({messages:[...messages,userMsg],loading:true})

        try {
            const res = await axios.post('http://localhost:4000/api/chat',{
                message:text,
                history:[...messages,userMsg]
            })

            const botMsg = {
                sender: "model",
                text:res.data.response,
            }

            set({
                messages:[...messages, userMsg, botMsg],
                loading:false,
            })
        } catch (error) {
            console.error(error);
            set({loading:false,error:"Failed to connect to AI"})
        }

    },

    clearChat:() => set({messages : [] }),
}))