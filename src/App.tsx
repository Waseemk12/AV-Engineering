import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { TopBar } from './components/TopBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { ServiceShowcase } from './components/ServiceShowcase';
import { DetailedServices } from './components/DetailedServices';
import { Projects } from './components/Projects';
import { WhyChooseUs } from './components/WhyChooseUs';
import { FromSalesToServicing } from './components/FromSalesToServicing';
import { ContactUs } from './components/ContactUs';
import { Footer } from './components/Footer';
import { useScreenInit } from './useScreenInit';
import { AdminLayout } from './admin/AdminLayout';
import { DashboardPage } from './admin/DashboardPage';
import { InquiriesPage } from './admin/InquiriesPage';
import { ServicesPage } from './admin/ServicesPage';
import { ProjectsPage } from './admin/ProjectsPage';

function PublicSite() {
  useScreenInit();
  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      <TopBar />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <ServiceShowcase />
        <DetailedServices />
        <Projects />
        <WhyChooseUs />
        <FromSalesToServicing />
        <ContactUs />
      </main>
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicSite />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="inquiries" element={<InquiriesPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="projects" element={<ProjectsPage />} />
      </Route>
    </Routes>
  );
}