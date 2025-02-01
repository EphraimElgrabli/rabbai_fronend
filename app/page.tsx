"use client";

import React, { useState, useRef, useEffect } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      const response = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: input }),
      });

      const data = await response.json();
      
      // Add main answer
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: data.answer,
          isUser: false,
        }
      ]);

      // Add each Q&A pair as separate messages
      data.qa_list.forEach((qa, index) => {
        setMessages(prev => [
          ...prev,
          {
            id: Date.now() + index + 2,
            text: `Question:\n${qa.question}\n\nAnswer:\n${qa.answer}`,
            isUser: false,
            isQA: true,
          }
        ]);
      });
    } catch (error) {
      console.error("Error:", error);
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
      <div className="relative w-[95%] h-[90%] rounded-3xl bg-[#E6DABE] flex flex-col">
        <div className="absolute top-4 right-4 text-xs text-[#FFF6E2]">בס"ד</div>

        {/* Messages container */}
        <div className="h-[calc(100%-80px)] overflow-y-auto px-4 pt-12">
          <div className="flex flex-col w-full">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? "justify-end" : "justify-start"} mb-4`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    message.isUser
                      ? "bg-[#FFF6E2] ml-4"
                      : message.isQA
                      ? "bg-[#cfc0a3]"
                      : "bg-[#d4c4a8] mr-4"
                  }`}
                >
                  <p
                    className={`text-right whitespace-pre-line ${
                      message.isUser ? "text-gray-800" : "text-[#5a4d3a]"
                    }`}
                  >
                    {message.text}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="max-w-[70%] rounded-lg p-4 bg-[#d4c4a8]">
                  <p className="text-right text-[#5a4d3a]">...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input container - fixed height */}
        <div className="h-20 bg-[#E6DABE] rounded-b-3xl border-t border-[#d4c4a8] flex items-center px-4">
          <div className="w-full flex items-center">
            <button
              type="button"
              onClick={handleSend}
              disabled={isLoading}
              className={`mr-4 h-12 w-12 ${
                isLoading ? "bg-[#EEE]" : "bg-[#FFF6E2]"
              } rounded-full flex items-center justify-center hover:bg-[#fff]`}
            >
              <img src="/send-icon.svg" alt="Send" className="flip-vertical" />
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