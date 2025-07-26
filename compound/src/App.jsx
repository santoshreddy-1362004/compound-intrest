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

function App() {
  const [page, setPage] = useState('home');

  // Create animated stars
  useEffect(() => {
    const createStars = () => {
      const starsContainer = document.createElement('div');
      starsContainer.className = 'stars-container';
      
      // Create different layers of stars
      const starCounts = { small: 50, medium: 30, large: 20 };
      
      Object.entries(starCounts).forEach(([size, count]) => {
        for (let i = 0; i < count; i++) {
          const star = document.createElement('div');
          star.className = `stars stars-${size}`;
          
          // Add twinkle effect to some stars
          if (Math.random() > 0.7) {
            star.classList.add('twinkle');
          }
          
          // Random positioning
          star.style.left = Math.random() * 100 + '%';
          star.style.animationDelay = Math.random() * 20 + 's';
          
          starsContainer.appendChild(star);
        }
      });
      
      document.body.appendChild(starsContainer);
    };

    createStars();

    // Cleanup function
    return () => {
      const starsContainer = document.querySelector('.stars-container');
      if (starsContainer) {
        starsContainer.remove();
      }
    };
  }, []);

  return (
    <PortfolioProvider>
      <div
        style={{
          minHeight: '100vh',
          fontFamily: 'Inter, sans-serif',
          background: 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)',
          overflow: 'hidden',
          position: 'relative',
          color: '#ffffff',
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

export default App;
