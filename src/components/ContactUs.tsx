import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || '';

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitState, setSubmitState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState('loading');
    try {
      const res = await fetch(`${API}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitState('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitState('idle'), 4000);
    } catch {
      setSubmitState('error');
      setTimeout(() => setSubmitState('idle'), 4000);
    }
  };

  return (
    <section className="py-16 bg-slate-50" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Contact Us</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get in touch with us for your safety and industrial project needs.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden lg:flex">
          {/* Contact Information */}
          <div className="bg-blue-600 lg:w-1/3 p-10 text-white flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="mb-8 text-blue-100">
                Fill up the form and our team will get back to you within 24 hours.
              </p>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-4" />
                  <span>+91 7410176954</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-4" />
                  <span>avengineeringandcompany@gmail.com</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-4 mt-1" />
                  <span>S No. 284/1, Flat No. B/309 Silver Treasure, Mawal, Pune, Talegaon Dhabade, 412106</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-10 lg:w-2/3">
            {submitState === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md flex items-center text-green-700">
                <CheckCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>Thank you! Your inquiry has been submitted. We'll get back to you soon.</span>
              </div>
            )}
            {submitState === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md flex items-center text-red-700">
                <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                <span>Something went wrong. Please try again or email us directly.</span>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="+91 98765 43210"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-slate-300 rounded-md focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={submitState === 'loading'}
                  className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-md shadow-sm transition-colors"
                >
                  {submitState === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
