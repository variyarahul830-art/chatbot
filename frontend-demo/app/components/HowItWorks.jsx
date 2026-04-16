"use client";

import { motion } from "framer-motion";

const steps = [
  {
    icon: "📄",
    title: "Upload Documents",
    description: "Upload PDFs, Word docs, or text files. Support for multiple formats.",
  },
  {
    icon: "⚡",
    title: "Smart Processing",
    description: "We intelligently chunk your data and generate semantic embeddings.",
  },
  {
    icon: "🧠",
    title: "RAG Retrieval",
    description: "Our AI retrieves the most relevant context for accurate answers.",
  },
  {
    icon: "💬",
    title: "Chat & Get Answers",
    description: "Ask anything and get contextual responses grounded in your data.",
  },
];

export default function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="how-it-works-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <h2>How It Works</h2>
        <p>Simple steps to transform your documents into a smart AI assistant</p>
      </motion.div>

      <motion.div
        className="steps-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {steps.map((step, idx) => (
          <motion.div key={idx} className="step-card" variants={stepVariants}>
            <div className="step-number">{idx + 1}</div>
            <div className="step-icon">{step.icon}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="flow-diagram"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flow-item">User Query</div>
        <div className="flow-arrow">→</div>
        <div className="flow-item">Retriever</div>
        <div className="flow-arrow">→</div>
        <div className="flow-item">Documents</div>
        <div className="flow-arrow">→</div>
        <div className="flow-item">LLM</div>
        <div className="flow-arrow">→</div>
        <div className="flow-item">Answer</div>
      </motion.div>
    </section>
  );
}
