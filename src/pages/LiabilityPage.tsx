import { useState } from 'react';
import { EmailFooter } from '../components/EmailFooter';

export const LiabilityPage = () => {
  const [liabilityName, setLiabilityName] = useState('');
  const [liabilityAgreed, setLiabilityAgreed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedName, setSubmittedName] = useState('');

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
      <div className="content-wrapper-sm">
        <h1 className="page-title mb-8">Liability Waiver</h1>

        {/* Success Modal */}
        {showSuccess && (
          <>
            {/* Backdrop */}
            <div
              className="modal-backdrop"
              onClick={() => setShowSuccess(false)}
            >
              {/* Modal */}
              <div
                className="success-modal"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="success-icon">✓</div>
                  <h3 className="success-title">Waiver Signed!</h3>
                  <p className="text-gray-200 text-lg mb-2">
                    Thanks <span className="text-emerald-600 font-semibold">{submittedName}</span>!
                  </p>
                  <p className="text-stone-200">
                    Your liability waiver has been acknowledged. We'll see you on the trail!
                  </p>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="mt-6 px-6 py-2 btn-submit w-auto"
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
                  className="form-input-inline"
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
              className="mt-8 btn-submit"
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
        <div className="footer-box">
          <EmailFooter message="Questions about the waiver? Hit us up:" />
        </div>
      </div>
    </div>
  );
};
