import { Sparkles } from 'lucide-react';

const skills = [
  'AI Content Creation',
  'Prompt Engineering',
  'Video Generation',
  'Customer Relations',
  'Team Coordination',
  'SOP Development',
  'Graphic Design',
  'Creative Writing',
];

export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Summary */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Sparkles className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Who I Am</h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-lg">
              Results-driven operations professional and digital creator with progressive experience in team supervision, customer service, and e-commerce management. I specialize in leveraging advanced AI technologies for digital content creation, streamlining workflows, and driving measurable operational improvements.
            </p>
          </div>

          {/* Skills */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Skills & Expertise</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-dark-700 border border-dark-600 rounded-full text-sm text-gray-300 hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-all duration-300 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
