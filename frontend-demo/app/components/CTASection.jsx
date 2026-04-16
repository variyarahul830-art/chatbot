"use client";

import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="cta-final-section">
      <motion.div
        className="cta-content"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <h2>Build Your AI Assistant in Minutes</h2>
        <p>
          No coding required. Upload your documents and start chatting with your knowledge base instantly.
        </p>

        <motion.button
          className="btn btn-primary btn-large"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
        >
          Start Free Trial
        </motion.button>

        <p className="cta-subtext">
          ✨ 15 min setup • Free tier included • Cancel anytime
        </p>
      </motion.div>
    </section>
  );
}
