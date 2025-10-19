import { useState, useEffect } from 'react';
import { Menu, X, Mail } from 'lucide-react';
import { Scene3D } from './components/3d/Scene3D';
import { LoadingScreen } from './components/LoadingScreen';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { PackagesPage } from './pages/PackagesPage';
import { GalleryPage } from './pages/GalleryPage';
import { LiabilityPage } from './pages/LiabilityPage';

// Define gallery images outside component to prevent re-creation on renders
const GALLERY_IMAGES = [
  '/IMG-20250918-WA0024.jpg',
  '/WhatsApp Image 2025-09-18 at 08.05.08(1).jpeg',
  '/WhatsApp Image 2025-09-18 at 08.05.09.jpeg',
  '/IMG-20250918-WA0016.jpg',
  '/WhatsApp Image 2025-09-18 at 08.07.44.jpeg',
  '/WhatsApp Image 2025-09-18 at 08.08.56.jpeg',
   '/IMG-20250918-WA0012.jpg',
  '/WhatsApp Image 2025-09-18 at 08.08.56(1).jpeg',
   '/IMG-20250918-WA0023.jpg',
  '/IMG-20250918-WA0001.jpg',
  '/IMG-20250918-WA0004.jpg',
  '/IMG-20250918-WA0006.jpg',
  '/IMG-20250918-WA0007.jpg',
  '/IMG-20250918-WA0009.jpg',
  '/IMG-20250918-WA0011.jpg',
  '/IMG-20250918-WA0013.jpg',
  '/IMG-20250918-WA0014.jpg',
  '/WhatsApp Image 2025-09-18 at 08.08.55.jpeg',
  '/IMG-20250918-WA0017.jpg',
  '/IMG-20250918-WA0021.jpg',
  '/IMG-20250918-WA0022.jpg',
  '/WhatsApp Image 2025-09-18 at 08.05.08.jpeg',
  '/IMG-20250918-WA0026.jpg',
  '/IMG-20250918-WA0027.jpg',
  '/IMG-20250918-WA0028.jpg',
  '/IMG-20250918-WA0029.jpg',
  '/IMG-20250918-WA0005.jpg',
  '/IMG-20250918-WA0010.jpg',
  '/IMG-20250918-WA0015.jpg',
  '/IMG-20250918-WA0020.jpg',
  '/IMG-20250918-WA0025.jpg',
  '/IMG-20250918-WA0030.jpg',
];

// Polaroid rotation angles for variety
const POLAROID_ROTATIONS = [-8, 5, -3, 7, 4, -6, 3, -5];

// Scattered Polaroid Gallery component - Grid layout before text
const PolaroidGallery = ({ scrollY }: { scrollY: number }) => {
  const opacity = Math.max(0, Math.min(1, (scrollY - 100) / 200));

  // Select images
  const desktopImages = GALLERY_IMAGES.slice(0, 8);
  const mobileImages = GALLERY_IMAGES.slice(0, 6);

  return (
    <div
      className="absolute w-full left-0 pointer-events-none z-0"
      style={{
        top: 'calc(100vh + 2rem)',
        opacity
      }}
    >
      <div className="max-w-5xl mx-auto px-4 mb-20 sm:mb-28 lg:mb-36 xl:mb-44">
        {/* Mobile only: 2x3 grid (6 photos) */}
        <div className="md:hidden grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-8 sm:gap-y-10">
          {mobileImages.map((img, index) => (
            <div
              key={`polaroid-mobile-${index}`}
              className="polaroid-photo justify-self-center"
              style={{
                animationDelay: `${index * 0.15}s`,
                '--rotation': `${POLAROID_ROTATIONS[index]}deg`
              } as React.CSSProperties & { '--rotation': string }}
            >
              <div className="bg-white p-2 shadow-2xl polaroid-inner">
                <img
                  src={img}
                  alt={`Adventure memory ${index + 1}`}
                  className="w-32 h-28 sm:w-36 sm:h-32 object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="h-5 sm:h-6" />
              </div>
            </div>
          ))}
        </div>

        {/* iPad & Desktop: 4x2 grid */}
        <div className="hidden md:grid grid-cols-4 gap-x-6 gap-y-8 xl:gap-x-8 xl:gap-y-12">
          {desktopImages.map((img, index) => (
            <div
              key={`polaroid-${index}`}
              className="polaroid-photo justify-self-center"
              style={{
                animationDelay: `${index * 0.1}s`,
                '--rotation': `${POLAROID_ROTATIONS[index]}deg`
              } as React.CSSProperties & { '--rotation': string }}
            >
              <div className="bg-white p-2 xl:p-3 shadow-2xl polaroid-inner">
                <img
                  src={img}
                  alt={`Adventure memory ${index + 1}`}
                  className="w-32 h-28 xl:w-40 xl:h-34 2xl:w-48 2xl:h-40 object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="h-6 xl:h-8 2xl:h-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function TourGuideSite() {
  const [currentPage, setCurrentPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Scroll to top when navigating to home page
  useEffect(() => {
    if (currentPage === 'home') {
      window.scrollTo(0, 0);
    }
  }, [currentPage]);

  const closeMenu = () => setMenuOpen(false);

  // Reusable navigation function
  const navigateToPage = (page: string) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

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
      <nav className="bg-gradient-to-b from-stone-900 to-transparent py-6 px-4 md:px-6 absolute top-0 left-0 right-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-700 cursor-pointer"
              onClick={() => navigateToPage('home')}>
            Tyson Tours
          </h1>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => navigateToPage(item.page)}
                className={`relative font-medium text-lg group ${
                  currentPage === item.page
                    ? 'text-emerald-600'
                    : 'text-stone-300 hover:text-emerald-500'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-600 ${
                  currentPage === item.page ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>
            ))}
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            className="md:hidden text-stone-300 hover:text-emerald-600 z-50 relative"
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
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gradient-to-b from-stone-900 to-stone-800 border-l border-emerald-950/30 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex justify-between items-center p-6 border-b border-emerald-950/30">
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-800 to-emerald-700">
              Navigation
            </h2>
            <button
              onClick={closeMenu}
              className="text-stone-200 hover:text-emerald-700"
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
                  navigateToPage(item.page);
                  closeMenu();
                }}
                className={`text-left px-4 py-3 rounded-lg font-medium ${
                  currentPage === item.page
                    ? 'text-emerald-700 bg-emerald-950/20 border border-emerald-950/50'
                    : 'text-stone-200 hover:text-emerald-700 hover:bg-stone-700/50'
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
          <div className="p-6 border-t border-emerald-950/30">
            <a
              href="mailto:tysontours.contact@gmail.com"
              className="flex items-center gap-2 text-stone-400 hover:text-emerald-700 transition-colors text-sm"
            >
              <Mail size={16} />
              tysontours.contact@gmail.com
            </a>
          </div>
        </div>
      </div>
    </>
  );

  // Calculate scroll progress for 3D animations
  const scrollProgress = Math.min(scrollY / 2000, 1);

  return (
    <>
      {loading && <LoadingScreen onLoadComplete={() => setLoading(false)} />}

      <div className={`text-white overflow-x-hidden relative ${currentPage === 'home' ? '' : 'bg-stone-900'}`}>
        {/* 3D Background Scene - Only on home page */}
        {currentPage === 'home' && !loading && (
          <Scene3D scrollProgress={scrollProgress} mousePosition={mousePosition} />
        )}

        <Navigation />

        {currentPage === 'home' && (
          <div className="relative">
            {/* Polaroid Gallery - Rendered outside HomePage to prevent re-renders */}
            <PolaroidGallery scrollY={scrollY} />
            <HomePage scrollY={scrollY} />
          </div>
        )}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'packages' && <PackagesPage />}
        {currentPage === 'gallery' && <GalleryPage />}
        {currentPage === 'liability' && <LiabilityPage />}
      </div>
    </>
  );
}
