import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Eleanor Thompson",
      role: "Local Guide",
      text: "The aesthetic of this place is breathtaking. But more importantly, their Ethiopian Pour Over is the best I've had in the city. A true hidden gem.",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 2,
      name: "Marcus Chen",
      role: "Food Blogger",
      text: "Minimalist perfection. The matcha tiramisu paired with their signature cold brew is a match made in heaven. 10/10 would recommend.",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 3,
      name: "Sophia Martinez",
      role: "Regular Customer",
      text: "My favorite spot to work and relax. The staff remembers my order, the ambiance is calming, and the pastries are always fresh.",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
    }
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--accent-beige)' }}>
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Words from our Guests</h2>
          <p>Don't just take our word for it. Here is what our community has to say.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              style={{
                backgroundColor: 'white',
                padding: '2.5rem',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                position: 'relative'
              }}
            >
              <div style={{ color: 'var(--accent-gold)', marginBottom: '1.5rem', opacity: 0.2, fontSize: '4rem', fontFamily: 'var(--font-heading)', position: 'absolute', top: 10, right: 20 }}>
                "
              </div>
              <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1.5rem', color: 'var(--accent-gold)' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p style={{ fontStyle: 'italic', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.8 }}>
                "{review.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img 
                  src={review.img} 
                  alt={review.name} 
                  style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem' }}>{review.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{review.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
