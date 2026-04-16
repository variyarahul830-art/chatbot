"use client";

import { motion } from "framer-motion";
import { WidgetLogoIcon } from "./WidgetLogo";

export default function ChatHeader({ isLoading, onClose }) {
  return (
    <div className="chat-header">
      <div className="chat-header-meta">
        <div className="chat-header-logo">
          <WidgetLogoIcon size="md" animate={isLoading} />
        </div>
        <div>
          <p className="chat-header-title">AI Assistant</p>
          <div className="chat-header-status" aria-live="polite">
            <span
              className={`chat-status-dot ${isLoading ? "is-typing" : "is-online"}`}
              aria-hidden="true"
            />
            <span>{isLoading ? "Typing..." : "Online"}</span>
          </div>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="chat-close-btn"
        onClick={onClose}
        aria-label="Close chat"
        type="button"
      >
        <svg viewBox="0 0 24 24" className="chat-icon" aria-hidden="true">
          <path
            d="M6 6l12 12M18 6L6 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </motion.button>
    </div>
  );
}
