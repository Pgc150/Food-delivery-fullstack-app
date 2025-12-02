import React, { useState ,useRef,useEffect} from "react";
import { useChatStore } from "../../Context/chatapi";
import axios from "axios";
import "./Chatbot.css"; // Import CSS

export default function Chatbot() {
  const {messages, loading ,sendMessage} = useChatStore();
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleSend = () => {
    if(!input.trim()) return;
    sendMessage(input);
    setInput("")
  };

  return (
    <div id="chat-bot">
      {/* Chat Icon */}
      <button className="chat-btn" onClick={() => setOpen(!open)}>
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className="chat-window">
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  margin: "8px 0",
                }}
              >
                <div
                  className="chat-bubble"
                  style={{
                    background: msg.sender === "user" ? "#efcfbbff " : "#fff",
                    borderRadius: "12px",
                    padding: "10px 14px",
                    maxWidth: "70%",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  }}
                >
                  {msg.text}
                </div>
           </div>

            ))}
            {loading && (
               <div style={{ textAlign: "left", color: "gray" }}>Thinking...</div>
            )}
          </div>

          <div className="chat-input-area">
            <input
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
            />
            <button className="send-btn" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

