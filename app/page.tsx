"use client";

import React, { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Test user message", isUser: true },
    { id: 2, text: "Test bot response", isUser: false }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const newMessage = {
      id: Date.now(),
      text: input,
      isUser: true,
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    
    try {
      setIsLoading(true);
      // Send to backend
      const response = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();
      console.log("API Response:", data); // Debug API response
      
      // Add bot response
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: data.answer, // Adjust based on your API response structure
          isUser: false,
        }
      ]);
    } catch (error) {
      console.error("Error:", error);
      // Add error message
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Sorry, there was an error processing your request",
          isUser: false,
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative w-[95%] h-[90%] rounded-3xl bg-[#E6DABE] flex flex-col items-center justify-center">
        {/* Text at the top */}
        <div className="absolute top-4 right-4 text-xs text-[#FFF6E2]">בס"ד</div>

        {/* Messages container */}
        <div className="flex flex-col w-full min-h-[500px] mt-4 overflow-y-auto px-4 border border-red-500">
          {console.log("Rendering messages:", messages)} {/* Debugging */}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-start" : "justify-end"} mb-4 w-full border border-black`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-4 ${
                  message.isUser
                    ? "bg-[#FFF6E2] ml-4"
                    : "bg-[#d4c4a8] mr-4"
                }`}
              >
                <p className={`text-right ${message.isUser ? "text-gray-800" : "text-[#5a4d3a]"}`}>
                  {message.text}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-end mb-4 w-full pr-4">
              <div className="max-w-[70%] rounded-lg p-4 bg-[#d4c4a8]">
                <p className="text-right text-[#5a4d3a]">...</p>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="absolute bottom-4 w-11/12">
          <div className="flex items-center">
            <button
              type="button"
              onClick={handleSend}
              disabled={isLoading}
              className={`mr-4 h-12 w-12 ${
                isLoading ? "bg-[#EEE]" : "bg-[#FFF6E2]"
              } rounded-full flex items-center justify-center hover:bg-[#fff]`}
            >
              <img
                src="/send-icon.svg"
                alt="Send"
                className="flip-vertical"
              />
            </button>

            <input
              type="text"
              dir="rtl"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="שאל את הרב מה ההלכה לגבי..."
              className="flex-grow rounded-lg border-none p-4 bg-[#FFF6E2] text-right focus:outline-none"
              disabled={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}