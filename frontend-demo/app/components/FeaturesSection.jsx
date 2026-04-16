"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "🎯",
    title: "Context-Aware Answers",
    description: "RAG-powered responses grounded in your actual data, not hallucinations.",
  },
  {
    icon: "📚",
    title: "Multi-Document Support",
    description: "Upload and search across hundreds of documents simultaneously.",
  },
  {
    icon: "⚡",
    title: "Fast Semantic Search",
    description: "Find answers in milliseconds using advanced vector search.",
  },
  {
    icon: "🔒",
    title: "Secure Processing",
    description: "End-to-end encrypted. Your data is never used for model training.",
  },
  {
    icon: "💬",
    title: "Real-time Chat",
    description: "Instant responses with typing indicators and live connections.",
  },
  {
    icon: "🧩",
    title: "Custom Knowledge Base",
    description: "Build a unique AI assistant tailored to your organization.",
  },
];

export default function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section className="features-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <h2>Powerful Features for Your AI Assistant</h2>
        <p>Everything you need to build a production-ready knowledge chatbot</p>
      </motion.div>

      <motion.div
        className="features-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className="feature-card"
            variants={featureVariants}
            whileHover={{ translateY: -6, boxShadow: "var(--shadow-lg)" }}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
