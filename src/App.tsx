import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { ServiceModal } from './components/ServiceModal';
import { Portfolio } from './components/Portfolio';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingControls } from './components/FloatingControls';
import { LoadingScreen } from './components/LoadingScreen';
import { AiConsultantModal } from './components/AiConsultantModal';
import { Service } from './types';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedServiceForModal, setSelectedServiceForModal] = useState<Service | null>(null);
  const [preselectedContactService, setPreselectedContactService] = useState<string>('');
  const [preselectedContactPlan, setPreselectedContactPlan] = useState<string>('');
  const [aiAdvisorOpen, setAiAdvisorOpen] = useState(false);

  // ScrollSpy to highlight active section in Navbar
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'portfolio', 'pricing', 'testimonials', 'faq', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForContact = (serviceTitle: string) => {
    setPreselectedContactService(serviceTitle);
    handleNavigate('contact');
  };

  const handleSelectPlanForContact = (planName: string) => {
    setPreselectedContactPlan(planName);
    handleNavigate('contact');
  };

  if (isLoading) {
    return <LoadingScreen onFinishLoading={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-purple-500 selection:text-white font-sans relative">
      
      {/* Sticky Glassmorphism Header / Navigation */}
      <Navbar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onOpenAiAdvisor={() => setAiAdvisorOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative">
        {/* Hero Section */}
        <Hero onNavigate={handleNavigate} />

        {/* About Section */}
        <About />

        {/* Services Section */}
        <Services onSelectService={(service) => setSelectedServiceForModal(service)} />

        {/* Portfolio Section */}
        <Portfolio />

        {/* Pricing Section */}
        <Pricing onSelectPlan={handleSelectPlanForContact} />

        {/* Testimonials Section */}
        <Testimonials />

        {/* FAQ Section */}
        <FAQ />

        {/* Contact Section */}
        <Contact 
          preselectedService={preselectedContactService}
          preselectedPlan={preselectedContactPlan}
        />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Action Controls (WhatsApp + Back to Top) */}
      <FloatingControls />

      {/* Modals & Drawers */}
      <ServiceModal 
        service={selectedServiceForModal}
        onClose={() => setSelectedServiceForModal(null)}
        onSelectServiceForContact={handleSelectServiceForContact}
      />

      <AiConsultantModal 
        isOpen={aiAdvisorOpen}
        onClose={() => setAiAdvisorOpen(false)}
        onSelectService={handleSelectServiceForContact}
      />

    </div>
  );
}
