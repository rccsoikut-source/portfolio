import { useState, useEffect } from 'react';
import { ArrowDown, Download, User } from 'lucide-react';

const titles = [
  'Assistant Operations Manager',
  'Customer Service Specialist',
  'E-commerce Entrepreneur',
  'AI Content Creator',
];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = titles[titleIndex];
    let timeout;

    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex(charIndex + 1), 80);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(charIndex - 1), 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTitleIndex((titleIndex + 1) % titles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, titleIndex]);

  const handleViewWork = (e) => {
    e.preventDefault();
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center pt-20 pb-10">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-gray-400 text-lg mb-2 animate-fade-in-up">Hello, I am</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 animate-fade-in-up animation-delay-200">
              <span className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
                Shahjalal Soykut
              </span>
            </h1>
            <div className="h-8 md:h-10 mb-8 animate-fade-in-up animation-delay-400">
              <span className="text-lg md:text-xl text-gray-300">
                {titles[titleIndex].substring(0, charIndex)}
              </span>
              <span className="text-primary cursor-blink text-xl">|</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-600">
              <button
                onClick={handleViewWork}
                className="group px-8 py-3 bg-primary hover:bg-primary-dark rounded-lg font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2"
              >
                View My Work
                <ArrowDown size={18} className="group-hover:translate-y-0.5 transition-transform" />
              </button>
              <a
                href="#"
                className="px-8 py-3 border border-primary/50 hover:border-primary rounded-lg font-medium text-primary hover:bg-primary/10 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Download Resume
                <Download size={18} />
              </a>
            </div>
          </div>

          {/* Right - Portrait Placeholder */}
          <div className="flex-shrink-0 animate-fade-in-up animation-delay-400">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-primary/20">
                <User size={80} className="text-primary/40" />
              </div>
              {/* Decorative ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/10 animate-[spin_20s_linear_infinite]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
