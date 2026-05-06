import React from 'react';
import { Coffee } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#111', color: 'white', padding: '5rem 2rem 2rem' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between', marginBottom: '4rem' }}>
          
          <div style={{ flex: '1 1 300px' }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.8rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', color: 'white', marginBottom: '1.5rem' }}>
              <Coffee size={32} color="var(--accent-gold)" />
              Lumina Cafe
            </a>
            <p style={{ color: '#aaa', marginBottom: '2rem', maxWidth: '300px' }}>
              Crafting perfect moments through exceptional coffee, one cup at a time. Your urban sanctuary for taste and tranquility.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }} className="social-icon">IG</a>
              <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }} className="social-icon">FB</a>
              <a href="#" style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.8rem', fontWeight: 'bold' }} className="social-icon">X</a>
            </div>
          </div>

          <div style={{ flex: '1 1 200px' }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><a href="#home" style={{ color: '#aaa' }}>Home</a></li>
              <li><a href="#menu" style={{ color: '#aaa' }}>Menu</a></li>
              <li><a href="#about" style={{ color: '#aaa' }}>About Us</a></li>
              <li><a href="#gallery" style={{ color: '#aaa' }}>Gallery</a></li>
              <li><a href="#contact" style={{ color: '#aaa' }}>Contact</a></li>
            </ul>
          </div>

          <div style={{ flex: '1 1 200px' }}>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Opening Hours</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#aaa' }}>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Mon - Fri:</span>
                <span>7:00 AM - 8:00 PM</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Saturday:</span>
                <span>8:00 AM - 9:00 PM</span>
              </li>
              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Sunday:</span>
                <span>8:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>

        </div>

        <div style={{ 
          borderTop: '1px solid #333', 
          paddingTop: '2rem', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          color: '#777',
          fontSize: '0.9rem'
        }}>
          <p>&copy; {new Date().getFullYear()} Lumina Cafe. All rights reserved.</p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: '#777' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#777' }}>Terms of Service</a>
          </div>
        </div>
      </div>

      <style>{`
        .social-icon:hover {
          background-color: var(--accent-gold) !important;
          transform: translateY(-3px);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
