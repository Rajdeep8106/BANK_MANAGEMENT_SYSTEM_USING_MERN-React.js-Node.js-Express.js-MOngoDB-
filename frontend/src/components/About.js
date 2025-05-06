import React from 'react';
const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 py-8">
      <div className="w-full bg-white/5 backdrop-blur-lg shadow-2xl border border-white/10 rounded-xl overflow-hidden">
        <div className="w-full p-8 ">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-white">Bank Management System</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-100 max-w-3xl">
              A secure, modern banking application built with MERN stack for comprehensive financial operations.
            </p>
          </div>
        </div>
        <div className="w-full p-6 md:p-8 bg-slate-900/80">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8 pl-4 border-l-4 border-slate-400">
              <span className="text-slate-400">🔧</span> Key Features
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                '🔐 Secure Authentication & Role-Based Access',
                '💼 Personalized Account Dashboard',
                '💰 Real-Time Transactions',
                '📊 Filterable Transaction History',
                '🧾 Comprehensive Admin Panel',
                '📱 Mobile-Responsive Design'
              ].map((feature, index) => (
                <li 
                  key={index}
                  className="p-6 bg-slate-800 rounded-xl hover:bg-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl border border-slate-700 hover:border-slate-500"
                >
                  <span className="font-medium text-white text-xl">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full p-6 md:p-8 bg-gradient-to-br from-slate-900/90 to-slate-800/90">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8 pl-4 border-l-4 border-slate-400">
              <span className="text-slate-400">🚀</span> Core Technologies
            </h2>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-5">
                {[
                  ['React.js', 'bg-slate-600/90 text-white hover:bg-slate-500'],
                  ['Node.js', 'bg-slate-600/90 text-white hover:bg-slate-500'],
                  ['Express.js', 'bg-slate-600/90 text-white hover:bg-slate-500']
                ].map(([tech, style]) => (
                  <div 
                    key={tech}
                    className={`${style} p-4 rounded-xl text-center text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform`}
                  >
                    {tech}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-5">
                {[
                  ['MongoDB', 'bg-slate-600/90 text-white hover:bg-slate-500'],
                  ['Tailwind CSS', 'bg-slate-600/90 text-white hover:bg-slate-500'],
                  ['JWT Auth', 'bg-slate-600/90 text-white hover:bg-slate-500']
                ].map(([tech, style]) => (
                  <div 
                    key={tech}
                    className={`${style} p-4 rounded-xl text-center text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform`}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;