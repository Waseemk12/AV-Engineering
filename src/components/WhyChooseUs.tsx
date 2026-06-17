import React, { useState, useEffect, useRef } from 'react';
import { Shield, HardHat, Award, Users } from 'lucide-react';

function AnimatedNumber({ end, duration = 2000 }: { end: number, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const increment = end / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}</span>;
}

export function WhyChooseUs() {
  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Planting confidence with AV Engineering
          </h2>
          <p className="text-lg text-slate-600">
            Get safety of highest standard!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Feature 1 */}
          <div className="flex">
            <div className="flex-shrink-0 mr-6">
              <Shield className="w-16 h-16 text-orange-500" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Protecting Industries
              </h3>
              <p className="text-slate-600">
                Get thorough knowledge of our service portfolio and choose the
                right system for your needs with our guidance.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex">
            <div className="flex-shrink-0 mr-6">
              <HardHat
                className="w-16 h-16 text-orange-500"
                strokeWidth={1.5} />
              
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Swift Completions
              </h3>
              <p className="text-slate-600">
                Our trained and committed engineering professionals are
                dedicated to completing your project within deadlines.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex">
            <div className="flex-shrink-0 mr-6">
              <Award className="w-16 h-16 text-orange-500" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Quality Assurance
              </h3>
              <p className="text-slate-600">
                Genuine products and trained staff to achieve assured results
                and peace of mind.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="flex">
            <div className="flex-shrink-0 mr-6">
              <Users className="w-16 h-16 text-orange-500" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                Existing Elite Client Network
              </h3>
              <p className="text-slate-600">
                Our customers have quality at their core values and are spread
                almost all over the region.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-8">
          <div>
            <div className="text-6xl font-bold text-slate-800 mb-2">
              <AnimatedNumber end={300} /> <span className="text-4xl">+</span>
            </div>
            <div className="text-lg text-slate-600">Customers</div>
          </div>
          <div>
            <div className="text-6xl font-bold text-slate-800 mb-2">
              <AnimatedNumber end={20} /> <span className="text-4xl">+</span>
            </div>
            <div className="text-lg text-slate-600">Years of experience</div>
          </div>
          <div>
            <div className="text-6xl font-bold text-slate-800 mb-2">
              <AnimatedNumber end={10} /> <span className="text-4xl">+</span>
            </div>
            <div className="text-lg text-slate-600">Industries Served</div>
          </div>
        </div>
      </div>
    </section>
  );
}