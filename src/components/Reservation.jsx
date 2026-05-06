import React from 'react';
import { motion } from 'framer-motion';

const Reservation = () => {
  return (
    <section id="reservation" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background Image with Overlay */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: 'url(https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&q=80&w=1600)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        zIndex: -2
      }} />
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: -1
      }} />

      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass"
          style={{
            maxWidth: '600px',
            width: '100%',
            padding: '4rem 3rem',
            borderRadius: '20px',
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.95)'
          }}
        >
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
            Reserve Your Perfect Coffee Moment
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
            Ensure your spot in our urban sanctuary. Whether it's a quiet morning or an afternoon meeting, we're ready for you.
          </p>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input type="text" placeholder="Name" style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }} />
              <input type="tel" placeholder="Phone" style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }} />
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input type="date" style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', color: 'var(--text-secondary)' }} />
              <select style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', color: 'var(--text-secondary)' }}>
                <option value="">Time</option>
                <option value="09:00">09:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="18:00">06:00 PM</option>
              </select>
            </div>
            <select style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', color: 'var(--text-secondary)' }}>
              <option value="">Number of Guests</option>
              <option value="1">1 Person</option>
              <option value="2">2 People</option>
              <option value="3">3 People</option>
              <option value="4+">4+ People</option>
            </select>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary" 
              type="button"
              style={{ width: '100%', padding: '1.2rem', marginTop: '1rem', fontSize: '1.1rem' }}
            >
              Book Table
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Reservation;
