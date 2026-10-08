import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const defaultData = {
  hero: {
    greeting: 'Hello, I am',
    name: 'Shahjalal Soykut',
    titles: [
      'Assistant Operations Manager',
      'Customer Service Specialist',
      'E-commerce Entrepreneur',
      'AI Content Creator',
    ],
    profileImage: '',
    resumeUrl: '',
  },
  about: {
    summary: 'Results-driven operations professional and digital creator with progressive experience in team supervision, customer service, and e-commerce management. I specialize in leveraging advanced AI technologies for digital content creation, streamlining workflows, and driving measurable operational improvements.',
    skills: [
      'AI Content Creation',
      'Prompt Engineering',
      'Video Generation',
      'Customer Relations',
      'Team Coordination',
      'SOP Development',
      'Graphic Design',
      'Creative Writing',
    ],
  },
  projects: [
    {
      id: '1',
      title: 'Operations & SOP Management',
      category: 'Operations',
      description: 'Designed and implemented Standard Operating Procedures (SOPs) for educational institutions to enhance workflow efficiency and operational consistency.',
      tags: ['SOP Development', 'Workflow', 'Team Management'],
      image: '',
    },
    {
      id: '2',
      title: 'Afeel & Am Shorgo',
      category: 'E-commerce',
      description: 'Managed product stock, sales, social media marketing, and branding for organic food e-commerce businesses, driving growth and customer engagement.',
      tags: ['E-commerce', 'Branding', 'Social Media'],
      image: '',
    },
    {
      id: '3',
      title: 'Digital Media & AI',
      category: 'Digital Content',
      description: 'Created cinematic video layouts, motion graphics, and graphic designs using advanced digital and creative tools for various digital campaigns.',
      tags: ['Video Editing', 'Motion Graphics', 'Design'],
      image: '',
    },
    {
      id: '4',
      title: 'AI Content Creation & Digital Media',
      category: 'Digital Content',
      description: 'Leveraged advanced AI tools (including VEO, Flo AI, and various image models) for high-quality image generation, photo restoration, and cinematic video upscaling. Crafted highly optimized prompts for motion graphics and wrote engaging, satirical creative narratives for digital campaigns.',
      tags: ['AI Tools', 'Prompt Engineering', 'Creative Writing'],
      image: '',
    },
  ],
  experiences: [
    {
      id: '1',
      title: 'AI Content Creator & Prompt Engineer',
      company: 'Freelance',
      period: 'Ongoing',
      description: 'Specialize in AI-driven visual storytelling, cinematic video generation, image upscaling, and crafting creative social media content and tele-sales scripts. Completed specialized training in Artificial Intelligence to enhance digital workflows.',
      isCurrent: true,
    },
    {
      id: '2',
      title: 'Assistant Operations Manager',
      company: 'Rangpur Cadet Coaching',
      period: 'Jan 2026 — Present',
      description: 'Supervise floor staff, resolve operational bottlenecks, and monitor team performance to ensure smooth daily operations.',
      isCurrent: true,
    },
    {
      id: '3',
      title: 'Customer Service Representative',
      company: 'Rangpur Cadet Coaching',
      period: 'Jan 2025 — Dec 2025',
      description: 'Handled high volumes of customer inquiries and managed support tickets via Trello, maintaining excellent satisfaction ratings.',
      isCurrent: false,
    },
    {
      id: '4',
      title: 'Coordinator',
      company: 'Kendrobindu Coaching',
      period: 'Mar 2022 — Aug 2024',
      description: 'Organised administrative workflows and bridged communication between faculty and students to improve institutional coordination.',
      isCurrent: false,
    },
  ],
  contact: {
    phone: '+880 1717-773813',
    email: 'soikut776@gmail.com',
    location: 'Rangpur, Bangladesh',
  },
};

export default function useFirebaseData() {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const docRef = doc(db, 'portfolio', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fbData = docSnap.data();
          setData({
            hero: { ...defaultData.hero, ...fbData.hero },
            about: { ...defaultData.about, ...fbData.about },
            projects: fbData.projects || defaultData.projects,
            experiences: fbData.experiences || defaultData.experiences,
            contact: { ...defaultData.contact, ...fbData.contact },
          });
        }
      } catch (error) {
        console.log('Using default data:', error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { data, loading, setData };
}
