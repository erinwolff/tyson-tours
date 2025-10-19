import { useState } from 'react';
import { Clock, X } from 'lucide-react';
import { EmailFooter } from '../components/EmailFooter';

export const PackagesPage = () => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const packages = [
    {
      title: 'Keiki Express',
      price: '$75',
      duration: '1-3 hours',
      age: 'Kids aged 2-17',
      description:
        'An educational experience catered to kids aged 2-17. This package can be anything from rock hunting down the Yellowstone to playing down on the farm. Your kids will have a fun-filled time learning about nature!',
      requirements: 'Guardians are still responsible for providing Tyson with a 6-pack of local beer and 1 locally grown joint',
      qualifier: null,
    },
    {
      title: 'Bozeman Bar Hopper',
      price: '$150',
      duration: 'One full day or night',
      age: '21+',
      description:
        'Spend a minimum 6 hours drinking and frolicking through the streets of Bozeman! Learn fun facts about Montana\'s rich history while throwing back beers and riding bikes from bar to bar. This is perfect for bachelorette/bachelor parties, birthdays, romping around with the boys, or general tomfoolery with a side of knowledge.',
      requirements: 'Must provide Tyson with a 12-pack of local beer and 6 locally grown joints',
      qualifier: 'Before the experience begins, participants must shotgun a beer and successfully ride a bike around the block to qualify',
      upgrade: 'Can be upgraded to a 24 hr experience',
    },
    {
      title: 'Day Tripper',
      price: '$200',
      duration: '1-2 days',
      age: 'All ages',
      description:
        'For those adventurers who love fishing, this one is for you! Spend a day or two floating down the Yellowstone River. Tyson will tell you about the endemic plants and animals of the Yellowstone all while having a rocking party. Options for making flies, processing the fish caught, or other endless opportunities available!',
      requirements: 'Must provide Tyson with a minimum of 18 local beers, 2 locally grown joints, and 1 wax pen',
      qualifier: 'Participants must drunkenly trial run on the boat before the initial experience to show no signs of seasickness',
    },
    {
      title: 'Crazy Mountains Camper',
      price: '$125',
      duration: '2-6 hours',
      age: 'All ages',
      description:
        'Join Tyson and friends for a foraging extravaganza! Mushroom hunt through the Crazy Mountains while learning about the diversity of fungi found throughout western Montana. At the end of the trip, Tyson will show how to properly clean/store/cook all types of mushrooms found. Options for a mycological inoculation class available in conjunction with initial package.',
      requirements: 'Must provide Tyson with 12 local beers and 4 locally grown joints',
      qualifier: 'Participants must bong a beer then climb a tree successfully to join',
      upgrade: 'Can be extended multiple days for most experienced hikers',
    },
    {
      title: 'Wheel of Fortune',
      price: '$???',
      duration: '1-16 hours',
      age: 'All ages',
      description:
        'Spin the wheel and let your conversations guide the day—(nearly) anything is possible! Put your day in the hands of the gods. Bring above-mentioned snacks, beers and provisions and clear your calendar. Let your curiosity be your guide!',
      requirements: 'Provisions will be based on length of experience',
      qualifier: null,
    },
  ];

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
    <div className="page-container">
      {/* Background */}
      <div
        className="bg-image-overlay"
        style={{
          backgroundImage: 'url(/river.jpg)',
          filter: 'brightness(0.4)',
        }}
      />

      {/* Gradient Overlay */}
      <div className="gradient-overlay" />

      <div className="page-content">
        <div className="content-wrapper">
          <h1 className="page-title mb-6">Our Packages</h1>
          <p className="content-box-sm text-stone-200 mb-4 text-lg inline-block">
            These are some of our packages which are subject to change based on the needs/wants of the group.
          </p>
          <p className="content-box-sm text-stone-200 mb-12 text-base">
            All parties are required to provide Tyson with beers and marijuana; longer trips will require at least one meal and copious snacks. All experiences are non-negotiably dog friendly—must love dogs to join. A liability waiver must be signed to participate.
          </p>

        <div className="space-y-8">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className="package-card group"
            >
              {/* Angled accent stripe */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-800/20 to-green-600/20 transform rotate-45 translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />

              <div className="relative p-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                  <div className="flex-1">
                    <div className="badge">
                      <span className="badge-text">{pkg.age}</span>
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
                    <div className="price-box">
                      <div className="price-label">Price</div>
                      <div className="price-amount">{pkg.price}</div>
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
                  className="btn-primary"
                >
                  Book This Adventure →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Booking Modal */}
        {bookingModalOpen && selectedPackage && (
          <div
            className="modal-backdrop"
            onClick={closeBookingModal}
          >
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              {!bookingSuccess ? (
                <>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="modal-title">Book Your Tour</h3>
                      <p className="modal-subtitle">{selectedPackage.title}</p>
                    </div>
                    <button
                      onClick={closeBookingModal}
                      className="text-stone-400 hover:text-emerald-700"
                      aria-label="Close modal"
                    >
                      <X size={28} />
                    </button>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div>
                      <label className="form-label">Name *</label>
                      <input
                        type="text"
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        required
                        className="form-input"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        value={bookingEmail}
                        onChange={(e) => setBookingEmail(e.target.value)}
                        required
                        className="form-input"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label className="form-label">Preferred Date *</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        required
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label className="form-label">Special Requests / Notes</label>
                      <textarea
                        value={bookingNotes}
                        onChange={(e) => setBookingNotes(e.target.value)}
                        rows={4}
                        className="form-input resize-none"
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
                        className="btn-cancel"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-submit flex-1"
                      >
                        Submit Booking
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="success-icon">✓</div>
                  <h3 className="success-title">Booking Submitted!</h3>
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
        <div className="footer-box">
          <EmailFooter message="Ready to explore? Contact us:"/>
        </div>
        </div>
      </div>
    </div>
  );
};
