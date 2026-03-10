import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#002147] text-white py-12 px-6 md:px-16 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Left Section: About University */}
        <div className="space-y-4 text-center md:text-left">
          <h2 className="text-xl font-bold mb-4 border-b border-white/10 pb-2 inline-block">
             About UAP
          </h2>
          <p className="text-sm leading-relaxed text-gray-300">
            Since its establishment in 1981, this University has been playing a
            vital role in imparting Agricultural Education and conducting basic
            and applied agricultural research throughout the Province, and
            disseminating the results among the farmers
            and general public.
          </p>
        </div>

        {/* Middle Section: Quick Links */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold mb-6 border-b border-white/10 pb-2 inline-block">
            Links
          </h2>
          {/* Mobile par 1 column, desktop par 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
            {[
              "Home",
              "About us",
              "Tenders",
              "Jobs / Careers",
              "Auctions",
              "UAP Alumni",
              "Annual Reports",
              "News Letters",
              "Picture Galleries",
              "Guest House",
            ].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex items-center justify-center md:justify-start text-sm text-gray-300 hover:text-white transition-colors"
              >
                <span className="text-yellow-500 mr-2" aria-hidden>
                  ›
                </span>
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Right Section: Public Information & Admin */}
        <div className="space-y-8 text-center md:text-left">
          {/* Public Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              Public Services Office
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-yellow-500 text-lg">📞</span>
                <span>+92 91 9221144 Ext: 3344</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-yellow-500 text-lg">✉️</span>
                <a href="mailto:pio@aup.edu.pk" className="hover:underline">
                  pio@aup.edu.pk
                </a>
              </div>
            </div>
          </div>

          {/* Director Admin */}
          <div>
            <h2 className="text-xl font-bold mb-4 border-t border-white/10 pt-4 md:border-none">
               Director Administration
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-yellow-500 text-lg">📞</span>
                <span>+92 91 9221167 Ext: 3142</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-yellow-500 text-lg">✉️</span>
                <a href="mailto:admin@aup.edu.pk" className="hover:underline">
                  admin@aup.edu.pk
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} University of Agriculture, Peshawar. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;