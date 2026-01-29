import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import { portfolioData } from './data/portfolioData';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        {/* SEO Meta Tags */}
        <title>{`${portfolioData.personal.name} | ${portfolioData.personal.title}`}</title>

        {/* Navigation */}
        <Navbar onChatToggle={toggleChat} />

        {/* Main Content */}
        <main>
          <Hero />
          <About />
          <Education />
          <Experience />
          <Projects />
          <Skills />
          <Certifications />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* AI Chatbot */}
        <Chatbot isOpen={isChatOpen} onToggle={toggleChat} />
      </div>
    </ThemeProvider>
  );
}

export default App;
