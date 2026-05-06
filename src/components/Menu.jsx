import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('Coffee');

  const categories = ['Coffee', 'Desserts', 'Breakfast', 'Signature Drinks'];

  const menuItems = [
    { id: 1, category: 'Coffee', name: 'Ethiopian Pour Over', desc: 'Single origin, light roast with floral notes', price: '$6.50', img: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&q=80&w=400' },
    { id: 2, category: 'Coffee', name: 'Classic Cappuccino', desc: 'Espresso, steamed milk, deep foam', price: '$5.00', img: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=400' },
    { id: 3, category: 'Coffee', name: 'Madagascar Vanilla Latte', desc: 'Espresso, real vanilla bean, steamed milk', price: '$5.75', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=400' },
    { id: 4, category: 'Coffee', name: 'Cold Brew Reserve', desc: 'Steeped for 24 hours, served over ice', price: '$5.50', img: 'https://images.unsplash.com/photo-1461023058943-07cb1ce8db83?auto=format&fit=crop&q=80&w=400' },
    
    { id: 5, category: 'Desserts', name: 'Matcha Tiramisu', desc: 'Ladyfingers, mascarpone, ceremonial matcha', price: '$8.50', img: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&q=80&w=400' },
    { id: 6, category: 'Desserts', name: 'Artisan Croissant', desc: 'Butter croissant baked fresh daily', price: '$4.50', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400' },
    
    { id: 7, category: 'Breakfast', name: 'Avocado Toast', desc: 'Sourdough, smashed avocado, poached egg', price: '$12.00', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400' },
    { id: 8, category: 'Breakfast', name: 'Acai Bowl', desc: 'Berries, granola, honey, chia seeds', price: '$11.00', img: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=400' },
    
    { id: 9, category: 'Signature Drinks', name: 'Lavender Honey Latte', desc: 'Espresso, lavender syrup, local honey', price: '$6.25', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=400' },
    { id: 10, category: 'Signature Drinks', name: 'Smoked Rose Mocha', desc: 'Espresso, dark chocolate, rose water', price: '$6.75', img: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=400' },
  ];

  const filteredMenu = menuItems.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="section-padding" style={{ backgroundColor: 'var(--accent-beige)' }}>
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Featured Menu</h2>
          <p>Discover our carefully curated selection of artisanal beverages and gourmet treats.</p>
        </motion.div>

        {/* Category Tabs */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '1rem', 
          flexWrap: 'wrap',
          marginBottom: '3rem'
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.8rem 1.5rem',
                borderRadius: '30px',
                backgroundColor: activeCategory === cat ? 'var(--accent-gold)' : 'white',
                color: activeCategory === cat ? 'white' : 'var(--text-primary)',
                fontWeight: 500,
                boxShadow: activeCategory === cat ? '0 10px 20px rgba(207,168,110,0.3)' : '0 2px 10px rgba(0,0,0,0.05)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <motion.div layout style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '2rem' 
        }}>
          <AnimatePresence mode='popLayout'>
            {filteredMenu.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -10 }}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 15px 30px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ height: '200px', overflow: 'hidden' }}>
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                    src={item.img} 
                    alt={item.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>{item.name}</h3>
                    <span style={{ fontWeight: 600, color: 'var(--accent-gold)' }}>{item.price}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Menu;
