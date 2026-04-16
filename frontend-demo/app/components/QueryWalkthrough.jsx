'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './QueryWalkthrough.module.css';

const QUERY_FLOW = {
  query: 'What is Retrieval-Augmented Generation?',
  steps: [
    {
      id: 'query-embed',
      title: 'Query Embedding',
      description: 'Your question is converted to a vector using the same model as the documents',
      icon: '🔍',
      color: '#10b981',
      details: {
        text: 'What is Retrieval-Augmented Generation?',
        vector: '[0.145, -0.289, 0.756, ... 384D]',
        modelUsed: 'all-MiniLM-L6-v2',
      },
    },
    {
      id: 'similarity-search',
      title: 'Similarity Search',
      description: 'The system finds the most similar document chunks using cosine similarity',
      icon: '🔗',
      color: '#7c3aed',
      results: [
        { score: 0.92, chunk: 'RAG combines document retrieval with language models for accurate answers.' },
        { score: 0.87, chunk: 'The system processes documents through extraction, chunking, and embedding.' },
        { score: 0.84, chunk: 'RAG ensures grounded answers without hallucinations or false information.' },
      ],
    },
    {
      id: 'context-retrieval',
      title: 'Context Retrieval',
      description: 'Top matching chunks are retrieved and prepared for the LLM',
      icon: '📚',
      color: '#4f46e5',
      context: 'These chunks are used as context for the language model...',
    },
    {
      id: 'llm-generation',
      title: 'LLM Answer Generation',
      description: 'The language model generates a response based on the retrieved context',
      icon: '🤖',
      color: '#a78bfa',
      answer: 'Retrieval-Augmented Generation (RAG) is an advanced technique that combines document retrieval with language models. It works by first searching your documents for relevant information, then using an AI model to generate accurate, context-aware answers based on the retrieved chunks. This ensures answers are grounded in your actual data, eliminating hallucinations.',
    },
  ],
};

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

export default function QueryWalkthrough() {
  const [currentStep, setCurrentStep] = useState(0);
  const step = QUERY_FLOW.steps[currentStep];

  return (
    <div className={styles.container}>
      <div className={styles.title}>Query Execution Walkthrough</div>

      {/* Query Input */}
      <motion.div
        className={styles.queryBox}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className={styles.queryIcon}>💬</div>
        <div className={styles.queryContent}>
          <p className={styles.queryLabel}>User Query</p>
          <p className={styles.queryText}>{QUERY_FLOW.query}</p>
        </div>
      </motion.div>

      {/* Step Indicator */}
      <div className={styles.stepIndicator}>
        {QUERY_FLOW.steps.map((s, idx) => (
          <motion.button
            key={s.id}
            className={`${styles.stepDot} ${currentStep === idx ? styles.active : ''} ${
              idx < currentStep ? styles.completed : ''
            }`}
            onClick={() => setCurrentStep(idx)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            title={s.title}
          >
            {idx < currentStep ? '✓' : idx + 1}
          </motion.button>
        ))}
      </div>

      {/* Current Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className={styles.stepContent}
        >
          <motion.div
            className={styles.stepHeader}
            style={{ borderColor: step.color }}
            variants={itemVariants}
          >
            <div className={styles.stepIcon} style={{ background: step.color }}>
              {step.icon}
            </div>
            <div className={styles.stepTitleContent}>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          </motion.div>

          {/* Step Details */}
          <motion.div className={styles.stepDetails} variants={itemVariants}>
            {step.id === 'query-embed' && (
              <div className={styles.detailsGrid}>
                <div className={styles.detailCard}>
                  <h4>Original Query</h4>
                  <p className={styles.codeText}>{step.details.text}</p>
                </div>
                <div className={styles.detailCard}>
                  <h4>Query Vector</h4>
                  <p className={styles.codeText}>{step.details.vector}</p>
                </div>
                <div className={styles.detailCard}>
                  <h4>Embedding Model</h4>
                  <p className={styles.codeText}>{step.details.modelUsed}</p>
                </div>
              </div>
            )}

            {step.id === 'similarity-search' && (
              <div className={styles.similarityResults}>
                {step.results.map((result, idx) => (
                  <motion.div
                    key={idx}
                    className={styles.resultCard}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ x: 4 }}
                  >
                    <div className={styles.resultHeader}>
                      <span className={styles.resultRank}>#{idx + 1}</span>
                      <span className={styles.resultScore}>
                        Similarity: <strong>{(result.score * 100).toFixed(1)}%</strong>
                      </span>
                    </div>
                    <p className={styles.resultChunk}>{result.chunk}</p>
                  </motion.div>
                ))}
              </div>
            )}

            {step.id === 'context-retrieval' && (
              <div className={styles.contextBox}>
                <p className={styles.contextText}>
                  The top matching chunks are extracted and prepared as context for the next step.
                  This ensures the LLM has accurate, relevant information to work with.
                </p>
                <div className={styles.stat}>
                  <span>Chunks Retrieved:</span>
                  <span className={styles.value}>3</span>
                </div>
                <div className={styles.stat}>
                  <span>Total Context Tokens:</span>
                  <span className={styles.value}>234</span>
                </div>
              </div>
            )}

            {step.id === 'llm-generation' && (
              <div className={styles.answerBox}>
                <div className={styles.answerHeader}>
                  <span className={styles.answerIcon}>🎯</span>
                  <span className={styles.answerTitle}>Generated Answer</span>
                </div>
                <p className={styles.answerText}>{step.answer}</p>
                <div className={styles.answerFooter}>
                  <span className={styles.badge}>Based on 3 document chunks</span>
                  <span className={styles.badge}>Confidence: 94%</span>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <motion.div
        className={styles.navigationButtons}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <button
          className={styles.navBtn}
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
        >
          ← Previous
        </button>
        
        <div className={styles.stepCounter}>
          {currentStep + 1} / {QUERY_FLOW.steps.length}
        </div>

        <button
          className={styles.navBtn}
          onClick={() => setCurrentStep(Math.min(QUERY_FLOW.steps.length - 1, currentStep + 1))}
          disabled={currentStep === QUERY_FLOW.steps.length - 1}
        >
          Next →
        </button>
      </motion.div>

      {/* Info Box */}
      <motion.div
        className={styles.infoBox}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <p>
          ℹ️ This walkthrough shows how your questions are processed end-to-end. Each step is optimized
          for accuracy and speed, typically completing in under 500ms.
        </p>
      </motion.div>
    </div>
  );
}
