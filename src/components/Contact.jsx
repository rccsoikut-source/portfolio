import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-dark-800/30">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get In <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all duration-300"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all duration-300"
              />
            </div>
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all duration-300"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-all duration-300 resize-none"
            />
            <button
              type="submit"
              className="px-8 py-3 bg-primary hover:bg-primary-dark rounded-xl font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 flex items-center gap-2"
            >
              Send Message
              <Send size={18} />
            </button>
          </form>

          {/* Contact Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="p-6 bg-dark-800 border border-dark-600 rounded-2xl">
              <h3 className="text-lg font-semibold mb-6">Contact Details</h3>
              <div className="space-y-5">
                <a href="tel:+8801717773813" className="flex items-start gap-4 group">
                  <div className="p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-300 group-hover:text-primary transition-colors">+880 1717-773813</p>
                  </div>
                </a>
                <a href="mailto:soikut776@gmail.com" className="flex items-start gap-4 group">
                  <div className="p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Mail size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="text-gray-300 group-hover:text-primary transition-colors">soikut776@gmail.com</p>
                  </div>
                </a>
                <div className="flex items-start gap-4">
                  <div className="p-2.5 bg-primary/10 rounded-lg">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-300">Rangpur, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
