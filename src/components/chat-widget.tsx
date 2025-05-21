"use client";

import { Bot, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { List } from "~/components/ui/list";
import { ListItem } from "~/components/ui/typography/list-item";
import { Link } from "./ui/typography";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const isChatEnabled = process.env.NEXT_PUBLIC_ENABLE_CHAT === "true";

function ChatWidgetImpl() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sessionId = useRef(crypto.randomUUID());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: sessionId.current,
          message: input,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to get response");
      }

      const data = await response.json();

      if (!data.output) {
        throw new Error("Response missing output field");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.output },
      ]);
    } catch (error) {
      console.error("Error in chat:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-background border rounded-lg shadow-lg w-96 h-[500px] flex flex-col">
          <div
            className="p-4 border-b flex justify-between items-center cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <h2 className="font-semibold">
              Ask about my professional experience
            </h2>
            <Button
              variant="ghost"
              size="sm"
              aria-label="Close chat"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              ✕
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="text-sm text-muted-foreground mb-2">
              Ask about my resume, skills, or experience (e.g. &quot;What
              languages do you know?&quot; or &quot;Tell me about your work at
              Dollar Shave Club.&quot;).
            </div>
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.role === "assistant" ? (
                  <div className="max-w-[80%] rounded-lg p-3 bg-muted prose prose-sm dark:prose-invert">
                    <ReactMarkdown
                      components={{
                        a: ({ children, href = "#", ...props }) => (
                          <Link href={href} {...props}>
                            {children}
                          </Link>
                        ),
                        p: ({ children, ...props }) => (
                          <p {...props}>{children}</p>
                        ),
                        ul: ({ children, ...props }) => (
                          <List {...props}>{children}</List>
                        ),
                        ol: ({ children, ...props }) => (
                          <List as="ol" {...props}>
                            {children}
                          </List>
                        ),
                        li: ({ children, ...props }) => (
                          <ListItem {...props}>{children}</ListItem>
                        ),
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <div
                    className={
                      "max-w-[80%] rounded-lg p-3 bg-primary text-primary-foreground whitespace-pre-line"
                    }
                  >
                    {message.content}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-muted">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div
                        className="w-2 h-2 rounded-full bg-foreground animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-foreground animate-bounce"
                        style={{ animationDelay: "200ms" }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-foreground animate-bounce"
                        style={{ animationDelay: "400ms" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my professional experience..."
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 shadow-lg"
          aria-label="Open chat"
        >
          <Bot className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}

export function ChatWidget() {
  return isChatEnabled ? <ChatWidgetImpl /> : null;
}
