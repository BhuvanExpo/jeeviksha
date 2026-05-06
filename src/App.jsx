import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import Reservation from './components/Reservation';
import Contact from './components/Contact';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Menu />
      <About />
      <Testimonials />
      <Gallery />
      <Reservation />
      <Contact />
      <FloatingWhatsApp />
      <Footer />
    </div>
  );
}

export default App;
