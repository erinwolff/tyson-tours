import { Mail } from 'lucide-react';

interface EmailFooterProps {
  message?: string;
  className?: string;
}

export const EmailFooter = ({ message }: EmailFooterProps) => (
  <div>
    {message && <p className="text-stone-400 text-center mb-4">{message}</p>}
    <div className="flex items-center justify-center">
      <a
        href="mailto:tysontours.contact@gmail.com"
        className="inline-flex items-center gap-2 text-emerald-700 hover:text-emerald-600 font-semibold"
      >
        <Mail size={20} />
        tysontours.contact@gmail.com
      </a>
    </div>
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
);
