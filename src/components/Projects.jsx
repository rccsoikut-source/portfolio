import { useState } from 'react';
import { Briefcase, ShoppingBag, Film, Bot, ExternalLink } from 'lucide-react';

const categories = ['All', 'Operations', 'E-commerce', 'Digital Content'];

const projects = [
  {
    title: 'Operations & SOP Management',
    category: 'Operations',
    description: 'Designed and implemented Standard Operating Procedures (SOPs) for educational institutions to enhance workflow efficiency and operational consistency.',
    icon: Briefcase,
    tags: ['SOP Development', 'Workflow', 'Team Management'],
    color: 'from-blue-500/20 to-indigo-500/20',
    borderColor: 'hover:border-blue-500/30',
  },
  {
    title: 'Afeel & Am Shorgo',
    category: 'E-commerce',
    description: 'Managed product stock, sales, social media marketing, and branding for organic food e-commerce businesses, driving growth and customer engagement.',
    icon: ShoppingBag,
    tags: ['E-commerce', 'Branding', 'Social Media'],
    color: 'from-emerald-500/20 to-teal-500/20',
    borderColor: 'hover:border-emerald-500/30',
  },
  {
    title: 'Digital Media & AI',
    category: 'Digital Content',
    description: 'Created cinematic video layouts, motion graphics, and graphic designs using advanced digital and creative tools for various digital campaigns.',
    icon: Film,
    tags: ['Video Editing', 'Motion Graphics', 'Design'],
    color: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'hover:border-purple-500/30',
  },
  {
    title: 'AI Content Creation & Digital Media',
    category: 'Digital Content',
    description: 'Leveraged advanced AI tools (including VEO, Flo AI, and various image models) for high-quality image generation, photo restoration, and cinematic video upscaling. Crafted highly optimized prompts for motion graphics and wrote engaging, satirical creative narratives for digital campaigns.',
    icon: Bot,
    tags: ['AI Tools', 'Prompt Engineering', 'Creative Writing'],
    color: 'from-violet-500/20 to-fuchsia-500/20',
    borderColor: 'hover:border-violet-500/30',
  },
];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 bg-dark-800/30">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Work</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-dark-700 text-gray-400 hover:text-white hover:bg-dark-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((project) => {
            const Icon = project.icon;
            return (
              <div
                key={project.title}
                className={`group p-6 bg-dark-800 border border-dark-600 rounded-2xl ${project.borderColor} hover:shadow-xl hover:shadow-black/20 transition-all duration-500 hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center mb-4`}>
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-dark-700 rounded-full text-xs text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
