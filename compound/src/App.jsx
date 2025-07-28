// src/App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Lending from './pages/Lending';
import Borrowing from './pages/Borrowing';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Resources from './pages/Resources';
import Footer from './components/Footer';
import { PortfolioProvider } from './context/PortfolioContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function AppContent() {
  const [page, setPage] = useState('home');
  const { darkMode } = useTheme();

  // Create animated stars
  useEffect(() => {
    const createStars = () => {
      // Remove existing stars if any
      const existingStars = document.querySelector('.stars-container');
      if (existingStars) {
        existingStars.remove();
      }

      const starsContainer = document.createElement('div');
      starsContainer.className = 'stars-container';
      starsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        opacity: ${darkMode ? '0.8' : '0.3'};
      `;
      
      // Create different layers of stars
      const starCounts = { small: 80, medium: 50, large: 30 };
      
      Object.entries(starCounts).forEach(([size, count]) => {
        for (let i = 0; i < count; i++) {
          const star = document.createElement('div');
          star.className = `stars stars-${size}`;
          
          // Set star styles directly
          let starSize = '2px';
          let opacity = '0.6';
          let duration = '25s';
          
          if (size === 'medium') {
            starSize = '3px';
            opacity = '0.8';
            duration = '20s';
          } else if (size === 'large') {
            starSize = '4px';
            opacity = '1';
            duration = '15s';
          }
          
          star.style.cssText = `
            position: absolute;
            width: ${starSize};
            height: ${starSize};
            background: ${darkMode ? 'white' : '#3b82f6'};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${opacity};
            animation: twinkle 2s ease-in-out infinite alternate, float ${duration} linear infinite;
            ${size === 'large' ? `box-shadow: 0 0 6px ${darkMode ? 'white' : '#3b82f6'};` : ''}
          `;
          
          // Add twinkle effect to some stars
          if (Math.random() > 0.6) {
            star.style.animationDelay = Math.random() * 2 + 's';
          }
          
          starsContainer.appendChild(star);
        }
      });
      
      document.body.appendChild(starsContainer);
    };

    // Add CSS animations if not present
    const style = document.createElement('style');
    style.textContent = `
      @keyframes float {
        0% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(10px, -10px) rotate(90deg); }
        50% { transform: translate(-5px, -20px) rotate(180deg); }
        75% { transform: translate(-10px, -10px) rotate(270deg); }
        100% { transform: translate(0, 0) rotate(360deg); }
      }
      
      @keyframes twinkle {
        0% { opacity: 0.3; }
        50% { opacity: 1; }
        100% { opacity: 0.3; }
      }
    `;
    document.head.appendChild(style);

    createStars();

    // Cleanup function
    return () => {
      const starsContainer = document.querySelector('.stars-container');
      if (starsContainer) {
        starsContainer.remove();
      }
    };
  }, [darkMode]);

  const backgroundStyle = darkMode 
    ? 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)'
    : 'radial-gradient(ellipse at top, #e0f2fe 0%, #f8fafc 50%, #e2e8f0 100%)';

  return (
    <PortfolioProvider>
      <div
        style={{
          minHeight: '100vh',
          fontFamily: 'Inter, sans-serif',
          background: backgroundStyle,
          overflow: 'hidden',
          position: 'relative',
          color: darkMode ? '#ffffff' : '#1e293b',
          transition: 'all 0.3s ease',
        }}
      >  
        <Navbar setPage={setPage} />
        <div style={{ padding: '2rem' }}>
          {page === 'home' && <Home />}
          {page === 'lending' && <Lending />}
          {page === 'borrowing' && <Borrowing />}
          {page === 'portfolio' && <Portfolio />}
          {page === 'about' && <About />}
          {page === 'resources' && <Resources />}
        </div>
      </div>
    </PortfolioProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
