"use client";

import React, { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");

  return (
    <div className="flex h-screen items-center justify-center">
      {/* Outer Card */}
      <div className="relative w-[95%] h-[90%] rounded-3xl bg-[#E6DABE] flex flex-col items-center justify-center">
        {/* Text at the top */}
        <div className="absolute top-4 right-4 text-xs text-[#FFF6E2]">
           בס"ד
        </div>

        {/* Centered Icon */}
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="h-64 w-64 rounded-full flex items-center justify-center">
            <img src="/rabbi.svg" alt="Icon" className="h-48 w-48" />
          </div>
        </div>

        <div className="absolute bottom-4 w-11/12">
          <div className="flex items-center">
          <button
              type="button"
              className="mr-4 h-12 w-12 bg-[#FFF6E2] rounded-full flex items-center justify-center hover:bg-[#fff]"
            >
              <img src="/send-icon.svg" alt="Send" className="flip-vertical" />
            </button>

            <input
              type="text"
              dir="rtl"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="שאל את הרב מה ההלכה לגבי..."
              className="flex-grow rounded-lg border-none p-4 bg-[#FFF6E2] text-right focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
