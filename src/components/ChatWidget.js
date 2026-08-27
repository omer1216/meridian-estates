"use client";

import { useState, useRef, useEffect } from "react";
import { FiMessageCircle, FiX, FiSend } from "react-icons/fi";
import ReactMarkdown from "react-markdown";

const markdownComponents = {
  p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
  ul: ({ children }) => <ul className="list-disc pl-4 mb-1.5 space-y-0.5">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-4 mb-1.5 space-y-0.5">{children}</ol>,
  li: ({ children }) => <li>{children}</li>,
  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  a: ({ children, href }) => (
    <a href={href} className="underline" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
};

export default function ChatWidget({ isOpen, onToggle, hidden }) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm here to help with questions about our properties, pricing, or the buying process. What can I help you with?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    setIsLoading(false);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="w-80 h-96 bg-white border border-[#DDD8CC] rounded-lg shadow-xl flex flex-col mb-3">
          <div className="bg-[#1C2B2E] text-[#FAF8F4] px-4 py-3 rounded-t-lg font-serif font-semibold">
            Meridian Estates Assistant
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`text-sm max-w-[85%] px-3 py-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-[#B08D57] text-white ml-auto"
                    : "bg-[#FAF8F4] text-[#3A3F3D]"
                }`}
              >
                {msg.role === "assistant" ? (
                  <ReactMarkdown components={markdownComponents}>{msg.content}</ReactMarkdown>
                ) : (
                  msg.content
                )}
              </div>
            ))}
            {isLoading && (
              <div className="bg-[#FAF8F4] text-[#6B6F6C] text-sm px-3 py-2 rounded-lg w-fit">
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="flex border-t border-[#DDD8CC] p-2 gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 text-sm px-2 py-1.5 outline-none"
            />
            <button type="submit" className="bg-[#B08D57] text-white p-2 rounded-md">
              <FiSend size={14} />
            </button>
          </form>
        </div>
      )}

      {!hidden && (
        <button
          onClick={onToggle}
          className="bg-[#B08D57] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-xl"
        >
          {isOpen ? <FiX /> : <FiMessageCircle />}
        </button>
      )}
    </div>
  );
}