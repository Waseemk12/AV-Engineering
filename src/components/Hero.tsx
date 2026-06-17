import React from 'react';
export function Hero() {
  return (
    <div className="bg-white pt-8 pb-16 lg:pt-12 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="mb-12 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight mb-6">
              Over Two Decades
              <br />
              Of Experience
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg">
              AV Engineering is a globally recognized organization operating
              from the United States, delivering premium industrial projects and
              comprehensive safety solutions.
            </p>

            <div>
              <a
                href="#quote"
                className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
                
                Get A Quote
              </a>
            </div>
          </div>

          {/* Video Content */}
          <div className="relative">
            <video
              className="w-full h-auto object-cover"
              autoPlay
              loop
              muted
              playsInline>
              
              <source
                src="/Video Object Remover-1781680897731.mp4"
                type="video/mp4" />
              
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>);

}