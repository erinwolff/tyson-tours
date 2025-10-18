import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Clock, Users, Mail } from 'lucide-react';

export default function TourGuideSite() {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const packages = [
    {
      title: 'Forest Explorer',
      price: '$45',
      duration: '2-3 hours',
      group: '2-4 people',
      description:
        'A guided walk through our local forests discovering ancient trees, rare mushroom species, and hidden woodland trails. Perfect for nature photographers and beginners.',
    },
    {
      title: 'Mountain Peak Adventure',
      price: '$65',
      duration: '4-5 hours',
      group: '3-6 people',
      description:
        'Challenge yourself on our most rewarding trail. Summit stunning peaks with 360-degree views, explore alpine ecosystems, and experience nature at its most majestic.',
    },
    {
      title: 'Midnight Forest Meditation',
      price: '$55',
      duration: '3 hours',
      group: '2-5 people',
      description:
        'An immersive evening experience through twilight forests. Discover nocturnal wildlife, bioluminescent fungi, and the raw energy of nature after dark.',
    },
    {
      title: 'Mushroom Foraging Masterclass',
      price: '$50',
      duration: '2-3 hours',
      group: '2-4 people',
      description:
        'Learn the art of sustainable mushroom foraging from an expert. Identify edible species, understand ecosystems, and harvest responsibly in pristine wilderness.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      text: 'Best tour guide experience I\'ve ever had. The knowledge and passion for the trails is unmatched.',
    },
    {
      name: 'Marcus T.',
      text: 'Incredible attention to detail. Made me appreciate nature in ways I never expected.',
    },
    {
      name: 'Elena K.',
      text: 'Professional, knowledgeable, and genuinely cares about your experience. Highly recommended.',
    },
  ];

  const galleryImages = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    gradient: [
      'from-amber-900 to-green-900',
      'from-emerald-900 to-teal-900',
      'from-yellow-900 to-amber-900',
      'from-green-900 to-slate-900',
      'from-stone-800 to-green-800',
      'from-yellow-800 to-green-900',
    ][i % 6],
  }));

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Packages', page: 'packages' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Liability', page: 'liability' },
  ];

  // Navigation Component
  const Navigation = () => (
    <nav className="bg-gradient-to-b from-stone-900 to-transparent py-6 px-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-green-500">
          Trail Guide
        </h1>

        {/* Hamburger Menu Button */}
        <button
          className="text-gray-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu */}
      {menuOpen && (
        <div className="bg-stone-900 border-t border-yellow-900/30 mt-4">
          <div className="flex flex-col gap-4 px-4 py-4">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  setCurrentPage(item.page);
                  closeMenu();
                  setScrollY(0);
                }}
                className={`text-left py-2 font-medium transition-colors ${
                  currentPage === item.page
                    ? 'text-yellow-500'
                    : 'text-gray-300 hover:text-yellow-500'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );

  // Home Page
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-emerald-950 to-stone-900">
      <div className="pt-32 px-4 min-h-screen flex flex-col justify-between">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-green-400"
            style={{
              opacity: Math.max(0, 1 - scrollY / 500),
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          >
            Explore Nature
          </h1>
          <p
            className="text-xl md:text-2xl text-gray-300 mb-12"
            style={{
              opacity: Math.max(0, 1 - scrollY / 500),
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          >
            Expert guided tours through pristine wilderness
          </p>
          <div
            className="animate-bounce"
            style={{
              opacity: Math.max(0, 1 - scrollY / 300),
            }}
          >
            <ChevronDown size={40} className="mx-auto text-yellow-500" />
          </div>
        </div>

        {/* Description */}
        <div className="max-w-3xl mx-auto mb-20">
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Experience the raw power and quiet beauty of untamed nature. With over a decade of expertise, we craft personalized journeys through pristine landscapes—from misty forest floors teeming with rare mushrooms to windswept mountain peaks where the soul finds silence.
          </p>
          <p className="text-lg text-gray-400">
            Whether you seek adventure, meditation, or discovery, our tours are designed for those who hear the call of the wild.
          </p>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-stone-800/50 border-t border-yellow-900/30 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-yellow-500">
            What People Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-stone-900/80 border border-yellow-900/20 rounded-lg p-6 hover:border-yellow-900/50 transition-colors"
              >
                <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <p className="text-yellow-500 font-semibold">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Email Footer */}
      <div className="border-t border-yellow-900/30 py-12 px-4 bg-stone-900">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
          <p className="text-gray-400">Questions? Get in touch:</p>
          <a
            href="mailto:contact@trailguide.com"
            className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 font-semibold"
          >
            <Mail size={20} />
            contact@trailguide.com
          </a>
        </div>
      </div>
    </div>
  );

  // About Page
  const AboutPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-emerald-950 pt-32 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-yellow-500">About Us</h1>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p className="text-lg">
            Born from a lifelong passion for wilderness and a deep respect for nature's power, we've dedicated ourselves to sharing the transformative experience of guided exploration. Every trail tells a story. Every forest holds secrets. Every summit rewards those brave enough to seek it.
          </p>

          <p className="text-lg">
            Our approach blends adventure with education. We don't just take you on hikes—we teach you to read the land, understand ecosystems, and develop a genuine connection with the natural world. Whether it's identifying rare mushroom species or decoding bird calls, knowledge deepens appreciation.
          </p>

          <p className="text-lg">
            We operate with a metalhead's ethos: raw, authentic, unapologetic. No corporate polish, no manufactured experiences. Just real wilderness, expert guidance, and genuine passion for helping you discover why these trails matter.
          </p>

          <p className="text-lg">
            Safety, sustainability, and respect for nature guide everything we do. We're committed to leaving no trace and ensuring these pristine landscapes remain untamed for generations to come.
          </p>
        </div>

        {/* Email Footer */}
        <div className="mt-16 border-t border-yellow-900/30 pt-8">
          <p className="text-gray-400 text-center mb-4">Questions? Get in touch:</p>
          <a
            href="mailto:contact@trailguide.com"
            className="flex items-center justify-center gap-2 text-yellow-500 hover:text-yellow-400 font-semibold"
          >
            <Mail size={20} />
            contact@trailguide.com
          </a>
        </div>
      </div>
    </div>
  );

  // Packages Page
  const PackagesPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-emerald-950 pt-32 px-4 pb-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-16 text-yellow-500">Our Packages</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-stone-800 to-stone-900 border border-yellow-900/30 rounded-lg p-8 hover:border-yellow-900/60 transition-colors group"
            >
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-yellow-500 group-hover:text-yellow-400 transition-colors">
                  {pkg.title}
                </h2>
                <span className="text-3xl font-bold text-green-400">{pkg.price}</span>
              </div>

              <div className="flex gap-6 mb-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-yellow-600" />
                  {pkg.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-yellow-600" />
                  {pkg.group}
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">{pkg.description}</p>

              <button className="mt-6 w-full bg-gradient-to-r from-yellow-700 to-green-700 hover:from-yellow-600 hover:to-green-600 text-white font-bold py-2 rounded transition-all">
                Book Tour
              </button>
            </div>
          ))}
        </div>

        {/* Email Footer */}
        <div className="mt-16 border-t border-yellow-900/30 pt-8">
          <p className="text-gray-400 text-center mb-4">Ready to explore? Contact us:</p>
          <a
            href="mailto:contact@trailguide.com"
            className="flex items-center justify-center gap-2 text-yellow-500 hover:text-yellow-400 font-semibold"
          >
            <Mail size={20} />
            contact@trailguide.com
          </a>
        </div>
      </div>
    </div>
  );

  // Gallery Page
  const GalleryPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-emerald-950 pt-32 px-4 pb-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-16 text-yellow-500">Gallery</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              className={`h-56 rounded-lg bg-gradient-to-br ${img.gradient} hover:shadow-lg hover:shadow-yellow-900/50 transition-all transform hover:scale-105 cursor-pointer`}
            />
          ))}
        </div>

        {/* Email Footer */}
        <div className="mt-16 border-t border-yellow-900/30 pt-8">
          <p className="text-gray-400 text-center mb-4">Inspired? Let's plan your adventure:</p>
          <a
            href="mailto:contact@trailguide.com"
            className="flex items-center justify-center gap-2 text-yellow-500 hover:text-yellow-400 font-semibold"
          >
            <Mail size={20} />
            contact@trailguide.com
          </a>
        </div>
      </div>
    </div>
  );

  // Liability Page
  const LiabilityPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-emerald-950 pt-32 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-yellow-500">Liability & Safety</h1>

        <div className="space-y-6 text-gray-300 leading-relaxed bg-stone-800/30 border border-yellow-900/20 rounded-lg p-8">
          <section>
            <h2 className="text-2xl font-bold text-yellow-500 mb-3">Assumption of Risk</h2>
            <p>
              Outdoor activities involve inherent risks including but not limited to: falls, exposure to extreme weather, wildlife encounters, and physical exertion. Participants acknowledge these risks and engage in activities voluntarily.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-yellow-500 mb-3">Participant Responsibility</h2>
            <p>
              All participants must be in adequate physical condition for the chosen tour. We recommend consulting with a healthcare provider before participating. Participants are responsible for disclosing any medical conditions or physical limitations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-yellow-500 mb-3">Waiver of Liability</h2>
            <p>
              By booking a tour, participants agree to release, indemnify, and hold harmless our company and guides from any claims, damages, or liability arising from participation in guided tours.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-yellow-500 mb-3">Safety Guidelines</h2>
            <p>
              Participants must follow all safety instructions provided by guides. We reserve the right to terminate tours if participant behavior endangers themselves or others. Weather conditions may necessitate tour cancellation or modification.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-yellow-500 mb-3">Equipment & Gear</h2>
            <p>
              Participants are responsible for bringing appropriate gear including proper footwear, weather protection, and hydration. We provide guidance on recommended equipment for each tour.
            </p>
          </section>
        </div>

        {/* Email Footer */}
        <div className="mt-16 border-t border-yellow-900/30 pt-8">
          <p className="text-gray-400 text-center mb-4">Questions about safety? Contact us:</p>
          <a
            href="mailto:contact@trailguide.com"
            className="flex items-center justify-center gap-2 text-yellow-500 hover:text-yellow-400 font-semibold"
          >
            <Mail size={20} />
            contact@trailguide.com
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-stone-900 text-white overflow-x-hidden">
      <Navigation />

      {currentPage === 'home' && <HomePage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'packages' && <PackagesPage />}
      {currentPage === 'gallery' && <GalleryPage />}
      {currentPage === 'liability' && <LiabilityPage />}
    </div>
  );
}