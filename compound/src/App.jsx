// src/App.jsx
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Resources from './pages/Resources';
import Footer from './components/Footer';// Make sure this is created

function App() {

   const [page, setPage] = useState('home');
  return (
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
      {/* Animated Stardust Background */}
      <div className="stars"></div> 
       <Navbar setPage={setPage} />
      <div style={{ padding: '2rem' }}>
        {page === 'home' && <Home />}
        {page === 'about' && <About />}
        {page === 'resources' && <Resources />}
      </div>

    </div>
  );
}

export default App;
