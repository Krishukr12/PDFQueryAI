"use client";
import { Send } from "lucide-react";
import { useState } from "react";

export const ChatSection: React.FC = () => {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    { role: "user", content: "What is the summary of this PDF?" },
    {
      role: "ai",
      content:
        "The PDF discusses the impact of AI on modern education, highlighting key trends and challenges.",
    },
    { role: "user", content: "What is the summary of this PDF?" },
    {
      role: "ai",
      content:
        "The PDF discusses the impact of AI on modern education, highlighting key trends and challenges.",
    },
    { role: "user", content: "What is the summary of this PDF?" },
    {
      role: "ai",
      content:
        "The PDF discusses the impact of AI on modern education, highlighting key trends and challenges.",
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
  };

  return (
    <section className="flex flex-col h-full border rounded-lg border-dashed">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg shadow-sm
                ${
                  msg.role === "user"
                    ? "bg-muted text-foreground rounded-br-none"
                    : "bg-muted-foreground/10 text-muted-foreground rounded-bl-none"
                }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSend}
        className="border-t  flex items-center gap-2 p-4"
      >
        <input
          type="text"
          className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-md border bg-card text-foreground hover:bg-muted transition cursor-pointer"
        >
          <Send />
        </button>
      </form>
    </section>
  );
};
