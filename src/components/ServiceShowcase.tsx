import React, { useRef, useState, useEffect } from 'react';

const showcaseItems = [
{
  id: '01',
  title: 'Fire alarm and Detection Systems',
  description: 'Fire detectors are designed to detect one or more of the three characteristics of fire-smoke, heat and flame. Besides it every fire detection system must include manual call points (break glass), so that in the event of fire can be of immediate help.During a fire importance of activation of the occupants through alarm or bell is of at most vital and this can be performed through alarm system.',
  image: "/fire-alarm.jpg"
},
{
  id: '02',
  title: 'Containerized Fire Pump Systems',
  description: 'Constructed inside a standard shipping container, the units are easy to ship and install. Fast installation with minimal labour makes it a perfect retrofit solution. No on-site assembly labor or specialized tools are required. Installation requires only that you connect the piping and the power supply.',
  image: "/containerized.jpg"
},
{
  id: '03',
  title: 'Fire Hydrant Systems',
  description: 'A fire hydrant is an active fire protection measure, and a source of water provided in most urban, suburban and rural areas with municipal water service to enable firefighters to tap into the municipal water supply to assist in extinguishing a fire.',
  image: "/fire-hydrant.jpg"
},
{
  id: '04',
  title: 'Sprinkler Systems',
  description: 'A sprinkler system consists of pipes along a ceiling that contain water under pressure, with an additional source of water for a constant flow. Attached to the pipes, automatic sprinklers are placed at selected locations.',
  image: "/fire-hydrant.jpg"
},
{
  id: '05',
  title: 'Fire Suppression Systems',
  description: 'A fire suppression system is an engineered group of units that are built to extinguish fires through the application of a substance.These are attached to an alarm system that will alert you when the fire has been detected and initiate steps for action to further suppress the fire.',
  image: "/fire-suppression.jpg"
},
{
  id: '06',
  title: 'AMC Services',
  description: 'Each and every part of a fire protection system has a specific function. Regular maintenance of these system parts ensures the system is ready whenever it is required to extinguish fire hazard.',
  image: "/amc-services.jpg"
}];

export function ServiceShowcase() {
  const [activeId, setActiveId] = useState('01');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToItem = (id: string) => {
    setActiveId(id);
    const element = itemRefs.current[id];
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.getAttribute('data-id') || '01');
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
      }
    );

    Object.values(itemRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Protecting Industries For Our People
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            We aim to deliver systems with the highest safety in the most
            efficient way. Make us part of your journey to achieve your goals.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16 relative">
          {/* Left Column: List */}
          <div className="lg:sticky lg:top-32 self-start mb-12 lg:mb-0">
            <h3 className="text-3xl font-bold text-slate-800 mb-8">
              Our services offerings primarily consist of
            </h3>
            <div className="space-y-6">
              {showcaseItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToItem(item.id)}
                  className={`flex items-center text-lg w-full text-left transition-colors ${
                    activeId === item.id ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  <span className={`w-8 ${activeId === item.id ? 'text-blue-600' : 'text-slate-400 font-medium'}`}>
                    {item.id}
                  </span>
                  <span>
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Scrollable Content */}
          <div 
            ref={scrollContainerRef}
            className="pr-4 space-y-16"
          >
            {showcaseItems.map((item) => (
              <div 
                key={item.id} 
                id={`service-${item.id}`}
                data-id={item.id}
                ref={el => itemRefs.current[item.id] = el}
                className="scroll-mt-32 pb-8 border-b border-slate-100 last:border-0"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-80 object-cover mb-6 rounded-md shadow-sm border border-slate-200" 
                />
                <h4 className="text-2xl font-bold text-slate-800 mb-4">
                  {item.title}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}