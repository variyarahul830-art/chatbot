'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './RAGFlow.module.css';

const STEPS = [
  {
    id: 1,
    title: 'Upload & Extract',
    description: 'Upload PDF, DOCX, or text files. Our system extracts text using advanced OCR (docTR).',
    icon: '📄',
    color: '#4f46e5',
    metrics: { label: 'Text Extraction', value: '99% Accuracy' },
  },
  {
    id: 2,
    title: 'Chunk & Tokenize',
    description: 'Split text into semantic chunks with 500 token size and 50 token overlap for better context.',
    icon: '✂️',
    color: '#7c3aed',
    metrics: { label: 'Avg Chunk Size', value: '~500 tokens' },
  },
  {
    id: 3,
    title: 'Generate Embeddings',
    description: 'Convert each chunk into high-dimensional vectors (384D) using Sentence Transformers for semantic search.',
    icon: '🧠',
    color: '#a78bfa',
    metrics: { label: 'Vector Dimension', value: '384D' },
  },
  {
    id: 4,
    title: 'Store & Search',
    description: 'Store vectors in Milvus and perform semantic similarity search to find the most relevant chunks.',
    icon: '🗃️',
    color: '#10b981',
    metrics: { label: 'Search Latency', value: '<100ms' },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const arrowVariants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.6, delay: 0.3, ease: 'easeOut' },
  },
};

export default function RAGFlow() {
  const [activeStep, setActiveStep] = React.useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.title}>RAG Process Flow</div>
      
      {/* Desktop: Horizontal flow */}
      <div className={styles.flowHorizontal}>
        <motion.div
          className={styles.stepsContainer}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {STEPS.map((step, index) => (
            <React.Fragment key={step.id}>
              {/* Step Card */}
              <motion.div
                variants={itemVariants}
                className={`${styles.step} ${activeStep === step.id ? styles.active : ''}`}
                onMouseEnter={() => setActiveStep(step.id)}
                onMouseLeave={() => setActiveStep(null)}
                whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}
              >
                <div className={styles.stepNumber} style={{ background: step.color }}>
                  {step.icon}
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
                <div className={styles.metric}>
                  <span className={styles.metricLabel}>{step.metrics.label}</span>
                  <span className={styles.metricValue}>{step.metrics.value}</span>
                </div>
              </motion.div>

              {/* Arrow between steps */}
              {index < STEPS.length - 1 && (
                <motion.div
                  variants={arrowVariants}
                  className={styles.arrow}
                  style={{ color: step.color }}
                >
                  →
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* Mobile: Vertical flow */}
      <div className={styles.flowVertical}>
        <motion.div
          className={styles.stepsContainerMobile}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {STEPS.map((step, index) => (
            <React.Fragment key={step.id}>
              <motion.div
                variants={itemVariants}
                className={styles.stepMobile}
                whileTap={{ scale: 0.98 }}
              >
                <div className={styles.stepMobileHeader}>
                  <div className={styles.stepNumberMobile} style={{ background: step.color }}>
                    {step.icon}
                  </div>
                  <div>
                    <h3 className={styles.stepTitleMobile}>{step.title}</h3>
                    <p className={styles.stepDescriptionMobile}>{step.description}</p>
                  </div>
                </div>
                <div className={styles.metricMobile}>
                  <span>{step.metrics.label}:</span>
                  <span className={styles.metricValueMobile}>{step.metrics.value}</span>
                </div>
              </motion.div>

              {/* Vertical arrow */}
              {index < STEPS.length - 1 && (
                <motion.div
                  variants={arrowVariants}
                  className={styles.arrowVertical}
                  style={{ color: step.color }}
                >
                  ↓
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* Info Box */}
      <motion.div
        className={styles.infoBox}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <div className={styles.infoIcon}>ℹ️</div>
        <div>
          <p className={styles.infoTitle}>How RAG Works</p>
          <p className={styles.infoText}>
            Retrieval-Augmented Generation combines document retrieval with language models to provide accurate, 
            context-aware answers grounded in your data. No hallucinations, only facts from your documents.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
