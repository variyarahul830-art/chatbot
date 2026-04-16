"use client";

import { motion } from "framer-motion";

export default function WhyRAGSection() {
  const benefits = [
    { title: "No Hallucinations", desc: "Answers backed by real data" },
    { title: "High Accuracy", desc: "Grounded in your documents" },
    { title: "Better Than Generic AI", desc: "Customized to your knowledge" },
  ];

  return (
    <section className="why-rag-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <h2>Why RAG Technology?</h2>
        <p>Learn why Retrieval-Augmented Generation is the smarter choice</p>
      </motion.div>

      <div className="rag-content">
        <motion.div
          className="rag-benefits"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              className="benefit-item"
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="benefit-dot">✓</div>
              <div>
                <h4>{benefit.title}</h4>
                <p>{benefit.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="rag-diagram"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="diagram-box">
            <div className="diagram-label">Traditional LLM</div>
            <div className="diagram-content" style={{ color: "#ef4444" }}>
              ❌ May hallucinate
              <br />
              ❌ No data context
              <br />
              ❌ Generic responses
            </div>
          </div>

          <div className="diagram-vs">vs</div>

          <div className="diagram-box rag">
            <div className="diagram-label">RAG Chatbot</div>
            <div className="diagram-content" style={{ color: "#10b981" }}>
              ✅ Grounded answers
              <br />
              ✅ Your data context
              <br />
              ✅ Accurate & custom
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
