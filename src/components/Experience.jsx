import { Calendar, MapPin } from 'lucide-react';

const experiences = [
  {
    title: 'AI Content Creator & Prompt Engineer',
    company: 'Freelance',
    period: 'Ongoing',
    description: 'Specialize in AI-driven visual storytelling, cinematic video generation, image upscaling, and crafting creative social media content and tele-sales scripts. Completed specialized training in Artificial Intelligence to enhance digital workflows.',
    type: 'current',
  },
  {
    title: 'Assistant Operations Manager',
    company: 'Rangpur Cadet Coaching',
    period: 'Jan 2026 — Present',
    description: 'Supervise floor staff, resolve operational bottlenecks, and monitor team performance to ensure smooth daily operations.',
    type: 'current',
  },
  {
    title: 'Customer Service Representative',
    company: 'Rangpur Cadet Coaching',
    period: 'Jan 2025 — Dec 2025',
    description: 'Handled high volumes of customer inquiries and managed support tickets via Trello, maintaining excellent satisfaction ratings.',
    type: 'past',
  },
  {
    title: 'Coordinator',
    company: 'Kendrobindu Coaching',
    period: 'Mar 2022 — Aug 2024',
    description: 'Organised administrative workflows and bridged communication between faculty and students to improve institutional coordination.',
    type: 'past',
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={index} className={`relative flex flex-col md:flex-row items-start gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50 md:-translate-x-1.5 translate-y-2 z-10" />

                {/* Card */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                }`}>
                  <div className="p-6 bg-dark-800 border border-dark-600 rounded-2xl hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:shadow-black/20 group">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={14} className="text-primary" />
                      <span className="text-sm text-primary font-medium">{exp.period}</span>
                      {exp.type === 'current' && (
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20">
                          Current
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">{exp.title}</h3>
                    <p className="text-primary/70 text-sm mb-3 flex items-center gap-1">
                      <MapPin size={12} />
                      {exp.company}
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
