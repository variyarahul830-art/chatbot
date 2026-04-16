"use client";

import { motion } from "framer-motion";

const messageVariants = {
  hidden: (type) => ({
    opacity: 0,
    y: 12,
    x: type === "user" ? 14 : -14,
  }),
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.22, ease: "easeOut" },
  },
};

export default function ChatMessage({ message }) {
  return (
    <motion.div
      className={`message ${message.type}`}
      custom={message.type}
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      layout
    >
      <div className="message-content">{message.content}</div>
    </motion.div>
  );
}
