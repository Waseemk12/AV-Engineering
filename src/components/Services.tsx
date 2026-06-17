import React from 'react';

const services = [
{
  id: '01',
  title: 'Fire alarm and Detection System',
  description:
  'Designed to detect one or more of the three characteristics of fire- smoke, heat and flame.',
  image: "/fire-alarm.jpg"
},
{
  id: '02',
  title: 'Containerized Fire Pump System',
  description:
  'Constructed inside a standard shipping container, the units are easy to ship and install.',
  image: "/containerized.jpg"
},
{
  id: '03',
  title: 'Fire Hydrant & Sprinkler Systems',
  description:
  'Fire hydrants and Sprinklers are an active fire protection measure.',
  image: "/fire-hydrant.jpg"
},
{
  id: '05',
  title: 'Fire Suppression System',
  description:
  'Engineered group of units that are built to extinguish fires through the application of a substance.',
  image: "/fire-suppression.jpg"
},
{
  id: '06',
  title: 'AMC Services',
  description: "To ensure your system is up to date when it's required.",
  image: "/amc-services.jpg"
}];

export function Services() {
  return (
    <section id="services" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800">Our Services</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {services.map((service, index) =>
          <div
            key={index}
            className="bg-white rounded-md border border-slate-200 overflow-hidden flex flex-col">
            
              <div className="h-40 bg-slate-100 overflow-hidden">
                <img
                src={service.image}
                alt={service.title}
                loading="lazy"
                className="w-full h-full object-cover" />
              
              </div>
              <div className="p-6 flex flex-col flex-grow text-center">
                <h3 className="text-lg font-bold text-slate-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm mb-6 flex-grow">
                  {service.description}
                </p>
                <div>
                  <a
                  href={`#service-${service.id}`}
                  className="inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-md transition-colors">
                  
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}