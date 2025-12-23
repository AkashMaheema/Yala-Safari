"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Yala Safari</h3>
            <p className="text-gray-400">
              Experience the wild beauty of Sri Lanka&apos;s most famous
              national park.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>📞 +94 77 123 4567</li>
              <li>✉️ info@yalasafari.lk</li>
              <li>📍 Yala National Park, Sri Lanka</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="#about"
                  className="hover:text-green-500 transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#packages"
                  className="hover:text-green-500 transition-colors"
                >
                  Safari Packages
                </a>
              </li>
              <li>
                <a
                  href="#booking"
                  className="hover:text-green-500 transition-colors"
                >
                  Book Now
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Yala Safari. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
