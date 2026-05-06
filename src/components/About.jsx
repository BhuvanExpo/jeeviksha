import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="section-padding" style={{ backgroundColor: 'white' }}>
      <div className="container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>
        
        {/* Image Grid */}
        <div style={{ flex: '1 1 400px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', position: 'relative' }}>
          <motion.img 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400" 
            alt="Cafe Interior" 
            style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '16px', marginTop: '2rem' }}
          />
          <motion.img 
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=400" 
            alt="Barista" 
            style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '16px' }}
          />
        </div>

        {/* Text Content */}
        <motion.div 
          style={{ flex: '1 1 400px' }}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span style={{ color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>
            Our Story
          </span>
          <h2 style={{ fontSize: '2.5rem', marginTop: '0.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
            Handcrafted Coffee,<br/>
            Unforgettable Moments.
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
            Founded with a passion for exceptional quality, Lumina Cafe brings you the finest single-origin beans roasted to perfection. We believe that every cup tells a story, and every sip should be an experience.
          </p>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
            Our minimalist space is designed to be your urban sanctuary—a place where you can pause, connect, and enjoy the simple luxury of a perfectly crafted beverage.
          </p>

          <div style={{ display: 'flex', gap: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'var(--font-heading)' }}>10+</div>
              <div style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Years Experience</div>
            </div>
            <div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'var(--font-heading)' }}>50k</div>
              <div style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Happy Customers</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
