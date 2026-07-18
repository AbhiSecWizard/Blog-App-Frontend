import React from 'react';
import { 
  FaRobot, 
  FaCloudUploadAlt, 
  FaShieldAlt, 
  FaLayerGroup, 
  FaDatabase, 
  FaPaperPlane 
} from 'react-icons/fa';

const About = () => {
  return (
    <div id='about' className="bg-gradient-to-b from-gray-50 via-white to-gray-50 min-h-screen text-gray-800">
      
      {/* 🚀 Hero Section */}
      <div className="max-w-5xl mx-auto px-4 pt-16 pb-12 text-center">
        <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1.5 rounded-full">
          About Our Platform
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 mt-4 mb-6 tracking-tight">
          Democratizing Content Creation <br />
          <span className="text-indigo-600 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            With Power of AI & Speed
          </span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Welcome to our modern blogging hub! A space designed for creators, thinkers, and builders to share insights instantly without fighting clumsy interfaces.
        </p>
      </div>

      <hr className="max-w-5xl mx-auto border-gray-100" />

      {/* 🛠️ How It Works Section (A to Z Architecture) */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
            How The Ecosystem Works
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            A look under the hood of our full-stack engineering pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: The Input & AI Engine */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-5">
              <FaRobot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">1. Smart Content Engine</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Creators input a concept title, and our integrated **Gemini AI Engine** immediately draft context-aware outlines, saving hours of initial brainstorming block.
            </p>
          </div>

          {/* Card 2: Media CDN Optimization */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 mb-5">
              <FaCloudUploadAlt className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">2. Cloud Media Pipeline</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Thumbnails pass through **ImageKit Optimization CDN**, resizing images dynamically before hitting deep storage, assuring lightning-fast frontend render speeds globally.
            </p>
          </div>

          {/* Card 3: Storage & Access */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 mb-5">
              <FaDatabase className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-3">3. Database Aggregation</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Structured states are synced directly via secure Express micro-routers into **MongoDB Clusters**, indexing tags natively for instant query retrievals.
            </p>
          </div>

        </div>
      </div>

      {/* 🔒 Core Pillars Banner */}
      <div className="bg-indigo-950 text-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">
                Security & Reliability
              </span>
              <h2 className="text-2xl sm:text-4xl font-black mt-2 mb-4 leading-tight">
                Protected and State-Synced Content Pipelines
              </h2>
              <p className="text-sm sm:text-base text-indigo-200/80 leading-relaxed">
                We handle authentication layers securely using encrypted custom token schemas. Dynamic global state structures guarantee that UI interactions—like deletions or additions—reflect seamlessly instantly without annoying manual window reloads.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-indigo-900/40 p-5 rounded-xl border border-indigo-800/50">
                <FaShieldAlt className="w-5 h-5 text-indigo-400 mb-2" />
                <h4 className="font-bold text-sm mb-1">Secure JWT Headers</h4>
                <p className="text-xs text-indigo-200/60">Strict authorization layers safeguarding database mutations from unauthorized requests.</p>
              </div>
              <div className="bg-indigo-900/40 p-5 rounded-xl border border-indigo-800/50">
                <FaLayerGroup className="w-5 h-5 text-indigo-400 mb-2" />
                <h4 className="font-bold text-sm mb-1">Global Context Architecture</h4>
                <p className="text-xs text-indigo-200/60">Centralized unified state data propagation avoiding component drill fatigue.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 📬 Footer Callout */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 sm:p-12">
          <FaPaperPlane className="w-8 h-8 text-indigo-600 mx-auto mb-4" />
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Want to explore our latest articles?</h3>
          <p className="text-sm text-gray-500 mt-2 mb-6">Head straight back to the dashboard to read, create, or update stories.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-sm"
          >
            Explore Blogs Now
          </button>
        </div>
      </div>

    </div>
  );
};

export default About;