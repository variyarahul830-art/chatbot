'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RAGFlow from './RAGFlow';
import RAGDetailBreakdown from './RAGDetailBreakdown';
import DataTransformationFlow from './DataTransformationFlow';
import VectorSpaceVisualization from './VectorSpaceVisualization';
import QueryWalkthrough from './QueryWalkthrough';
import styles from './RAGVisualization.module.css';

const TABS = [
  { id: 'flow', label: 'Simple Flow', icon: '⚡' },
  { id: 'detailed', label: 'Detailed', icon: '📊' },
  { id: 'transform', label: 'Data Transform', icon: '🔄' },
  { id: 'vectors', label: '3D Vectors', icon: '🌐' },
  { id: 'query', label: 'Query Demo', icon: '💬' },
];

export default function RAGVisualization() {
  const [activeTab, setActiveTab] = useState('flow');

  const tabContent = {
    flow: <RAGFlow />,
    detailed: <RAGDetailBreakdown />,
    transform: <DataTransformationFlow />,
    vectors: <VectorSpaceVisualization />,
    query: <QueryWalkthrough />,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  };

  return (
    <div className={styles.container}>
      {/* Tab Navigation */}
      <div className={styles.tabsNav}>
        <div className={styles.tabsList}>
          {TABS.map((tab) => (
            <motion.button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              aria-selected={activeTab === tab.id}
              aria-label={tab.label}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  className={styles.tabIndicator}
                  layoutId="tabIndicator"
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className={styles.contentWrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={styles.content}
          >
            {tabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
