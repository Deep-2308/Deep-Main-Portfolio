"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { AnimatePresence, motion } from "framer-motion";
import { useEngineerMode } from "./EngineerModeProvider";
import { ArrowUpRight } from "./Icons";

const SUGGESTED_PROMPTS = [
  "Which project best demonstrates Deep's AI skills?",
  "How does Proofly work?",
  "What have I built with Python?",
  "Is Deep open to freelance work?",
];

export default function AiAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const { isEngineerMode } = useEngineerMode();
  const [input, setInput] = useState("");
  
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: { isEngineerMode },
    }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ parts: [{ type: "text", text: input }] });
    setInput("");
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock background scroll properly integrated with Lenis
  useEffect(() => {
    if (isOpen) {
      window.dispatchEvent(new Event("lock-scroll"));
    } else {
      window.dispatchEvent(new Event("unlock-scroll"));
    }
    return () => {
      if (isOpen) {
        window.dispatchEvent(new Event("unlock-scroll"));
      }
    };
  }, [isOpen]);

  // Listen for global command palette trigger
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-ai-assistant", handleOpen);
    return () => window.removeEventListener("open-ai-assistant", handleOpen);
  }, []);

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Focus trap & restoration
  useEffect(() => {
    if (isOpen) {
      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements && focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        // Auto-focus first element (or input if preferred, but first element is standard)
        // We'll focus the input directly since it's an AI chat, or just first element.
        // There is an input field, let's find it or default to first.
        const inputElement = dialogRef.current?.querySelector('input');
        (inputElement || firstElement).focus();

        const handleTabKey = (e: KeyboardEvent) => {
          if (e.key !== 'Tab') return;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        };

        dialogRef.current?.addEventListener('keydown', handleTabKey);
        return () => dialogRef.current?.removeEventListener('keydown', handleTabKey);
      }
    } else {
      // Restore focus to trigger when closed
      triggerRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-40">
        <button
          ref={triggerRef}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Ask Deep's AI"
          aria-expanded={isOpen}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface-elevated text-text-primary shadow-lg transition-all hover:-translate-y-1 hover:border-accent hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </button>
      </div>

      {/* Chat Interface Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col bg-background md:bottom-24 md:left-auto md:right-6 md:top-auto md:h-[600px] md:w-[400px] md:rounded-2xl md:border md:border-border md:bg-surface-elevated md:shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio AI Assistant"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-surface md:rounded-t-2xl">
              <div>
                <h2 className="font-mono text-xs uppercase tracking-widest text-text-primary">
                  {isEngineerMode ? "SYSTEM_ASSISTANT" : "ASK DEEP'S AI"}
                </h2>
                <p className="mt-1 font-mono text-[10px] text-text-secondary">
                  {isEngineerMode ? "TECHNICAL_CONTEXT_ACTIVE" : "Ask about my projects and skills"}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant"
                className="rounded-full p-2 text-text-secondary transition-colors hover:bg-text-primary/5 hover:text-text-primary"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {messages.length === 0 ? (
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed text-text-secondary">
                    I am an AI assistant integrated with Deep's portfolio. I can answer questions about his software engineering experience, projects, and skills.
                  </p>
                  <div className="mt-6 flex flex-col gap-2">
                    {SUGGESTED_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handlePromptClick(prompt)}
                        className="text-left rounded-lg border border-border bg-surface px-4 py-3 text-sm text-text-secondary transition hover:border-text-primary hover:text-text-primary"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((m: any) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          m.role === "user"
                            ? "bg-text-primary text-background"
                            : "bg-surface border border-border text-text-primary"
                        }`}
                      >
                        {m.parts?.map((part: any, i: number) => 
                          part.type === "text" ? <span key={i}>{part.text}</span> : null
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                      <div className="flex max-w-[85%] items-center gap-2 rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-text-secondary">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent"></span>
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent delay-75"></span>
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent delay-150"></span>
                      </div>
                    </motion.div>
                  )}
                  
                  {error && (
                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
                      {error.message.includes("400") || error.message.includes("503") 
                        ? "AI is currently offline. Please try again later."
                        : "Something went wrong. Please try again."}
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-border bg-surface p-4 md:rounded-b-2xl">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!input.trim() || isLoading) return;
                  handleSubmit(e);
                }}
                className="flex items-center gap-2 relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask about Deep's work..."
                  className="w-full rounded-full border border-border bg-background px-4 py-3 pr-12 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  aria-label="Message to Deep's AI"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-text-primary text-background transition disabled:opacity-50 hover:bg-accent focus:outline-none"
                  aria-label="Send message"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
