import { useState, useEffect } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { EmailFooter } from '../components/EmailFooter';

// Define gallery images
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
  '/IMG-20250918-WA0001.jpg'
];

interface GalleryPageProps {
  lightboxOpen: boolean;
  setLightboxOpen: (open: boolean) => void;
}

export const GalleryPage = ({ lightboxOpen, setLightboxOpen }: GalleryPageProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    setCurrentImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    setTimeout(() => setIsNavigating(false), 200);
  };

  const prevImage = () => {
    if (isNavigating) return;
    setIsNavigating(true);
    setCurrentImageIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
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
          setCurrentImageIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
          setTimeout(() => setIsNavigating(false), 200);
        }
      } else if (e.key === 'ArrowRight') {
        if (!isNavigating) {
          setIsNavigating(true);
          setCurrentImageIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
          setTimeout(() => setIsNavigating(false), 200);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, isNavigating]);

  return (
    <div className="page-container">
      {/* Background */}
      <div
        className="bg-image-overlay"
        style={{
          backgroundImage: 'url(/trees.jpg)',
          filter: 'brightness(0.4)',
        }}
      />

      {/* Gradient Overlay */}
      <div className="fixed-gradient-overlay" />

      <div className="page-content">
        <div className="content-wrapper-lg">
          <h1 className="page-title mb-3">Gallery</h1>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 md:gap-4">
          {GALLERY_IMAGES.map((img, index) => (
            <div
              key={index}
              className="inline-block w-full mb-3 md:mb-4 group cursor-pointer"
              onClick={() => openLightbox(index)}
              style={{
                pageBreakInside: 'avoid',
                breakInside: 'avoid',
                WebkitColumnBreakInside: 'avoid'
              } as React.CSSProperties}
            >
              <div className="relative overflow-hidden rounded-lg md:rounded-xl shadow-lg" style={{
                WebkitTransform: 'translate3d(0, 0, 0)',
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              } as React.CSSProperties}>
                <img
                  src={img}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-auto object-cover display-block"
                  loading="lazy"
                  decoding="async"
                  style={{
                    display: 'block',
                    WebkitUserSelect: 'none',
                    userSelect: 'none',
                    WebkitTransform: 'translateZ(0)',
                    transform: 'translateZ(0)',
                    imageRendering: 'crisp-edges'
                  } as React.CSSProperties}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 flex items-end p-3 md:p-4 pointer-events-none rounded-lg md:rounded-xl" style={{
                  boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.5), 0 25px 50px -12px rgba(16, 185, 129, 0.2)'
                } as React.CSSProperties}>
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
            className="lightbox-overlay"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Close Button */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setLightboxOpen(false);
              }}
              className="lightbox-close-btn"
              role="button"
              aria-label="Close lightbox"
              tabIndex={0}
            >
              <X size={28} className="md:w-8 md:h-8" />
            </div>

            {/* Previous Button - Desktop */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="lightbox-nav-btn hidden md:block left-4"
              aria-label="Previous image"
            >
              <ChevronDown size={40} className="rotate-90" />
            </button>

            {/* Next Button - Desktop */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="lightbox-nav-btn hidden md:block right-4"
              aria-label="Next image"
            >
              <ChevronDown size={40} className="-rotate-90" />
            </button>

            {/* Image Container */}
            <div className="max-w-5xl max-h-[90vh] w-full flex items-center justify-center touch-pan-x" onClick={(e) => e.stopPropagation()}>
              <img
                src={GALLERY_IMAGES[currentImageIndex]}
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
                className="bg-stone-900/80 backdrop-blur-sm text-white active:text-emerald-700 rounded-full p-4 active:scale-95 shadow-lg"
                aria-label="Previous image"
              >
                <ChevronDown size={28} className="rotate-90" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="bg-stone-900/80 backdrop-blur-sm text-white active:text-emerald-700 rounded-full p-4 active:scale-95 shadow-lg"
                aria-label="Next image"
              >
                <ChevronDown size={28} className="-rotate-90" />
              </button>
            </div>

            {/* Image Counter */}
            <div className="lightbox-counter">
              <span className="lightbox-counter-text">
                {currentImageIndex + 1} / {GALLERY_IMAGES.length}
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
        <div className="footer-box">
          <EmailFooter message="Inspired? Let's plan your adventure:"/>
        </div>
        </div>
      </div>
    </div>
  );
};
