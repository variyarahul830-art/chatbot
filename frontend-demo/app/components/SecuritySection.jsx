"use client";

import { motion } from "framer-motion";

export default function SecuritySection() {
  const securityFeatures = [
    { icon: "🔐", title: "End-to-End Encrypted", desc: "All data encrypted in transit and at rest" },
    { icon: "🚫", title: "No Model Training", desc: "Your documents never train our models" },
    { icon: "🔒", title: "Private Processing", desc: "Each workspace is isolated and secure" },
    { icon: "✅", title: "SOC 2 Compliant", desc: "Enterprise-grade security standards" },
  ];

  return (
    <section className="security-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <h2>Your Data. Your Control.</h2>
        <p>Enterprise-grade security and privacy built in</p>
      </motion.div>

      <motion.div
        className="security-grid"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, staggerChildren: 0.1 }}
      >
        {securityFeatures.map((feature, idx) => (
          <motion.div
            key={idx}
            className="security-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
          >
            <div className="security-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
