"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatBox from "./ChatBox";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chat-widget-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10, transition: { duration: 0.16 } }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <ChatBox onClose={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="chat-toggle-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        title={isOpen ? "Close chat" : "Chat with AI Assistant"}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        type="button"
      >
        <svg viewBox="0 0 24 24" className="chat-icon" aria-hidden="true">
          {isOpen ? (
            <path
              d="M6 6l12 12M18 6L6 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M12 3c5 0 9 3.36 9 7.5 0 1.93-.9 3.68-2.38 4.99.14.83.66 2.2 2.1 3.7-2.2.05-3.83-.57-4.82-1.13A11.3 11.3 0 0 1 12 19.5c-5 0-9-3.36-9-7.5S7 3 12 3z"
              fill="currentColor"
            />
          )}
        </svg>
      </motion.button>
    </div>
  );
}
