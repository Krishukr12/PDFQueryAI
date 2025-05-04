"use client";
import { useAxiosWithAuth } from "@/hooks/useAxiosWithAuth";
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChatLoader } from "./ChatLoader";

interface Imessage {
  role: "AI" | "USER";
  content: string;
}

interface IChat {
  success: boolean;
  chat: string;
}

export const ChatSection: React.FC = () => {
  const axiosWithAuth = useAxiosWithAuth();
  const [input, setInput] = useState("");
  const [messages, setMessage] = useState<Imessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const updatedMessages = [
      ...messages,
      { role: "USER" as const, content: trimmed },
    ];
    setMessage(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const { data } = await axiosWithAuth.post<IChat>("/chat/post", {
        chat: trimmed,
      });

      setMessage((prev) => [...prev, { role: "AI", content: data.chat }]);
    } catch (err) {
      console.log(err);
      setMessage((prev) => [
        ...prev,
        { role: "AI", content: "⚠️ Failed to get response. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getUserChatHistory = async () => {
      try {
        const response = await axiosWithAuth.get<{ data: Imessage[] }>(
          "/chat/all-chats"
        );
        if (response.data) {
          setMessage(response.data.data);
        }
      } catch (err) {
        console.log("Failed to fetch chat history", err);
      } finally {
        setInitialLoading(false);
      }
    };

    getUserChatHistory();
  }, [axiosWithAuth]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  return (
    <section className="flex flex-col h-full border rounded-lg border-dashed">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {initialLoading ? (
          <div className="text-sm text-muted-foreground italic">
            Loading chat history...
          </div>
        ) : messages.length === 0 ? (
          <div className="text-sm text-muted-foreground italic">
            No chats yet. Start a conversation!
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.role === "USER" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg shadow-sm
                ${
                  msg.role === "USER"
                    ? "bg-muted text-foreground rounded-br-none"
                    : "bg-muted-foreground/10 text-muted-foreground rounded-bl-none"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="max-w-xs px-4 py-2 rounded-lg shadow-sm bg-muted-foreground/10 text-muted-foreground rounded-bl-none">
              <ChatLoader />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="border-t flex items-center gap-2 p-4"
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
          disabled={loading}
        >
          <Send />
        </button>
      </form>
    </section>
  );
};
