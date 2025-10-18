import { useState, useEffect, useMemo } from 'react';
import { Menu, X, ChevronDown, Clock, Users, Mail } from 'lucide-react';

export default function TourGuideSite() {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [liabilityName, setLiabilityName] = useState('');
  const [liabilityAgreed, setLiabilityAgreed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

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
      name: 'Meryl Streep',
      text: 'What a rockin time. Tyson taught us all about the Yellowstone river while we crushed beers with the boys! 10/10 would recommend.',
    },
    {
      name: 'Creative Team for Helldiver',
      text: 'We had the best time last night! Ripping doobs while riding bikes around Bozeman was an epic way to spend our vacation. Tyson even put me in the basket on his bike when I was too drunk to pedal home for the night.',
    },
    {
      name: 'George Washington and Thomas Jefferson',
      text: 'Our custom Tyson Tour was one for the history books! We learned all about the local culture in the Black Feet and Crow communities. It was amazing to see how our past policies and laws written directly affected these peoples. I\'ve recommended these tours to all my colleagues.',
    },
    {
      name: 'Hayao Miyazaki',
      text: 'Tyson gave our kids the funnest afternoon we\'ve ever had. We learned all about the local ecology down on the farm, even got to participate in his coveted Miyazaki method! We will be back.',
    },
  ];

  const galleryImages = [
    '/assets/WhatsApp Image 2025-09-18 at 08.05.08.jpeg',
    '/assets/WhatsApp Image 2025-09-18 at 08.05.08(1).jpeg',
    '/assets/WhatsApp Image 2025-09-18 at 08.05.09.jpeg',
    '/assets/WhatsApp Image 2025-09-18 at 08.07.44.jpeg',
    '/assets/WhatsApp Image 2025-09-18 at 08.08.55.jpeg',
    '/assets/WhatsApp Image 2025-09-18 at 08.08.56.jpeg',
    '/assets/WhatsApp Image 2025-09-18 at 08.08.56(1).jpeg',
    '/assets/IMG-20250918-WA0001.jpg',
    '/assets/IMG-20250918-WA0004.jpg',
    '/assets/IMG-20250918-WA0005.jpg',
    '/assets/IMG-20250918-WA0006.jpg',
    '/assets/IMG-20250918-WA0007.jpg',
    '/assets/IMG-20250918-WA0008.jpg',
    '/assets/IMG-20250918-WA0009.jpg',
    '/assets/IMG-20250918-WA0010.jpg',
    '/assets/IMG-20250918-WA0011.jpg',
    '/assets/IMG-20250918-WA0012.jpg',
    '/assets/IMG-20250918-WA0013.jpg',
    '/assets/IMG-20250918-WA0014.jpg',
    '/assets/IMG-20250918-WA0015.jpg',
    '/assets/IMG-20250918-WA0016.jpg',
    '/assets/IMG-20250918-WA0017.jpg',
    '/assets/IMG-20250918-WA0018.jpg',
    '/assets/IMG-20250918-WA0019.jpg',
    '/assets/IMG-20250918-WA0020.jpg',
    '/assets/IMG-20250918-WA0021.jpg',
    '/assets/IMG-20250918-WA0022.jpg',
    '/assets/IMG-20250918-WA0023.jpg',
    '/assets/IMG-20250918-WA0024.jpg',
    '/assets/IMG-20250918-WA0025.jpg',
    '/assets/IMG-20250918-WA0026.jpg',
    '/assets/IMG-20250918-WA0027.jpg',
    '/assets/IMG-20250918-WA0028.jpg',
    '/assets/IMG-20250918-WA0029.jpg',
    '/assets/IMG-20250918-WA0030.jpg',
  ];

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Packages', page: 'packages' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Liability', page: 'liability' },
  ];

  // Navigation Component
  const Navigation = () => (
    <>
      <nav className="bg-gradient-to-b from-stone-900 to-transparent py-6 px-4 fixed top-0 left-0 right-0 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-green-500">
            Tyson Tours
          </h1>

          {/* Hamburger Menu Button */}
          <button
            className="text-gray-300 hover:text-yellow-500 transition-colors z-50 relative"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Backdrop Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={closeMenu}
        />
      )}

      {/* Slide-in Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-stone-900 to-stone-800 border-l border-yellow-900/30 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex justify-between items-center p-6 border-b border-yellow-900/30">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-600 to-green-500">
              Navigation
            </h2>
            <button
              onClick={closeMenu}
              className="text-gray-300 hover:text-yellow-500 transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-2 p-6 flex-1">
            {navItems.map((item, idx) => (
              <button
                key={item.page}
                onClick={() => {
                  setCurrentPage(item.page);
                  closeMenu();
                  setScrollY(0);
                }}
                className={`text-left px-4 py-3 rounded-lg font-medium transition-all transform hover:translate-x-1 ${
                  currentPage === item.page
                    ? 'text-yellow-500 bg-yellow-900/20 border border-yellow-900/50'
                    : 'text-gray-300 hover:text-yellow-500 hover:bg-stone-700/50'
                }`}
                style={{
                  animationDelay: `${idx * 50}ms`,
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Email Footer */}
          <div className="p-6 border-t border-yellow-900/30">
            <a
              href="mailto:tysontours.contact@gmail.com"
              className="flex items-center gap-2 text-gray-400 hover:text-yellow-500 transition-colors text-sm"
            >
              <Mail size={16} />
              tysontours.contact@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );

  // Home Page
  const HomePage = () => (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 via-emerald-950 to-stone-900">
      <div className="pt-40 px-4 min-h-screen flex flex-col justify-between">
        {/* Hero */}
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-green-400"
            style={{
              opacity: Math.max(0, 1 - scrollY / 500),
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          >
            Tyson Tours
          </h1>
          <p
            className="text-xl md:text-2xl text-gray-300 mb-12"
            style={{
              opacity: Math.max(0, 1 - scrollY / 500),
              transform: `translateY(${scrollY * 0.3}px)`,
            }}
          >
            Real adventures with real people
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
            Here at Tyson Tours, we aim to provide you with a silly and educational experience! Our award-winning tours can be shaped and molded into the adventure of a lifetime.

            Perfect for birthday parties, bar mitzvahs, corporate events, sorority/fraternity rush week, wedding receptions, nights out with the homies, or any other event!
          </p>
          <p className="text-lg text-gray-400">
            Tyson and Jessica Stillman know no stranger, so be prepared for new friends for life!
          </p>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-stone-800/50 border-t border-yellow-900/30 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-yellow-500">
            What People Say
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
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
            href="mailto:tysontours.contact@gmail.com"
            className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 font-semibold"
          >
            <Mail size={20} />
            tysontours.contact@gmail.com
          </a>
          <p className="text-gray-500 text-xs mt-4">
            Made by{' '}
            <a
              href="https://github.com/erinwolff"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500 transition-colors"
            >
              Erin Wolff
            </a>
          </p>
        </div>
      </div>
    </div>
  );

  // About Page
  const AboutPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-emerald-950 pt-40 px-4 pb-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-8 text-yellow-500">About Tyson</h1>

        <div className="space-y-6 text-gray-300 leading-relaxed">
          <p className="text-lg">
            Tyson Stillman was born and raised on the Yellowstone River in Livingston, Montana. Throughout his childhood, he discovered a love for the rich history and flora and fauna surrounding him!
          </p>

          <p className="text-lg">
            Those formative hobbies transpired into an education at MSU. Tyson acquired a degree in sustainable agriculture and Native American studies. His thirst for knowledge led him to further his studies, learning the ins and outs of the nursery business and arboreal work, a fascination with mycology leading to the building of a mushroom facility on the farm, and taking his agricultural degree to the next level by growing a large and bountiful garden to feed his community.
          </p>

          <p className="text-lg">
             Tyson runs{' '}
             <a
               href="https://www.shieldsriverfarm.com/"
               target="_blank"
               rel="noopener noreferrer"
               className="text-yellow-500 hover:text-yellow-400 underline decoration-yellow-500/50 hover:decoration-yellow-400 transition-colors"
             >
               Shield River Farm and Nursery
             </a>
             {' '}with his amazing wife, Jessica. Together they have carved out a little slice of paradise ready to share with all you adventurers out there!
          </p>
        </div>

        {/* Email Footer */}
        <div className="mt-16 border-t border-yellow-900/30 pt-8">
          <p className="text-gray-400 text-center mb-4">Questions? Get in touch:</p>
          <a
            href="mailto:tysontours.contact@gmail.com"
            className="flex items-center justify-center gap-2 text-yellow-500 hover:text-yellow-400 font-semibold"
          >
            <Mail size={20} />
            tysontours.contact@gmail.com
          </a>
          <p className="text-gray-500 text-xs mt-4 text-center">
            Made by{' '}
            <a
              href="https://github.com/erinwolff"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500 transition-colors"
            >
              Erin Wolff
            </a>
          </p>
        </div>
      </div>
    </div>
  );

  // Packages Page
  const PackagesPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-stone-900 to-emerald-950 pt-40 px-4 pb-12">
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
            href="mailto:tysontours.contact@gmail.com"
            className="flex items-center justify-center gap-2 text-yellow-500 hover:text-yellow-400 font-semibold"
          >
            <Mail size={20} />
            tysontours.contact@gmail.com
          </a>
          <p className="text-gray-500 text-xs mt-4 text-center">
            Made by{' '}
            <a
              href="https://github.com/erinwolff"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-yellow-500 transition-colors"
            >
              Erin Wolff
            </a>
          </p>
        </div>
      </div>
    </div>
  );

  // Gallery Page
  const GalleryPage = () => {
    const openLightbox = (index: number) => {
      setCurrentImageIndex(index);
      setLightboxOpen(true);
    };

    const closeLightbox = () => {
      setLightboxOpen(false);
    };

    const nextImage = () => {
      if (isNavigating) return;
      setIsNavigating(true);
      setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
      setTimeout(() => setIsNavigating(false), 200);
    };

    const prevImage = () => {
      if (isNavigating) return;
      setIsNavigating(true);
      setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      setTimeout(() => setIsNavigating(false), 200);
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-900 to-emerald-950 pt-40 px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-yellow-500">Gallery</h1>
          <p className="text-gray-400 mb-8 md:mb-12 text-base md:text-lg">Moments from the trail with Tyson</p>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="break-inside-avoid mb-3 md:mb-4 group cursor-pointer active:scale-95 transition-transform"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden rounded-lg md:rounded-xl shadow-lg hover:shadow-2xl hover:shadow-yellow-900/50 transition-all duration-300 border-2 border-transparent active:border-yellow-500/50">
                  <img
                    src={img}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-110 group-active:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 flex items-end p-3 md:p-4">
                    <span className="text-white font-semibold text-xs md:text-sm">Tap to view</span>
                  </div>
                  {/* Mobile tap indicator */}
                  <div className="absolute top-2 right-2 md:hidden bg-black/50 backdrop-blur-sm rounded-full p-1.5">
                    <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {lightboxOpen && (
            <div className="fixed inset-0 bg-black/95 z-[60] flex items-center justify-center p-0 md:p-4">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-3 right-3 md:top-4 md:right-4 text-white hover:text-yellow-500 active:text-yellow-500 transition-colors z-[70] bg-stone-900/70 md:bg-transparent rounded-full p-2 md:p-0"
                aria-label="Close lightbox"
              >
                <X size={32} className="md:w-10 md:h-10" />
              </button>

              {/* Previous Button - Desktop */}
              <button
                onClick={prevImage}
                className="hidden md:block absolute left-4 text-white hover:text-yellow-500 transition-colors z-[70] bg-stone-900/50 hover:bg-stone-800/50 rounded-full p-3"
                aria-label="Previous image"
              >
                <ChevronDown size={40} className="rotate-90" />
              </button>

              {/* Next Button - Desktop */}
              <button
                onClick={nextImage}
                className="hidden md:block absolute right-4 text-white hover:text-yellow-500 transition-colors z-[70] bg-stone-900/50 hover:bg-stone-800/50 rounded-full p-3"
                aria-label="Next image"
              >
                <ChevronDown size={40} className="-rotate-90" />
              </button>

              {/* Image Container */}
              <div className="max-w-5xl max-h-[90vh] w-full flex items-center justify-center touch-pan-x">
                <img
                  src={galleryImages[currentImageIndex]}
                  alt={`Gallery image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-[90vh] object-contain md:rounded-lg shadow-2xl"
                />
              </div>

              {/* Mobile Navigation Buttons */}
              <div className="md:hidden absolute bottom-20 left-0 right-0 flex justify-center gap-4 z-[70]">
                <button
                  onClick={prevImage}
                  className="bg-stone-900/80 backdrop-blur-sm text-white active:text-yellow-500 rounded-full p-4 active:scale-95 transition-all shadow-lg"
                  aria-label="Previous image"
                >
                  <ChevronDown size={28} className="rotate-90" />
                </button>
                <button
                  onClick={nextImage}
                  className="bg-stone-900/80 backdrop-blur-sm text-white active:text-yellow-500 rounded-full p-4 active:scale-95 transition-all shadow-lg"
                  aria-label="Next image"
                >
                  <ChevronDown size={28} className="-rotate-90" />
                </button>
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-4 md:bottom-4 left-1/2 transform -translate-x-1/2 bg-stone-900/90 backdrop-blur-sm px-4 md:px-6 py-2 rounded-full z-[70]">
                <span className="text-white font-semibold text-sm md:text-base">
                  {currentImageIndex + 1} / {galleryImages.length}
                </span>
              </div>

              {/* Swipe hint for mobile */}
              <div className="md:hidden absolute top-1/2 left-4 right-4 flex justify-between pointer-events-none opacity-30">
                <div className="text-white text-4xl">‹</div>
                <div className="text-white text-4xl">›</div>
              </div>
            </div>
          )}

          {/* Email Footer */}
          <div className="mt-16 border-t border-yellow-900/30 pt-8">
            <p className="text-gray-400 text-center mb-4">Inspired? Let's plan your adventure:</p>
            <a
              href="mailto:tysontours.contact@gmail.com"
              className="flex items-center justify-center gap-2 text-yellow-500 hover:text-yellow-400 font-semibold"
            >
              <Mail size={20} />
              tysontours.contact@gmail.com
            </a>
            <p className="text-gray-500 text-xs mt-4 text-center">
              Made by{' '}
              <a
                href="https://github.com/erinwolff"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-500 transition-colors"
              >
                Erin Wolff
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Liability Page
  const LiabilityPage = useMemo(() => {
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (liabilityName && liabilityAgreed) {
        setSubmittedName(liabilityName);
        setShowSuccess(true);
        setLiabilityName('');
        setLiabilityAgreed(false);

        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 5000);
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-stone-900 to-emerald-950 pt-40 px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-yellow-500">Liability Waiver</h1>

          {/* Success Modal */}
          {showSuccess && (
            <>
              {/* Backdrop */}
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                {/* Modal */}
                <div className="bg-gradient-to-br from-green-900 to-emerald-900 border-2 border-green-500 rounded-lg p-8 max-w-md w-full shadow-2xl shadow-green-500/50 animate-scale-in">
                  <div className="text-center">
                    <div className="mb-4 text-green-400 text-6xl">✓</div>
                    <h3 className="text-3xl font-bold text-green-400 mb-4">Waiver Signed!</h3>
                    <p className="text-gray-200 text-lg mb-2">
                      Thanks <span className="text-yellow-400 font-semibold">{submittedName}</span>!
                    </p>
                    <p className="text-gray-300">
                      Your liability waiver has been acknowledged. We'll see you on the trail!
                    </p>
                    <button
                      onClick={() => setShowSuccess(false)}
                      className="mt-6 px-6 py-2 bg-yellow-600 hover:bg-yellow-500 text-white font-bold rounded transition-colors"
                    >
                      Awesome!
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="space-y-8">
            {/* Introduction */}
            <div className="bg-stone-800/30 border border-yellow-900/20 rounded-lg p-8">
              <p className="text-gray-300 leading-relaxed mb-4">
                Look, we're gonna have a great time, but let's be real about what you're signing up for. This isn't your average corporate tour company with lawyers and insurance out the wazoo. This is Tyson Tours—raw, authentic, and a little rough around the edges.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Read the waiver below and sign if you're ready to roll.
              </p>
            </div>

            {/* Liability Form */}
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-stone-800 to-stone-900 border border-yellow-900/30 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-yellow-500 mb-6">Official Waiver</h2>

              <div className="space-y-6 text-gray-300 leading-relaxed mb-8">
                <p>
                  I{' '}
                  <input
                    type="text"
                    value={liabilityName}
                    onChange={(e) => setLiabilityName(e.target.value)}
                    placeholder="(Your Full Name)"
                    className="inline-block mx-2 px-3 py-1 bg-stone-700 border border-yellow-900/50 rounded text-yellow-400 placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 min-w-[200px]"
                    required
                  />{' '}
                  understand that Tyson Tours LLC is not responsible for any harm that becomes me during our time together.
                </p>

                <p>
                  I accept that Tyson will be smoking and drinking and will provide those for him based on the experience.
                </p>

                <p>
                  I will wear the appropriate attire for the package chosen.
                </p>

                <p>
                  I understand that Tyson is diabetic and will need to eat regularly.
                </p>
              </div>

              <div className="border-t border-yellow-900/30 pt-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={liabilityAgreed}
                    onChange={(e) => setLiabilityAgreed(e.target.checked)}
                    className="mt-1 w-5 h-5 bg-stone-700 border-yellow-900/50 rounded text-yellow-500 focus:ring-yellow-500 focus:ring-2"
                    required
                  />
                  <span className="text-gray-300 group-hover:text-yellow-500 transition-colors">
                    I have read and agree to the terms stated above. I understand the risks and am ready to have an unforgettable time with Tyson Tours.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={!liabilityName || !liabilityAgreed}
                className="mt-8 w-full bg-gradient-to-r from-yellow-700 to-green-700 hover:from-yellow-600 hover:to-green-600 disabled:from-stone-700 disabled:to-stone-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded transition-all"
              >
                Sign Waiver & Let's Go!
              </button>
            </form>

            {/* Additional Info */}
            <div className="bg-stone-800/30 border border-yellow-900/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-yellow-500 mb-4">The Real Deal</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  <strong className="text-yellow-400">Safety First (ish):</strong> We take your safety seriously, but nature is unpredictable. You might encounter wildlife, rough terrain, weather changes, or Tyson's questionable trail jokes.
                </p>
                <p>
                  <strong className="text-yellow-400">Come Prepared:</strong> Bring proper footwear, water, snacks (for you AND Tyson), and a sense of adventure. Check your package details for specific gear requirements.
                </p>
                <p>
                  <strong className="text-yellow-400">Health Considerations:</strong> These tours involve physical activity. Know your limits. If you have medical conditions, bring what you need and let Tyson know.
                </p>
                <p>
                  <strong className="text-yellow-400">The Tyson Experience:</strong> This is unfiltered wilderness exploration with a guide who keeps it real. Expect honest commentary, occasional smoke breaks, and genuine passion for the outdoors.
                </p>
              </div>
            </div>
          </div>

          {/* Email Footer */}
          <div className="mt-16 border-t border-yellow-900/30 pt-8">
            <p className="text-gray-400 text-center mb-4">Questions about the waiver? Hit us up:</p>
            <a
              href="mailto:tysontours.contact@gmail.com"
              className="flex items-center justify-center gap-2 text-yellow-500 hover:text-yellow-400 font-semibold"
            >
              <Mail size={20} />
              tysontours.contact@gmail.com
            </a>
            <p className="text-gray-500 text-xs mt-4 text-center">
              Made by{' '}
              <a
                href="https://github.com/erinwolff"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-yellow-500 transition-colors"
              >
                Erin Wolff
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }, [liabilityName, liabilityAgreed, showSuccess, submittedName]);

  return (
    <div className="bg-stone-900 text-white overflow-x-hidden">
      <Navigation />

      {currentPage === 'home' && <HomePage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'packages' && <PackagesPage />}
      {currentPage === 'gallery' && <GalleryPage />}
      {currentPage === 'liability' && LiabilityPage}
    </div>
  );
}