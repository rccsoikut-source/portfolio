import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import { LogOut, Save, Plus, Trash2, Upload, Image, User, Briefcase, Mail, Clock } from 'lucide-react';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'experience', label: 'Experience', icon: Clock },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [uploading, setUploading] = useState('');

  const [data, setData] = useState({
    hero: {
      greeting: 'Hello, I am',
      name: 'Shahjalal Soykut',
      titles: ['Assistant Operations Manager', 'Customer Service Specialist', 'E-commerce Entrepreneur', 'AI Content Creator'],
      profileImage: '',
      resumeUrl: '',
    },
    about: {
      summary: 'Results-driven operations professional and digital creator with progressive experience in team supervision, customer service, and e-commerce management. I specialize in leveraging advanced AI technologies for digital content creation, streamlining workflows, and driving measurable operational improvements.',
      skills: ['AI Content Creation', 'Prompt Engineering', 'Video Generation', 'Customer Relations', 'Team Coordination', 'SOP Development', 'Graphic Design', 'Creative Writing'],
    },
    projects: [
      { id: '1', title: 'Operations & SOP Management', category: 'Operations', description: 'Designed and implemented Standard Operating Procedures (SOPs) for educational institutions to enhance workflow efficiency and operational consistency.', tags: ['SOP Development', 'Workflow', 'Team Management'], image: '' },
      { id: '2', title: 'Afeel & Am Shorgo', category: 'E-commerce', description: 'Managed product stock, sales, social media marketing, and branding for organic food e-commerce businesses, driving growth and customer engagement.', tags: ['E-commerce', 'Branding', 'Social Media'], image: '' },
      { id: '3', title: 'Digital Media & AI', category: 'Digital Content', description: 'Created cinematic video layouts, motion graphics, and graphic designs using advanced digital and creative tools for various digital campaigns.', tags: ['Video Editing', 'Motion Graphics', 'Design'], image: '' },
      { id: '4', title: 'AI Content Creation & Digital Media', category: 'Digital Content', description: 'Leveraged advanced AI tools (including VEO, Flo AI, and various image models) for high-quality image generation, photo restoration, and cinematic video upscaling.', tags: ['AI Tools', 'Prompt Engineering', 'Creative Writing'], image: '' },
    ],
    experiences: [
      { id: '1', title: 'AI Content Creator & Prompt Engineer', company: 'Freelance', period: 'Ongoing', description: 'Specialize in AI-driven visual storytelling, cinematic video generation, image upscaling, and crafting creative social media content and tele-sales scripts.', isCurrent: true },
      { id: '2', title: 'Assistant Operations Manager', company: 'Rangpur Cadet Coaching', period: 'Jan 2026 — Present', description: 'Supervise floor staff, resolve operational bottlenecks, and monitor team performance to ensure smooth daily operations.', isCurrent: true },
      { id: '3', title: 'Customer Service Representative', company: 'Rangpur Cadet Coaching', period: 'Jan 2025 — Dec 2025', description: 'Handled high volumes of customer inquiries and managed support tickets via Trello, maintaining excellent satisfaction ratings.', isCurrent: false },
      { id: '4', title: 'Coordinator', company: 'Kendrobindu Coaching', period: 'Mar 2022 — Aug 2024', description: 'Organised administrative workflows and bridged communication between faculty and students to improve institutional coordination.', isCurrent: false },
    ],
    contact: { phone: '+880 1717-773813', email: 'soikut776@gmail.com', location: 'Rangpur, Bangladesh' },
  });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return unsub;
  }, []);

  useEffect(() => {
    if (user) loadData();
  }, [user]);

  const loadData = async () => {
    try {
      const snap = await getDoc(doc(db, 'portfolio', 'main'));
      if (snap.exists()) {
        const d = snap.data();
        setData(prev => ({
          hero: { ...prev.hero, ...d.hero },
          about: { ...prev.about, ...d.about },
          projects: d.projects || prev.projects,
          experiences: d.experiences || prev.experiences,
          contact: { ...prev.contact, ...d.contact },
        }));
      }
    } catch (e) {
      console.error('Load error:', e);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setLoginError('Invalid email or password');
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg('');
    try {
      await setDoc(doc(db, 'portfolio', 'main'), data);
      setSaveMsg('Saved successfully!');
      setTimeout(() => setSaveMsg(''), 3000);
    } catch (e) {
      setSaveMsg('Error saving: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const uploadImage = async (file, path) => {
    setUploading(path);
    try {
      const storageRef = ref(storage, `portfolio/${path}/${Date.now()}_${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setUploading('');
      return url;
    } catch (e) {
      console.error('Upload error:', e);
      setUploading('');
      return '';
    }
  };

  const handleProfileImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file, 'profile');
    if (url) setData(prev => ({ ...prev, hero: { ...prev.hero, profileImage: url } }));
  };

  const handleProjectImage = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadImage(file, 'projects');
    if (url) {
      const updated = [...data.projects];
      updated[index] = { ...updated[index], image: url };
      setData(prev => ({ ...prev, projects: updated }));
    }
  };

  const addProject = () => {
    setData(prev => ({
      ...prev,
      projects: [...prev.projects, { id: Date.now().toString(), title: '', category: 'Operations', description: '', tags: [], image: '' }],
    }));
  };

  const removeProject = (index) => {
    setData(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));
  };

  const updateProject = (index, field, value) => {
    const updated = [...data.projects];
    updated[index] = { ...updated[index], [field]: value };
    setData(prev => ({ ...prev, projects: updated }));
  };

  const addExperience = () => {
    setData(prev => ({
      ...prev,
      experiences: [...prev.experiences, { id: Date.now().toString(), title: '', company: '', period: '', description: '', isCurrent: false }],
    }));
  };

  const removeExperience = (index) => {
    setData(prev => ({ ...prev, experiences: prev.experiences.filter((_, i) => i !== index) }));
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data.experiences];
    updated[index] = { ...updated[index], [field]: value };
    setData(prev => ({ ...prev, experiences: updated }));
  };

  // Login Screen
  if (!user) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-md p-8 bg-dark-800 border border-dark-600 rounded-2xl">
          <h1 className="text-2xl font-bold text-center mb-2">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Admin Panel</span>
          </h1>
          <p className="text-gray-500 text-center text-sm mb-8">Sign in to manage your portfolio</p>
          {loginError && <p className="text-red-400 text-sm text-center mb-4 p-2 bg-red-500/10 rounded-lg">{loginError}</p>}
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 mb-4 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-3 mb-6 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary/50" />
          <button type="submit" className="w-full py-3 bg-primary hover:bg-primary-dark rounded-xl font-medium text-white transition-all">Sign In</button>
        </form>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-dark-900">
      {/* Top Bar */}
      <div className="sticky top-0 z-50 bg-dark-900/80 backdrop-blur-xl border-b border-dark-600 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-bold">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Admin Dashboard</span>
          </h1>
          <div className="flex items-center gap-3">
            {saveMsg && <span className="text-sm text-green-400">{saveMsg}</span>}
            <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-primary hover:bg-primary-dark rounded-lg text-sm font-medium text-white transition-all flex items-center gap-2 disabled:opacity-50">
              <Save size={16} /> {saving ? 'Saving...' : 'Save All'}
            </button>
            <button onClick={() => signOut(auth)} className="p-2 text-gray-400 hover:text-red-400 transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-primary text-white' : 'bg-dark-800 text-gray-400 hover:text-white border border-dark-600'}`}>
                <Icon size={16} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="p-6 bg-dark-800 border border-dark-600 rounded-2xl">
              <h2 className="text-lg font-semibold mb-6">Profile Photo</h2>
              <div className="flex items-center gap-6">
                <div className="w-32 h-32 rounded-full bg-dark-700 border border-dark-600 overflow-hidden flex items-center justify-center">
                  {data.hero.profileImage ? <img src={data.hero.profileImage} alt="Profile" className="w-full h-full object-cover" /> : <User size={40} className="text-gray-600" />}
                </div>
                <div>
                  <label className="px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg text-primary text-sm font-medium cursor-pointer transition-all flex items-center gap-2">
                    <Upload size={16} /> {uploading === 'profile' ? 'Uploading...' : 'Upload Photo'}
                    <input type="file" accept="image/*" onChange={handleProfileImage} className="hidden" />
                  </label>
                  <p className="text-gray-500 text-xs mt-2">JPG, PNG. Max 5MB.</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-dark-800 border border-dark-600 rounded-2xl space-y-4">
              <h2 className="text-lg font-semibold mb-2">Hero Section</h2>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Greeting</label>
                <input value={data.hero.greeting} onChange={e => setData(p => ({ ...p, hero: { ...p.hero, greeting: e.target.value } }))} className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:outline-none focus:border-primary/50" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Full Name</label>
                <input value={data.hero.name} onChange={e => setData(p => ({ ...p, hero: { ...p.hero, name: e.target.value } }))} className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:outline-none focus:border-primary/50" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Titles (comma separated)</label>
                <input value={data.hero.titles.join(', ')} onChange={e => setData(p => ({ ...p, hero: { ...p.hero, titles: e.target.value.split(',').map(t => t.trim()).filter(Boolean) } }))} className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:outline-none focus:border-primary/50" />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Resume URL</label>
                <input value={data.hero.resumeUrl} onChange={e => setData(p => ({ ...p, hero: { ...p.hero, resumeUrl: e.target.value } }))} placeholder="https://drive.google.com/..." className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-primary/50" />
              </div>
            </div>
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="p-6 bg-dark-800 border border-dark-600 rounded-2xl space-y-4">
            <h2 className="text-lg font-semibold mb-2">About Me</h2>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Summary</label>
              <textarea value={data.about.summary} onChange={e => setData(p => ({ ...p, about: { ...p.about, summary: e.target.value } }))} rows={4} className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:outline-none focus:border-primary/50 resize-none" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Skills (comma separated)</label>
              <input value={data.about.skills.join(', ')} onChange={e => setData(p => ({ ...p, about: { ...p.about, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) } }))} className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:outline-none focus:border-primary/50" />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {data.about.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-dark-700 border border-dark-600 rounded-full text-xs text-gray-400">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Projects</h2>
              <button onClick={addProject} className="px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg text-primary text-sm font-medium flex items-center gap-2"><Plus size={16} /> Add Project</button>
            </div>
            {data.projects.map((project, i) => (
              <div key={project.id} className="p-6 bg-dark-800 border border-dark-600 rounded-2xl space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium text-primary">Project {i + 1}</h3>
                  <button onClick={() => removeProject(i)} className="p-1 text-gray-500 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Title</label>
                    <input value={project.title} onChange={e => updateProject(i, 'title', e.target.value)} className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:outline-none focus:border-primary/50" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Category</label>
                    <select value={project.category} onChange={e => updateProject(i, 'category', e.target.value)} className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:outline-none focus:border-primary/50">
                      <option value="Operations">Operations</option>
                      <option value="E-commerce">E-commerce</option>
                      <option value="Digital Content">Digital Content</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Description</label>
                  <textarea value={project.description} onChange={e => updateProject(i, 'description', e.target.value)} rows={3} className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:outline-none focus:border-primary/50 resize-none" />
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Tags (comma separated)</label>
                  <input value={project.tags.join(', ')} onChange={e => updateProject(i, 'tags', e.target.value.split(',').map(t => t.trim()).filter(Boolean))} className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:outline-none focus:border-primary/50" />
                </div>
                <div className="flex items-center gap-4">
                  {project.image && <img src={project.image} alt="" className="w-20 h-20 rounded-lg object-cover border border-dark-600" />}
                  <label className="px-4 py-2 bg-dark-700 hover:bg-dark-600 border border-dark-600 rounded-lg text-gray-400 text-sm cursor-pointer transition-all flex items-center gap-2">
                    <Image size={16} /> {uploading === 'projects' ? 'Uploading...' : 'Upload Image'}
                    <input type="file" accept="image/*" onChange={e => handleProjectImage(e, i)} className="hidden" />
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold">Experience</h2>
              <button onClick={addExperience} className="px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg text-primary text-sm font-medium flex items-center gap-2"><Plus size={16} /> Add Experience</button>
            </div>
            {data.experiences.map((exp, i) => (
              <div key={exp.id} className="p-6 bg-dark-800 border border-dark-600 rounded-2xl space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium text-primary">Experience {i + 1}</h3>
                  <button onClick={() => removeExperience(i)} className="p-1 text-gray-500 hover:text-red-400 transition-colors"><Trash2 size={16} /></button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Job Title</label>
                    <input value={exp.title} onChange={e => updateExperience(i, 'title', e.target.value)} className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:outline-none focus:border-primary/50" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Company</label>
                    <input value={exp.company} onChange={e => updateExperience(i, 'company', e.target.value)} className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:outline-none focus:border-primary/50" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400 mb-1 block">Period</label>
                    <input value={exp.period} onChange={e => updateExperience(i, 'period', e.target.value)} className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:outline-none focus:border-primary/50" />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={exp.isCurrent} onChange={e => updateExperience(i, 'isCurrent', e.target.checked)} className="w-4 h-4 rounded border-dark-600 text-primary focus:ring-primary" />
                      <span className="text-sm text-gray-400">Currently working here</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400 mb-1 block">Description</label>
                  <textarea value={exp.description} onChange={e => updateExperience(i, 'description', e.target.value)} rows={3} className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:outline-none focus:border-primary/50 resize-none" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <div className="p-6 bg-dark-800 border border-dark-600 rounded-2xl space-y-4">
            <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Phone</label>
              <input value={data.contact.phone} onChange={e => setData(p => ({ ...p, contact: { ...p.contact, phone: e.target.value } }))} className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Email</label>
              <input value={data.contact.email} onChange={e => setData(p => ({ ...p, contact: { ...p.contact, email: e.target.value } }))} className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:outline-none focus:border-primary/50" />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Location</label>
              <input value={data.contact.location} onChange={e => setData(p => ({ ...p, contact: { ...p.contact, location: e.target.value } }))} className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-xl text-white focus:outline-none focus:border-primary/50" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
