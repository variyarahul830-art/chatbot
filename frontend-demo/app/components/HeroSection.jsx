"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="hero-section-new">
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={itemVariants} className="hero-title">
          Turn Your Documents into an AI Chatbot
        </motion.h1>

        <motion.p variants={itemVariants} className="hero-subtitle">
          Upload PDFs, docs, or data and get instant, accurate answers using advanced RAG technology. No hallucinations. Pure knowledge.
        </motion.p>

        <motion.div variants={itemVariants} className="hero-cta-group">
          <button className="btn btn-primary">Get Started Free</button>
          <button className="btn btn-secondary">Try Live Demo</button>
        </motion.div>

        <motion.p variants={itemVariants} className="hero-badge">
          ✨ No credit card required • 15 min setup
        </motion.p>
      </motion.div>

      <motion.div
        className="hero-visual"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      >
        <div className="chat-preview-card">
          <div className="chat-preview-header">
            <div className="chat-preview-dot green"></div>
            <span className="chat-preview-status">Connected</span>
          </div>
          <div className="chat-preview-messages">
            <div className="chat-preview-msg bot">
              <p>Hi! I've processed your documents. What would you like to know?</p>
            </div>
            <div className="chat-preview-msg user">
              <p>What's the refund policy?</p>
            </div>
            <div className="chat-preview-msg bot">
              <p>According to your documents: We offer full refunds within 30 days of purchase...</p>
              <div className="chat-preview-source">📄 From: Policy_v2.pdf</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
