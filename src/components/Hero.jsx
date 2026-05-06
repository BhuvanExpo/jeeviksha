import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '80px'
    }}>
      {/* Abstract Background Blobs */}
      <motion.div 
        className="blob-bg"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(207,168,110,0.15) 0%, rgba(255,255,255,0) 70%)',
          top: '-10%',
          right: '-10%'
        }}
      />
      <motion.div 
        className="blob-bg"
        animate={{ 
          scale: [1, 1.5, 1],
          x: [0, -40, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(245,242,235,0.8) 0%, rgba(255,255,255,0) 70%)',
          bottom: '0',
          left: '-10%'
        }}
      />

      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', padding: '0 2rem' }}>
        <div style={{ flex: '1 1 500px', zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span style={{ 
              textTransform: 'uppercase', 
              letterSpacing: '3px', 
              color: 'var(--accent-gold)',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'block',
              marginBottom: '1rem'
            }}>
              Premium Cafe Experience
            </span>
            <h1 style={{ 
              fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
              marginBottom: '1.5rem',
              lineHeight: 1.1
            }}>
              Crafted Coffee.<br/>
              <span style={{ color: 'var(--accent-gold)' }}>Timeless Taste.</span>
            </h1>
            <p style={{ 
              fontSize: '1.2rem', 
              color: 'var(--text-secondary)',
              marginBottom: '2.5rem',
              maxWidth: '480px'
            }}>
              Experience the perfect blend of artisanal coffee and modern luxury in a space designed for your comfort and inspiration.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#menu" className="btn btn-primary" style={{ padding: '1rem 2.5rem' }}>
                View Menu
              </a>
              <a href="#reservation" className="btn btn-outline" style={{ padding: '1rem 2.5rem' }}>
                Reserve Table
              </a>
            </div>
          </motion.div>
        </div>
        
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 10, marginTop: '3rem' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{ position: 'relative' }}
          >
            {/* Main Image */}
            <img 
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800" 
              alt="Premium Coffee" 
              style={{
                width: '100%',
                maxWidth: '500px',
                borderRadius: '20px 100px 20px 20px',
                boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
                objectFit: 'cover'
              }}
            />
            
            {/* Floating Element */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="glass"
              style={{
                position: 'absolute',
                bottom: '10%',
                left: '-10%',
                padding: '1.5rem',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)'
              }}
            >
              <div style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                background: 'var(--accent-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '1.2rem'
              }}>
                4.9
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Customer Rating</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Based on 2,500+ reviews</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
