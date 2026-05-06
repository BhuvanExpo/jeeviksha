import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const contactInfo = [
    { icon: <MapPin size={24} />, title: "Address", desc: "123 Coffee Avenue, New York, NY 10012" },
    { icon: <Phone size={24} />, title: "Phone", desc: "+1 (555) 123-4567" },
    { icon: <Mail size={24} />, title: "Email", desc: "hello@luminacafe.com" },
    { icon: <Clock size={24} />, title: "Hours", desc: "Mon-Sun: 7am - 8pm" }
  ];

  return (
    <section id="contact" className="section-padding" style={{ backgroundColor: 'white' }}>
      <div className="container">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
          
          <motion.div 
            style={{ flex: '1 1 400px' }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>Get in Touch</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>
              We'd love to hear from you. Drop us a line or come visit us for a cup of joy.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {contactInfo.map((info, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
                  <div style={{ color: 'var(--accent-gold)' }}>
                    {info.icon}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{info.title}</h4>
                    <p style={{ color: 'var(--text-secondary)' }}>{info.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            style={{ flex: '1 1 500px', height: '400px', borderRadius: '16px', overflow: 'hidden' }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12094.57348593182!2d-74.00581526019318!3d40.72590740698144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2598f988156a9%3A0xd54629bdf9d61d68!2sSoHo%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1689230588647!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Lumina Cafe Location"
            ></iframe>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
