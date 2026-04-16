'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import styles from './VectorSpaceVisualization.module.css';

// Mock vector data for visualization
const generateMockVectors = (count = 50) => {
  const vectors = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = Math.random() * 80 + 20;
    vectors.push({
      x: Math.cos(angle) * radius,
      y: (Math.random() - 0.5) * 150,
      z: Math.sin(angle) * radius,
      query: i === 0, // First one is the query
      similarity: 1 - (i / count) * 0.7, // Simulated similarity scores
      chunk: `Document chunk ${i + 1}`,
    });
  }
  return vectors;
};

export default function VectorSpaceVisualization() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const pointsRef = useRef(null);
  const queryPointRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [stats, setStats] = useState({ similar: 0, distance: '0.00' });

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8fafc);
    sceneRef.current = scene;

    // Setup Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 150);

    // Setup Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Generate data
    const vectors = generateMockVectors(80);

    // Create Points Geometry
    const geometryData = vectors.slice(1); // Exclude query point for now
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(
      geometryData.flatMap((v) => [v.x, v.y, v.z])
    );
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Create Points Material and Mesh
    const material = new THREE.PointsMaterial({
      size: 6,
      color: 0x4f46e5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.7,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);
    pointsRef.current = points;

    // Create Query Point (different color)
    const queryGeometry = new THREE.BufferGeometry();
    const queryPosition = new Float32Array([vectors[0].x, vectors[0].y, vectors[0].z]);
    queryGeometry.setAttribute('position', new THREE.BufferAttribute(queryPosition, 3));
    const queryMaterial = new THREE.PointsMaterial({
      size: 12,
      color: 0x10b981,
      sizeAttenuation: true,
    });
    const queryPoint = new THREE.Points(queryGeometry, queryMaterial);
    scene.add(queryPoint);
    queryPointRef.current = queryPoint;

    // Add lines from query to similar points
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = [];
    vectors.slice(1, 6).forEach((v) => {
      linePositions.push(vectors[0].x, vectors[0].y, vectors[0].z);
      linePositions.push(v.x, v.y, v.z);
    });
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xa78bfa,
      transparent: true,
      opacity: 0.3,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Animation
    const animateFrame = () => {
      requestAnimationFrame(animateFrame);

      if (points) {
        points.rotation.x += 0.0003;
        points.rotation.y += 0.0005;
      }

      renderer.render(scene, camera);
    };
    animateFrame();

    // Mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([points]);

      if (intersects.length > 0) {
        const point = intersects[0].point;
        const distance = point.distanceTo(new THREE.Vector3(vectors[0].x, vectors[0].y, vectors[0].z));
        setStats({
          similar: Math.max(0, 100 - distance),
          distance: distance.toFixed(2),
        });
        setHoveredPoint(intersects[0].index);
      }
    };

    renderer.domElement.addEventListener('mousemove', onMouseMove);

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    setIsLoading(false);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>3D Vector Space</div>
      <p className={styles.description}>
        Hover over points to see similarity scores. Green point = your query, Blue points = document chunks
      </p>

      <div className={styles.content}>
        <div className={styles.canvasContainer} ref={containerRef} />

        <motion.div
          className={styles.statsPanel}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className={styles.statsPanelTitle}>Interactive Stats</h3>
          
          <div className={styles.stat}>
            <span className={styles.statLabel}>Similarity Score</span>
            <span className={styles.statValue}>{stats.similar.toFixed(1)}%</span>
          </div>

          <div className={styles.stat}>
            <span className={styles.statLabel}>Euclidean Distance</span>
            <span className={styles.statValue}>{stats.distance}</span>
          </div>

          <div className={styles.info}>
            <p className={styles.infoText}>
              🎯 <strong>How it works:</strong> Each point represents an embedded document chunk. 
              The query vector (green) searches for the most similar chunks using cosine similarity.
              Closer points = more similar content.
            </p>
          </div>

          <div className={styles.controls}>
            <p className={styles.controlsTitle}>Controls:</p>
            <ul className={styles.controlsList}>
              <li>🖱️ Click &amp; drag to rotate</li>
              <li>🔍 Scroll to zoom</li>
              <li>🎯 Hover to inspect</li>
            </ul>
          </div>
        </motion.div>
      </div>

      {isLoading && (
        <div className={styles.loading}>
          <div className={styles.spinner} />
          <p>Loading 3D visualization...</p>
        </div>
      )}
    </div>
  );
}
