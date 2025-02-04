import React, { useState } from 'react';

const Hero = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-white via-blue-50 to-white'}`}>
      {/* Navbar */}
      <nav className={`shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <a href="#" className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-blue-600'}`}>PayCheck </a>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button 
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                onClick={toggleDarkMode}
              >
                Toggle Dark Mode
              </button>
              <a
                href="/login"
                className="px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold transition"
              >
                Login
              </a>
              <a
                href="/signup"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-semibold transition"
              >
                Signup
              </a>
            </div>
            <div className="md:hidden">
              <button className={`${darkMode ? 'text-gray-300' : 'text-gray-800'} focus:outline-none`}>☰</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Animated shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-0 left-0 w-96 h-96 rounded-full mix-blend-multiply blur-3xl animate-blob ${darkMode ? 'bg-blue-800/20' : 'bg-blue-200/20'}`}></div>
        <div className={`absolute top-0 right-0 w-96 h-96 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-2000 ${darkMode ? 'bg-blue-700/20' : 'bg-blue-300/20'}`}></div>
        <div className={`absolute -bottom-8 left-20 w-96 h-96 rounded-full mix-blend-multiply blur-3xl animate-blob animation-delay-4000 ${darkMode ? 'bg-blue-600/20' : 'bg-blue-400/20'}`}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-8">
            <span className="inline-block">Explore the</span>
            <br />
            <span className={`inline-block bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent ${darkMode ? 'text-white' : ''}`}>Payment Projects</span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-xl transition-colors duration-300 ${darkMode ? 'text-gray-300' : 'text-gray-600'}">
            A platform where you'llSend money with confidence and speed. We prioritize your safety and convenience
          </p>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto" id="features">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-card-pop ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-white/50'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center transition-transform duration-300 ${darkMode ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-600'}`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const features = [
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
    title: "Secure Payments",
    description: "Bank-grade security with end-to-end encryption for all transactions",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Instant Transfers",
    description: "Send and receive money instantly, anytime and anywhere",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),
    title: "Bill Payments",
    description: "Pay all your bills in one place with automatic reminders",
  },
  {
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Rewards",
    description: "Earn cashback and points on every transaction",
  },
];

export default Hero;
