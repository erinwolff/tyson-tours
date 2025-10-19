import { ChevronDown } from 'lucide-react';
import { EmailFooter } from '../components/EmailFooter';

interface HomePageProps {
  scrollY: number;
}

export const HomePage = ({ scrollY }: HomePageProps) => {
  const testimonials = [
    {
      name: 'Meryl Streep',
      text: 'What a rockin time. Tyson taught us all about the Yellowstone river while we crushed beers with the boys! 10/10 would recommend.',
    },
    {
      name: 'Creative Team for Helldivers',
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

  return (
    <div className="min-h-screen relative">
      <div className="pt-32 px-4 relative z-10">
        {/* Hero Section - Fixed height container */}
        <div className="min-h-screen flex flex-col items-center justify-start pt-20 md:pt-25">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main title - always visible, moves up on scroll */}
            <h1
              className="text-7xl md:text-9xl text-emerald-700 tracking-wider drop-shadow-[0_0_30px_rgba(5,150,105,0.5)] mb-8"
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
      <div className="pb-20 px-4">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-stone-900/90 via-stone-800/80 to-emerald-950/60 backdrop-blur-md rounded-2xl border-2 border-emerald-900/40 shadow-2xl p-8 md:p-12">
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
      <div className="px-4">
        <div className="max-w-6xl mx-auto bg-stone-900/60 backdrop-blur-sm p-6 rounded-lg">
          <EmailFooter message="Questions? Get in touch:" />
        </div>
      </div>
    </div>
  );
};
