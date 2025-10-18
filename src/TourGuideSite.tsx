import { useState, useEffect, useMemo } from 'react';
import { Menu, X, ChevronDown, Clock, Mail } from 'lucide-react';
import { Scene3D } from './components/3d/Scene3D';
import { LoadingScreen } from './components/LoadingScreen';

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
                '--rotation': `${POLAROID_ROTATIONS[index]}deg`,
                animationDelay: `${index * 0.15}s`
              } as React.CSSProperties & { '--rotation': string }}
            >
              <div className="bg-white p-2 shadow-2xl">
                <img
                  src={img}
                  alt={`Adventure memory ${index + 1}`}
                  className="w-32 h-28 sm:w-36 sm:h-32 object-cover"
                  loading="eager"
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
                '--rotation': `${POLAROID_ROTATIONS[index]}deg`,
                animationDelay: `${index * 0.1}s`
              } as React.CSSProperties & { '--rotation': string }}
            >
              <div className="bg-white p-2 xl:p-3 shadow-2xl">
                <img
                  src={img}
                  alt={`Adventure memory ${index + 1}`}
                  className="w-32 h-28 xl:w-40 xl:h-34 2xl:w-48 2xl:h-40 object-cover"
                  loading="eager"
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
  const [liabilityName, setLiabilityName] = useState('');
  const [liabilityAgreed, setLiabilityAgreed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
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

  const packages = [
    {
      title: 'Keiki Express',
      price: '$75',
      duration: '1-3 hours',
      age: 'Kids aged 2-17',
      description:
        'An educational experience catered to kids aged 2-17. This package can be anything from rock hunting down the Yellowstone to playing down on the farm. Your kids will have a fun-filled time learning about nature!',
      requirements: '* Guardians are still responsible for providing Tyson with a 6-pack of local beer and 1 locally grown joint',
      qualifier: null,
    },
    {
      title: 'Bozeman Bar Hopper',
      price: '$150',
      duration: 'One full day or night',
      age: '21+',
      description:
        'Spend a minimum 6 hours drinking and frolicking through the streets of Bozeman! Learn fun facts about Montana\'s rich history while throwing back beers and riding bikes from bar to bar. This is perfect for bachelorette/bachelor parties, birthdays, romping around with the boys, or general tomfoolery with a side of knowledge.',
      requirements: '* Must provide Tyson with a 12-pack of local beer and 6 locally grown joints',
      qualifier: '** Before the experience begins, participants must shotgun a beer and successfully ride a bike around the block to qualify',
      upgrade: 'Can be upgraded to a 24 hr experience',
    },
    {
      title: 'Day Tripper',
      price: '$200',
      duration: '1-2 days',
      age: 'All ages',
      description:
        'For those adventurers who love fishing, this one is for you! Spend a day or two floating down the Yellowstone River. Tyson will tell you about the endemic plants and animals of the Yellowstone all while having a rocking party. Options for making flies, processing the fish caught, or other endless opportunities available!',
      requirements: '* Must provide Tyson with a minimum of 18 local beers, 2 locally grown joints, and 1 wax pen',
      qualifier: '** Participants must drunkenly trial run on the boat before the initial experience to show no signs of seasickness',
    },
    {
      title: 'Crazy Mountains Camper',
      price: '$125',
      duration: '2-6 hours',
      age: 'All ages',
      description:
        'Join Tyson and friends for a foraging extravaganza! Mushroom hunt through the Crazy Mountains while learning about the diversity of fungi found throughout western Montana. At the end of the trip, Tyson will show how to properly clean/store/cook all types of mushrooms found. Options for a mycological inoculation class available in conjunction with initial package.',
      requirements: '* Must provide Tyson with 12 local beers and 4 locally grown joints',
      qualifier: '** Participants must bong a beer then climb a tree successfully to join',
      upgrade: 'Can be extended multiple days for most experienced hikers',
    },
    {
      title: 'Wheel of Fortune',
      price: '$???',
      duration: '1-16 hours',
      age: 'All ages',
      description:
        'Spin the wheel and let your conversations guide the day—(nearly) anything is possible! Put your day in the hands of the gods. Bring above-mentioned snacks, beers and provisions and clear your calendar. Let your curiosity be your guide!',
      requirements: '* Provisions will be based on length of experience',
      qualifier: null,
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

  const galleryImages = GALLERY_IMAGES;

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
      <nav className={`bg-gradient-to-b from-stone-900 to-transparent py-6 px-4 md:px-6 absolute top-0 left-0 right-0 z-40 ${lightboxOpen ? 'hidden' : ''}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-700 cursor-pointer"
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo(0, 0);
              }}>
            Tyson Tours
          </h1>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  setCurrentPage(item.page);
                  window.scrollTo(0, 0);
                }}
                className={`relative font-medium text-lg transition-colors duration-300 group ${
                  currentPage === item.page
                    ? 'text-emerald-600'
                    : 'text-stone-300 hover:text-emerald-500'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-600 transition-[width] duration-300 ease-out ${
                  currentPage === item.page ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>
            ))}
          </div>

          {/* Mobile Hamburger Menu Button */}
          <button
            className="md:hidden text-stone-300 hover:text-emerald-600 transition-colors z-50 relative"
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
              className="text-stone-200 hover:text-emerald-700 transition-colors"
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
                  window.scrollTo(0, 0);
                }}
                className={`text-left px-4 py-3 rounded-lg font-medium transition-colors duration-300 ${
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

  // Home Page
  const HomePage = () => (
    <div className="min-h-screen relative">
      <div className="pt-32 px-4 relative z-10">
        {/* Hero Section - Fixed height container */}
        <div className="min-h-screen flex flex-col items-center justify-start pt-20 md:pt-25">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main title - always visible, moves up on scroll */}
            <h1
              className="text-7xl md:text-9xl font-bebas text-emerald-700 tracking-wider drop-shadow-[0_0_30px_rgba(5,150,105,0.5)] mb-8"
              style={{
                opacity: Math.max(0.4, 1 - scrollY / 600),
                transform: `translateY(${scrollY * 0.5}px)`,
              }}
            >
              TYSON TOURS
            </h1>

            {/* Subtitle - fades in immediately */}
            <div
              className="mb-6"
              style={{
                opacity: Math.max(0, Math.min(1, 1 - scrollY / 400)),
                transform: `translateY(${scrollY * 0.3}px)`,
              }}
            >
              <p className="text-2xl md:text-3xl text-stone-300 font-light tracking-wide">
                Real adventures with real people
              </p>
            </div>

            {/* Tagline */}
            <div
              className="mb-16"
              style={{
                opacity: Math.max(0, Math.min(1, 1 - scrollY / 350)),
                transform: `translateY(${scrollY * 0.25}px)`,
              }}
            >
              <p className="text-lg md:text-xl text-emerald-500/90 italic">
                Where every trail tells a story
              </p>
            </div>

            {/* Scroll indicator */}
            <div
              style={{
                opacity: Math.max(0, 1 - scrollY / 200),
              }}
            >
              <ChevronDown size={48} className="mx-auto text-emerald-700 drop-shadow-[0_0_20px_rgba(5,150,105,0.6)] animate-bounce" />
            </div>
          </div>
        </div>

        {/* Description Section - Appears after scroll */}
        <div className="max-w-3xl mx-auto pb-32 relative z-20 px-4 pt-120 sm:pt-150 md:pt-80 lg:pt-80 xl:pt-120">
          <div
            className="text-center md:text-left bg-stone-900/80 backdrop-blur-sm p-6 sm:p-8 rounded-lg"
            style={{
              opacity: Math.max(0, Math.min(1, (scrollY - 1) / 50)),
            }}
          >
            <p className="text-lg md:text-xl text-stone-200 leading-relaxed mb-6">
              Here at Tyson Tours, we aim to provide you with a silly and educational experience! Our award-winning tours can be shaped and molded into the adventure of a lifetime.
            </p>
            <p className="text-lg md:text-xl text-stone-200 leading-relaxed mb-6">
              Perfect for birthday parties, bar mitzvahs, corporate events, sorority/fraternity rush week, wedding receptions, nights out with the homies, or any other event!
            </p>
            <p className="text-lg md:text-xl text-stone-200 leading-relaxed mb-6">
              Tyson and Jessica Stillman know no stranger, so be prepared for new friends for life!
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-stone-800/50 border-t border-emerald-950/30 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-16 text-emerald-700">
            What People Say
          </h1>
          <div className="grid md:grid-cols-4 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-stone-900/80 border border-emerald-950/20 rounded-lg p-6 hover:border-emerald-950/50 transition-colors"
              >
                <p className="text-stone-200 mb-4 italic">"{testimonial.text}"</p>
                <p className="text-emerald-700 font-semibold">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Email Footer */}
      <div className="border-t border-emerald-950/30 py-12 px-4 bg-stone-900">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
          <p className="text-stone-400">Questions? Get in touch:</p>
          <a
            href="mailto:tysontours.contact@gmail.com"
            className="flex items-center gap-2 text-emerald-700 hover:text-emerald-600 font-semibold"
          >
            <Mail size={20} />
            tysontours.contact@gmail.com
          </a>
          <p className="text-stone-500 text-xs mt-4">
            Made by{' '}
            <a
              href="https://github.com/erinwolff"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-emerald-700 transition-colors"
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/forest.jpg)',
          filter: 'brightness(0.4)',
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b via-stone-900/50 to-emerald-950/40" />

      <div className="relative z-10 pt-40 px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-8 text-emerald-700 drop-shadow-lg">About Tyson</h1>

          {/* First paragraph - full width */}
          <div className="mb-6">
            <p className="text-lg bg-stone-900/60 backdrop-blur-sm p-6 rounded-lg border border-emerald-950/30 text-stone-200 leading-relaxed">
              Tyson Stillman was born and raised on the Yellowstone River in Livingston, Montana. Throughout his childhood, he discovered a love for the rich history and flora and fauna surrounding him!
            </p>
          </div>

          {/* Image and text side by side on larger screens */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Tyson's Photo */}
            <div className="bg-stone-900/60 backdrop-blur-sm p-4 rounded-lg border border-emerald-950/30">
              <img
                src="/IMG-20250918-WA0018.jpg"
                alt="Tyson on an adventure"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>

            {/* Second and third paragraphs alongside image */}
            <div className="flex flex-col gap-6">
              <p className="text-lg bg-stone-900/60 backdrop-blur-sm p-6 rounded-lg border border-emerald-950/30 text-stone-200 leading-relaxed">
                Those formative hobbies transpired into an education at MSU. Tyson acquired a degree in sustainable agriculture and Native American studies. His thirst for knowledge led him to further his studies, learning the ins and outs of the nursery business and arboreal work, a fascination with mycology leading to the building of a mushroom facility on the farm, and taking his agricultural degree to the next level by growing a large and bountiful garden to feed his community.
              </p>

              <p className="text-lg bg-stone-900/60 backdrop-blur-sm p-6 rounded-lg border border-emerald-950/30 text-stone-200 leading-relaxed">
                 Tyson runs{' '}
                 <a
                   href="https://www.shieldsriverfarm.com/"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-emerald-700 hover:text-emerald-600 underline decoration-emerald-700/50 hover:decoration-emerald-600 transition-colors"
                 >
                   Shield River Farm and Nursery
                 </a>
                 {' '}with his amazing wife, Jessica. Together they have carved out a little slice of paradise ready to share with all you adventurers out there!
              </p>
            </div>
          </div>

          {/* Email Footer */}
          <div className="mt-16 border-t border-emerald-950/30 pt-8 bg-stone-900/60 backdrop-blur-sm p-6 rounded-lg">
            <p className="text-stone-400 text-center mb-4">Questions? Get in touch:</p>
            <a
              href="mailto:tysontours.contact@gmail.com"
              className="flex items-center justify-center gap-2 text-emerald-700 hover:text-emerald-600 font-semibold"
            >
              <Mail size={20} />
              tysontours.contact@gmail.com
            </a>
            <p className="text-stone-500 text-xs mt-4 text-center">
              Made by{' '}
              <a
                href="https://github.com/erinwolff"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-emerald-700 transition-colors"
              >
                Erin Wolff
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Packages Page
  const PackagesPage = useMemo(() => {
    const openBookingModal = (pkg: any) => {
      setSelectedPackage(pkg);
      setBookingModalOpen(true);
      setBookingSuccess(false);
    };

    const closeBookingModal = () => {
      setBookingModalOpen(false);
      setBookingName('');
      setBookingEmail('');
      setBookingDate('');
      setBookingNotes('');
      setBookingSuccess(false);
    };

    const handleBookingSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setBookingSuccess(true);
      setTimeout(() => {
        closeBookingModal();
      }, 7000);
    };

    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/river.jpg)',
            filter: 'brightness(0.4)',
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/0 via-stone-900/30 to-emerald-950/70" />

        <div className="relative z-10 pt-40 px-4 pb-12">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 text-emerald-700 drop-shadow-lg">Our Packages</h1>
            <p className="text-stone-200 mb-4 text-lg bg-stone-900/60 backdrop-blur-sm p-4 rounded-lg border border-emerald-950/30 inline-block">
              These are some of our packages which are subject to change based on the needs/wants of the group.
            </p>
            <p className="text-stone-200 mb-12 text-base bg-stone-900/60 backdrop-blur-sm p-4 rounded-lg border border-emerald-950/30">
              All parties are required to provide Tyson with beers and marijuana; longer trips will require at least one meal and copious snacks. All experiences are non-negotiably dog friendly—must love dogs to join. A liability waiver must be signed to participate.
            </p>

          <div className="space-y-8">
            {packages.map((pkg, idx) => (
              <div
                key={idx}
                className="relative bg-gradient-to-br from-stone-800/50 via-stone-900/80 to-black/90 border-2 border-emerald-950/40 rounded-xl overflow-hidden hover:border-emerald-700/60 transition-all duration-300 group"
              >
                {/* Angled accent stripe */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-800/20 to-green-600/20 transform rotate-45 translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />

                <div className="relative p-8">
                  {/* Header Section */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div className="flex-1">
                      <div className="inline-block bg-emerald-950/30 border border-emerald-800/50 px-3 py-1 rounded-full mb-3">
                        <span className="text-emerald-600 text-xs font-semibold uppercase tracking-wider">{pkg.age}</span>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-bold text-emerald-700 group-hover:text-emerald-600 transition-colors mb-2">
                        {pkg.title}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-stone-400">
                        <div className="flex items-center gap-1.5">
                          <Clock size={18} className="text-emerald-800" />
                          <span>{pkg.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-start md:items-end">
                      <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-2 border-green-500/50 rounded-lg px-6 py-4 shadow-lg shadow-green-900/30">
                        <div className="text-xs text-green-300 uppercase tracking-wide mb-1">Price</div>
                        <div className="text-4xl font-bold text-green-400">{pkg.price}</div>
                      </div>
                      {pkg.upgrade && (
                        <p className="text-emerald-600 text-xs mt-3 italic max-w-[180px] text-right">
                          ⭐ {pkg.upgrade}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-stone-200 text-lg leading-relaxed mb-6 border-l-4 border-emerald-950/50 pl-4">
                    {pkg.description}
                  </p>

                  {/* Requirements Section */}
                  <div className="bg-stone-900/60 border border-emerald-950/30 rounded-lg p-5 mb-6">
                    <h3 className="text-emerald-700 font-semibold mb-2 flex items-center gap-2">
                      <span className="text-xl">🍺</span> What to Bring:
                    </h3>
                    <p className="text-stone-400 text-sm leading-relaxed mb-3">
                      {pkg.requirements}
                    </p>
                    {pkg.qualifier && (
                      <div className="bg-emerald-950/20 border-l-4 border-emerald-700 p-3 rounded">
                        <p className="text-emerald-600 text-sm font-medium flex items-start gap-2">
                          <span className="text-lg">⚡</span>
                          <span>{pkg.qualifier}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={() => openBookingModal(pkg)}
                    className="w-full bg-gradient-to-tr from-stone-700 via-emerald-900/80 to-stone-700 hover:from-stone-600 hover:via-emerald-800/80 hover:to-stone-600 text-white text-lg font-bold py-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-emerald-900/50 border border-emerald-950/30 hover:border-emerald-800/50"
                  >
                    Book This Adventure →
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Booking Modal */}
          {bookingModalOpen && selectedPackage && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-gradient-to-br from-stone-900 to-stone-800 border-2 border-emerald-950/50 rounded-lg p-8 max-w-lg w-full shadow-2xl shadow-emerald-950/50 max-h-[90vh] overflow-y-auto">
                {!bookingSuccess ? (
                  <>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-3xl font-bold text-emerald-700 mb-2">Book Your Tour</h3>
                        <p className="text-xl text-stone-200">{selectedPackage.title}</p>
                      </div>
                      <button
                        onClick={closeBookingModal}
                        className="text-stone-400 hover:text-emerald-700 transition-colors"
                        aria-label="Close modal"
                      >
                        <X size={28} />
                      </button>
                    </div>

                    <form onSubmit={handleBookingSubmit} className="space-y-4">
                      <div>
                        <label className="block text-stone-200 mb-2 font-semibold">Name *</label>
                        <input
                          type="text"
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          required
                          className="w-full px-4 py-2 bg-stone-700 border border-emerald-950/50 rounded text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/50"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-200 mb-2 font-semibold">Email *</label>
                        <input
                          type="email"
                          value={bookingEmail}
                          onChange={(e) => setBookingEmail(e.target.value)}
                          required
                          className="w-full px-4 py-2 bg-stone-700 border border-emerald-950/50 rounded text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/50"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-200 mb-2 font-semibold">Preferred Date *</label>
                        <input
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          required
                          className="w-full px-4 py-2 bg-stone-700 border border-emerald-950/50 rounded text-gray-200 focus:outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/50"
                        />
                      </div>

                      <div>
                        <label className="block text-stone-200 mb-2 font-semibold">Special Requests / Notes</label>
                        <textarea
                          value={bookingNotes}
                          onChange={(e) => setBookingNotes(e.target.value)}
                          rows={4}
                          className="w-full px-4 py-2 bg-stone-700 border border-emerald-950/50 rounded text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-700/50 resize-none"
                          placeholder="Any special requests, group size, dietary restrictions, etc."
                        />
                      </div>

                      <div className="bg-emerald-950/20 border border-emerald-950/50 rounded-lg p-4 mt-6">
                        <p className="text-emerald-600 text-sm font-semibold mb-2">Remember to bring:</p>
                        <p className="text-stone-200 text-sm">{selectedPackage.requirements}</p>
                      </div>

                      <div className="flex gap-4 mt-6">
                        <button
                          type="button"
                          onClick={closeBookingModal}
                          className="flex-1 px-6 py-3 bg-stone-700 hover:bg-stone-600 text-white font-bold rounded transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-800 to-green-700 hover:from-emerald-800 hover:to-green-600 text-white font-bold rounded transition-all"
                        >
                          Submit Booking
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="mb-4 text-green-400 text-6xl">✓</div>
                    <h3 className="text-3xl font-bold text-green-400 mb-4">Booking Submitted!</h3>
                    <p className="text-gray-200 text-lg mb-2">
                      Thanks <span className="text-emerald-600 font-semibold">{bookingName}</span>!
                    </p>
                    <p className="text-stone-200">
                      We'll reach out to you at <span className="text-emerald-600">{bookingEmail}</span> to confirm your {selectedPackage.title} adventure!
                    </p>
                    <p className="text-stone-400 text-sm mt-4">
                      Don't forget to sign the liability waiver before your tour!
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Email Footer */}
          <div className="mt-16 border-t border-emerald-950/30 pt-8 bg-stone-900/60 backdrop-blur-sm p-6 rounded-lg">
            <p className="text-stone-200 text-center mb-4">Ready to explore? Contact us:</p>
            <a
              href="mailto:tysontours.contact@gmail.com"
              className="flex items-center justify-center gap-2 text-emerald-700 hover:text-emerald-600 font-semibold"
            >
              <Mail size={20} />
              tysontours.contact@gmail.com
            </a>
            <p className="text-stone-500 text-xs mt-4 text-center">
              Made by{' '}
              <a
                href="https://github.com/erinwolff"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-emerald-700 transition-colors"
              >
                Erin Wolff
              </a>
            </p>
          </div>
          </div>
        </div>
      </div>
    );
  }, [bookingModalOpen, selectedPackage, bookingSuccess, bookingName, bookingEmail, bookingDate, bookingNotes]);

  // Gallery Page
  const GalleryPage = () => {
    const openLightbox = (index: number) => {
      setCurrentImageIndex(index);
      setLightboxOpen(true);
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

    // Keyboard navigation for lightbox
    useEffect(() => {
      if (!lightboxOpen) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setLightboxOpen(false);
        } else if (e.key === 'ArrowLeft') {
          if (!isNavigating) {
            setIsNavigating(true);
            setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
            setTimeout(() => setIsNavigating(false), 200);
          }
        } else if (e.key === 'ArrowRight') {
          if (!isNavigating) {
            setIsNavigating(true);
            setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
            setTimeout(() => setIsNavigating(false), 200);
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, isNavigating, galleryImages.length]);

    return (
      <div className="min-h-screen relative overflow-hidden">
        {/* Fixed Background */}
        <div
          className="fixed inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/trees.jpg)',
            filter: 'brightness(0.4)',
          }}
        />

        {/* Gradient Overlay */}
        <div className="fixed inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/50 to-emerald-950/70" />

        <div className="relative z-10 pt-40 px-4 pb-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-emerald-700 drop-shadow-lg">Gallery</h1>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
            {galleryImages.map((img, index) => (
              <div
                key={index}
                className="break-inside-avoid mb-3 md:mb-4 group cursor-pointer active:scale-95 transition-transform"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden rounded-lg md:rounded-xl shadow-lg hover:shadow-2xl hover:shadow-emerald-950/50 transition-all duration-300 border-2 border-transparent active:border-emerald-700/50">
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
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {lightboxOpen && (
            <div
              className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-0 md:p-4"
              onClick={() => setLightboxOpen(false)}
            >
              {/* Close Button */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxOpen(false);
                }}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-white hover:text-emerald-700 active:text-emerald-700 transition-colors z-[10000] bg-stone-900/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-stone-700/50 cursor-pointer"
                role="button"
                aria-label="Close lightbox"
                tabIndex={0}
              >
                <X size={28} className="md:w-8 md:h-8" />
              </div>

              {/* Previous Button - Desktop */}
              <button
                onClick={prevImage}
                className="hidden md:block absolute left-4 text-white hover:text-emerald-700 transition-colors z-[70] bg-stone-900/50 hover:bg-stone-800/50 rounded-full p-3"
                aria-label="Previous image"
              >
                <ChevronDown size={40} className="rotate-90" />
              </button>

              {/* Next Button - Desktop */}
              <button
                onClick={nextImage}
                className="hidden md:block absolute right-4 text-white hover:text-emerald-700 transition-colors z-[70] bg-stone-900/50 hover:bg-stone-800/50 rounded-full p-3"
                aria-label="Next image"
              >
                <ChevronDown size={40} className="-rotate-90" />
              </button>

              {/* Image Container */}
              <div className="max-w-5xl max-h-[90vh] w-full flex items-center justify-center touch-pan-x" onClick={(e) => e.stopPropagation()}>
                <img
                  src={galleryImages[currentImageIndex]}
                  alt={`Gallery image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-[90vh] object-contain md:rounded-lg shadow-2xl"
                />
              </div>

              {/* Mobile Navigation Buttons */}
              <div className="md:hidden absolute bottom-20 left-0 right-0 flex justify-center gap-4 z-[70]">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="bg-stone-900/80 backdrop-blur-sm text-white active:text-emerald-700 rounded-full p-4 active:scale-95 transition-all shadow-lg"
                  aria-label="Previous image"
                >
                  <ChevronDown size={28} className="rotate-90" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="bg-stone-900/80 backdrop-blur-sm text-white active:text-emerald-700 rounded-full p-4 active:scale-95 transition-all shadow-lg"
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
          <div className="mt-16 border-t border-emerald-950/30 pt-8 bg-stone-900/60 backdrop-blur-sm p-6 rounded-lg">
            <p className="text-stone-200 text-center mb-4">Inspired? Let's plan your adventure:</p>
            <a
              href="mailto:tysontours.contact@gmail.com"
              className="flex items-center justify-center gap-2 text-emerald-700 hover:text-emerald-600 font-semibold"
            >
              <Mail size={20} />
              tysontours.contact@gmail.com
            </a>
            <p className="text-stone-500 text-xs mt-4 text-center">
              Made by{' '}
              <a
                href="https://github.com/erinwolff"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-emerald-700 transition-colors"
              >
                Erin Wolff
              </a>
            </p>
          </div>
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
          <h1 className="text-5xl font-bold mb-8 text-emerald-700">Liability Waiver</h1>

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
                      Thanks <span className="text-emerald-600 font-semibold">{submittedName}</span>!
                    </p>
                    <p className="text-stone-200">
                      Your liability waiver has been acknowledged. We'll see you on the trail!
                    </p>
                    <button
                      onClick={() => setShowSuccess(false)}
                      className="mt-6 px-6 py-2 bg-emerald-800 hover:bg-emerald-700 text-white font-bold rounded transition-colors"
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
            <div className="bg-stone-800/30 border border-emerald-950/20 rounded-lg p-8">
              <p className="text-stone-200 leading-relaxed mb-4">
                Look, we're gonna have a great time, but let's be real about what you're signing up for. This isn't your average corporate tour company with lawyers and insurance out the wazoo. This is Tyson Tours—raw, authentic, and a little rough around the edges.
              </p>
              <p className="text-stone-200 leading-relaxed">
                Read the waiver below and sign if you're ready to roll.
              </p>
            </div>

            {/* Liability Form */}
            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-stone-800 to-stone-900 border border-emerald-950/30 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-emerald-700 mb-6">Official Waiver</h2>

              <div className="space-y-6 text-stone-200 leading-relaxed mb-8">
                <p>
                  I{' '}
                  <input
                    type="text"
                    value={liabilityName}
                    onChange={(e) => setLiabilityName(e.target.value)}
                    placeholder="(Your Full Name)"
                    className="inline-block mx-2 px-3 py-1 bg-stone-700 border border-emerald-950/50 rounded text-emerald-600 placeholder-gray-500 focus:outline-none focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 min-w-[200px]"
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

              <div className="border-t border-emerald-950/30 pt-6">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={liabilityAgreed}
                    onChange={(e) => setLiabilityAgreed(e.target.checked)}
                    className="mt-1 w-5 h-5 bg-stone-700 border-emerald-950/50 rounded text-emerald-700 focus:ring-emerald-700 focus:ring-2"
                    required
                  />
                  <span className="text-stone-200 group-hover:text-emerald-700 transition-colors">
                    I have read and agree to the terms stated above. I understand the risks and am ready to have an unforgettable time with Tyson Tours.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={!liabilityName || !liabilityAgreed}
                className="mt-8 w-full bg-gradient-to-r from-emerald-800 to-green-700 hover:from-emerald-800 hover:to-green-600 disabled:from-stone-700 disabled:to-stone-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded transition-all"
              >
                Sign Waiver & Let's Go!
              </button>
            </form>

            {/* Additional Info */}
            <div className="bg-stone-800/30 border border-emerald-950/20 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-emerald-700 mb-4">The Real Deal</h2>
              <div className="space-y-4 text-stone-200 leading-relaxed">
                <p>
                  <strong className="text-emerald-600">Safety First (ish):</strong> We take your safety seriously, but nature is unpredictable. You might encounter wildlife, rough terrain, weather changes, or Tyson's questionable trail jokes.
                </p>
                <p>
                  <strong className="text-emerald-600">Come Prepared:</strong> Bring proper footwear, water, snacks (for you AND Tyson), and a sense of adventure. Check your package details for specific gear requirements.
                </p>
                <p>
                  <strong className="text-emerald-600">Health Considerations:</strong> These tours involve physical activity. Know your limits. If you have medical conditions, bring what you need and let Tyson know.
                </p>
                <p>
                  <strong className="text-emerald-600">The Tyson Experience:</strong> This is unfiltered wilderness exploration with a guide who keeps it real. Expect honest commentary, occasional smoke breaks, and genuine passion for the outdoors.
                </p>
              </div>
            </div>
          </div>

          {/* Email Footer */}
          <div className="mt-16 border-t border-emerald-950/30 pt-8">
            <p className="text-stone-400 text-center mb-4">Questions about the waiver? Hit us up:</p>
            <a
              href="mailto:tysontours.contact@gmail.com"
              className="flex items-center justify-center gap-2 text-emerald-700 hover:text-emerald-600 font-semibold"
            >
              <Mail size={20} />
              tysontours.contact@gmail.com
            </a>
            <p className="text-stone-500 text-xs mt-4 text-center">
              Made by{' '}
              <a
                href="https://github.com/erinwolff"
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-400 hover:text-emerald-700 transition-colors"
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
            <HomePage />
          </div>
        )}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'packages' && PackagesPage}
        {currentPage === 'gallery' && <GalleryPage />}
        {currentPage === 'liability' && LiabilityPage}
      </div>
    </>
  );
}