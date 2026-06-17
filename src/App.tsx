import React from 'react';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { ServiceShowcase } from './components/ServiceShowcase';
import { WhyChooseUs } from './components/WhyChooseUs';
import { FromSalesToServicing } from './components/FromSalesToServicing';
import { ContactUs } from './components/ContactUs';
import { Footer } from './components/Footer';
import { useScreenInit } from './useScreenInit';

export function App() {
  useScreenInit();
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <ServiceShowcase />
        <WhyChooseUs />
        <FromSalesToServicing />
        <ContactUs />
      </main>
      <Footer />
    </div>
  );
}