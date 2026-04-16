"use client";

import { motion } from "framer-motion";

export default function ChatInput({
  input,
  isLoading,
  inputRef,
  onChange,
  onKeyDown,
  onSubmit,
}) {
  return (
    <form className="chat-input-area" onSubmit={onSubmit}>
      <label htmlFor="chat-input" className="sr-only">
        Message
      </label>
      <textarea
        id="chat-input"
        ref={inputRef}
        className="chat-input"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={isLoading}
        rows="1"
      />
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="chat-send-btn"
        type="submit"
        disabled={isLoading || !input.trim()}
        aria-label="Send message"
      >
        <svg viewBox="0 0 24 24" className="chat-icon" aria-hidden="true">
          <path
            d="M4 20l16-8L4 4v6l11 2-11 2z"
            fill="currentColor"
          />
        </svg>
      </motion.button>
    </form>
  );
}
