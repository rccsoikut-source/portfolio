import { ArrowUp, Heart } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-8 border-t border-dark-600">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Shahjalal Soykut. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="p-2 bg-dark-700 hover:bg-primary/20 border border-dark-600 hover:border-primary/30 rounded-full text-gray-400 hover:text-primary transition-all duration-300 hover:scale-110"
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </div>
    </footer>
  );
}
