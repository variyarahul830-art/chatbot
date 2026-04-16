'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './RAGDetailBreakdown.module.css';

const PHASES = [
  {
    id: 1,
    title: 'PDF Processing',
    icon: '📄',
    color: '#4f46e5',
    subSteps: [
      { name: 'Text Extraction', desc: 'Extract text from PDFs using docTR OCR', metric: '99% accuracy' },
      { name: 'Page Tracking', desc: 'Preserve page numbers and metadata', metric: 'Per-page data' },
      { name: 'OCR Handling', desc: 'Handle scanned PDFs with advanced OCR', metric: 'Hybrid mode' },
    ],
    stats: [
      { label: 'Extraction Method', value: 'docTR OCR' },
      { label: 'Supported Formats', value: 'PDF, DOCX, TXT' },
      { label: 'Processing Speed', value: '10-50 pages/min' },
    ],
  },
  {
    id: 2,
    title: 'Text Chunking',
    icon: '✂️',
    color: '#7c3aed',
    subSteps: [
      { name: 'Tokenization', desc: 'Convert text to tokens using tiktoken', metric: 'cl100k_base' },
      { name: 'Chunk Creation', desc: 'Split by 500 token chunks with 50 overlap', metric: '500 tokens' },
      { name: 'Overlap Handling', desc: 'Preserve context between chunks', metric: '50 token overlap' },
    ],
    stats: [
      { label: 'Chunk Size', value: '500 tokens' },
      { label: 'Overlap Size', value: '50 tokens' },
      { label: 'Avg Chunk Length', value: '~2-3 sentences' },
    ],
  },
  {
    id: 3,
    title: 'Embedding Generation',
    icon: '🧠',
    color: '#a78bfa',
    subSteps: [
      { name: 'Model Loading', desc: 'Load Sentence Transformers model', metric: 'all-MiniLM-L6-v2' },
      { name: 'Vector Creation', desc: 'Generate embeddings for each chunk', metric: '384 dimensions' },
      { name: 'Normalization', desc: 'Normalize vectors for similarity search', metric: 'L2 norm' },
    ],
    stats: [
      { label: 'Model', value: 'all-MiniLM-L6-v2' },
      { label: 'Vector Dimensions', value: '384D' },
      { label: 'Generation Time', value: '~50-100ms per chunk' },
    ],
  },
  {
    id: 4,
    title: 'Vector Storage & Search',
    icon: '🗃️',
    color: '#10b981',
    subSteps: [
      { name: 'Milvus Integration', desc: 'Store vectors in Milvus database', metric: 'Vector DB' },
      { name: 'Index Creation', desc: 'Create IVF_FLAT or HNSW indices', metric: 'Fast search' },
      { name: 'Semantic Search', desc: 'Find similar chunks using cosine similarity', metric: '<100ms' },
    ],
    stats: [
      { label: 'Database', value: 'Milvus' },
      { label: 'Search Latency', value: '<100ms' },
      { label: 'Similarity Metric', value: 'Cosine' },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export default function RAGDetailBreakdown() {
  const [expandedPhase, setExpandedPhase] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Detailed RAG Breakdown</div>
      
      <motion.div
        className={styles.phasesContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {PHASES.map((phase, index) => (
          <motion.div key={phase.id} variants={itemVariants}>
            <motion.button
              className={`${styles.phaseHeader} ${expandedPhase === index ? styles.expanded : ''}`}
              onClick={() => setExpandedPhase(expandedPhase === index ? -1 : index)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={styles.phaseHeaderLeft}>
                <div className={styles.phaseIcon} style={{ background: phase.color }}>
                  {phase.icon}
                </div>
                <div>
                  <h3 className={styles.phaseTitle}>{phase.title}</h3>
                  <p className={styles.phaseCount}>{phase.subSteps.length} sub-steps</p>
                </div>
              </div>
              <motion.div
                className={styles.expandIcon}
                animate={{ rotate: expandedPhase === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                ⌄
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {expandedPhase === index && (
                <motion.div
                  className={styles.phaseContent}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                  {/* Sub-Steps */}
                  <div className={styles.subStepsSection}>
                    <h4 className={styles.subStepsTitle}>Sub-Steps</h4>
                    <div className={styles.subSteps}>
                      {phase.subSteps.map((subStep, idx) => (
                        <motion.div
                          key={idx}
                          className={styles.subStep}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.08 }}
                        >
                          <div className={styles.subStepNumber}>{idx + 1}</div>
                          <div className={styles.subStepContent}>
                            <div className={styles.subStepName}>{subStep.name}</div>
                            <div className={styles.subStepDesc}>{subStep.desc}</div>
                          </div>
                          <div className={styles.subStepMetric}>{subStep.metric}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className={styles.statsSection}>
                    <h4 className={styles.statsTitle}>Metrics & Specs</h4>
                    <div className={styles.statsGrid}>
                      {phase.stats.map((stat, idx) => (
                        <motion.div
                          key={idx}
                          className={styles.statCard}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: phase.subSteps.length * 0.08 + idx * 0.08 }}
                          whileHover={{ y: -4 }}
                        >
                          <div className={styles.statLabel}>{stat.label}</div>
                          <div className={styles.statValue} style={{ color: phase.color }}>
                            {stat.value}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>

      {/* Process Timeline */}
      <motion.div
        className={styles.timelineSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className={styles.timelineTitle}>Complete Data Flow</h3>
        <div className={styles.timeline}>
          {PHASES.map((phase, idx) => (
            <div key={phase.id} className={styles.timelineItem}>
              <div className={styles.timelineDot} style={{ background: phase.color }} />
              <div className={styles.timelineContent}>
                <div className={styles.timelineLabel}>{phase.title}</div>
              </div>
              {idx < PHASES.length - 1 && <div className={styles.timelineConnector} />}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
