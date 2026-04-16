'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './DataTransformationFlow.module.css';

const DEMO_DATA = {
  originalText: "Retrieval-Augmented Generation (RAG) is a powerful technique that combines document retrieval with language models. The system processes documents through multiple stages: extraction, chunking, embedding, and storage. RAG ensures accurate, grounded answers without hallucinations.",
  chunks: [
    { text: "Retrieval-Augmented Generation (RAG) is a powerful technique that combines document retrieval with language models.", tokens: 18 },
    { text: "The system processes documents through multiple stages: extraction, chunking, embedding, and storage.", tokens: 16 },
    { text: "RAG ensures accurate, grounded answers without hallucinations.", tokens: 10 },
  ],
};

export default function DataTransformationFlow() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Original PDF',
      description: 'Upload your document',
      icon: '📄',
      data: DEMO_DATA.originalText,
      dataType: 'text',
    },
    {
      title: 'Chunked Text',
      description: 'Split into semantic chunks',
      icon: '✂️',
      data: DEMO_DATA.chunks,
      dataType: 'chunks',
    },
    {
      title: 'Embeddings',
      description: 'Convert to vector space (384D)',
      icon: '🧠',
      data: '[0.124, -0.356, 0.892, ... 384 dimensions]',
      dataType: 'embedding',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title}>Live Data Transformation</div>

      {/* Step Selector */}
      <div className={styles.stepSelector}>
        {steps.map((step, idx) => (
          <motion.button
            key={idx}
            className={`${styles.stepBtn} ${currentStep === idx ? styles.active : ''}`}
            onClick={() => setCurrentStep(idx)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className={styles.stepIcon}>{step.icon}</span>
            <span className={styles.stepName}>{step.title}</span>
          </motion.button>
        ))}
      </div>

      {/* Data Display */}
      <motion.div
        className={styles.dataDisplay}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        key={currentStep}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.dataHeader}>
          <h3 className={styles.stepTitle}>{steps[currentStep].title}</h3>
          <p className={styles.stepDesc}>{steps[currentStep].description}</p>
        </div>

        <div className={styles.dataContent}>
          {steps[currentStep].dataType === 'text' && (
            <motion.div
              className={styles.textBox}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p>{DEMO_DATA.originalText}</p>
              <div className={styles.stat}>
                <span>Characters:</span>
                <span className={styles.value}>{DEMO_DATA.originalText.length}</span>
              </div>
              <div className={styles.stat}>
                <span>Tokens (approx):</span>
                <span className={styles.value}>{Math.ceil(DEMO_DATA.originalText.length / 4)}</span>
              </div>
            </motion.div>
          )}

          {steps[currentStep].dataType === 'chunks' && (
            <motion.div
              className={styles.chunksBox}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {DEMO_DATA.chunks.map((chunk, idx) => (
                <motion.div
                  key={idx}
                  className={styles.chunk}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <div className={styles.chunkHeader}>
                    <span className={styles.chunkNum}>Chunk {idx + 1}</span>
                    <span className={styles.tokenCount}>{chunk.tokens} tokens</span>
                  </div>
                  <p className={styles.chunkText}>{chunk.text}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {steps[currentStep].dataType === 'embedding' && (
            <motion.div
              className={styles.embeddingBox}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className={styles.vectorViz}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className={styles.vectorBar}
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.random() * 100}%` }}
                    transition={{ delay: i * 0.05, duration: 0.6 }}
                  />
                ))}
              </div>
              <div className={styles.embeddingInfo}>
                <p className={styles.embeddingText}>{DEMO_DATA.chunks[0].text}</p>
                <div className={styles.embeddingStats}>
                  <div className={styles.stat}>
                    <span>Vector Dimension:</span>
                    <span className={styles.value}>384</span>
                  </div>
                  <div className={styles.stat}>
                    <span>Model:</span>
                    <span className={styles.value}>all-MiniLM-L6-v2</span>
                  </div>
                  <div className={styles.stat}>
                    <span>Magnitude (L2):</span>
                    <span className={styles.value}>0.89</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Info Box */}
      <motion.div
        className={styles.infoBox}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className={styles.infoText}>
          ℹ️ Each step transforms your data into a format the AI can understand and search efficiently.
          The process is completely automated and transparent.
        </p>
      </motion.div>
    </div>
  );
}
