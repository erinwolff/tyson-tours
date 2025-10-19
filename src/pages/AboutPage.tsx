import { EmailFooter } from '../components/EmailFooter';

export const AboutPage = () => (
  <div className="page-container">
    {/* Background */}
    <div
      className="bg-image-overlay"
      style={{
        backgroundImage: 'url(/forest.jpg)',
        filter: 'brightness(0.4)',
      }}
    />

    {/* Gradient Overlay */}
    <div className="gradient-overlay-strong" />

    <div className="page-content">
      <div className="content-wrapper-md">
        <h1 className="page-title mb-8">About Tyson</h1>

        {/* First paragraph - full width */}
        <div className="mb-6">
          <p className="content-box text-lg">
            Tyson Stillman was born and raised on the Yellowstone River in Livingston, Montana. Throughout his childhood, he discovered a love for the rich history and flora and fauna surrounding him!
          </p>
        </div>

        {/* Image and text side by side on larger screens */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Tyson's Photo */}
          <div className="content-box-sm">
            <img
              src="/IMG-20250918-WA0018.jpg"
              alt="Tyson on an adventure"
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Second and third paragraphs alongside image */}
          <div className="flex flex-col gap-6">
            <p className="content-box text-lg">
              Those formative hobbies transpired into an education at MSU. Tyson acquired a degree in sustainable agriculture and Native American studies. His thirst for knowledge led him to further his studies, learning the ins and outs of the nursery business and arboreal work, a fascination with mycology leading to the building of a mushroom facility on the farm, and taking his agricultural degree to the next level by growing a large and bountiful garden to feed his community.
            </p>

            <p className="content-box text-lg">
               Tyson runs{' '}
               <a
                 href="https://www.shieldsriverfarm.com/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-emerald-700 hover:text-emerald-600 underline decoration-emerald-700/50 hover:decoration-emerald-600 transition-colors"
               >
                 Shields River Farm and Nursery
               </a>
               {' '}with his amazing wife, Jessica. Together they have carved out a little slice of paradise ready to share with all you adventurers out there!
            </p>
          </div>
        </div>

        {/* Email Footer */}
        <div className="footer-box">
          <EmailFooter message="Questions? Get in touch:" />
        </div>
      </div>
    </div>
  </div>
);
