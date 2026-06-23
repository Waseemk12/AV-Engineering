import dbConnect from './lib/mongodb.js';
import Inquiry from './lib/models/Inquiry.js';
import Service from './lib/models/Service.js';
import Project from './lib/models/Project.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'GET') {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  await dbConnect();

  try {
    // Clear existing data
    await Promise.all([
      Inquiry.deleteMany({}),
      Service.deleteMany({}),
      Project.deleteMany({}),
    ]);

    // Seed Services (matching frontend data)
    const services = [
      {
        title: 'Fire Alarm and Detection System',
        description:
          'Fire detectors are designed to detect one or more of the three characteristics of fire-smoke, heat and flame. Besides it every fire detection system must include manual call points (break glass), so that in the event of fire can be of immediate help. During a fire importance of activation of the occupants through alarm or bell is of at most vital and this can be performed through alarm system.',
        image: '/fire-alarm.jpg',
        displayOrder: 1,
      },
      {
        title: 'Containerized Fire Pump System',
        description:
          'Constructed inside a standard shipping container, the units are easy to ship and install. Fast installation with minimal labour makes it a perfect retrofit solution. No on-site assembly labor or specialized tools are required. Installation requires only that you connect the piping and the power supply.',
        image: '/containerized.jpg',
        displayOrder: 2,
      },
      {
        title: 'Fire Hydrant & Sprinkler Systems',
        description:
          'A fire hydrant is an active fire protection measure, and a source of water provided in most urban, suburban and rural areas with municipal water service to enable firefighters to tap into the municipal water supply to assist in extinguishing a fire. Sprinkler systems consist of pipes along a ceiling that contain water under pressure, with automatic sprinklers placed at selected locations.',
        image: '/fire-hydrant.jpg',
        displayOrder: 3,
      },
      {
        title: 'Fire Suppression System',
        description:
          'A fire suppression system is an engineered group of units that are built to extinguish fires through the application of a substance. These are attached to an alarm system that will alert you when the fire has been detected and initiate steps for action to further suppress the fire.',
        image: '/fire-suppression.jpg',
        displayOrder: 4,
      },
      {
        title: 'AMC Services',
        description:
          'Each and every part of a fire protection system has a specific function. Regular maintenance of these system parts ensures the system is ready whenever it is required to extinguish fire hazard. To ensure your system is up to date when it is required.',
        image: '/amc-services.jpg',
        displayOrder: 5,
      },
    ];

    // Seed Inquiries (8 with mixed statuses)
    const inquiries = [
      {
        name: 'Rajesh Kumar',
        email: 'rajesh.kumar@tatasteel.com',
        phone: '+91 98765 43210',
        message:
          'We are setting up a new manufacturing unit in Jamshedpur and need a complete fire alarm and detection system. Please share your quotation and timeline for the project.',
        status: 'new',
        createdAt: new Date('2026-06-20T10:30:00'),
      },
      {
        name: 'Priya Sharma',
        email: 'priya.sharma@relianceindustries.com',
        phone: '+91 87654 32109',
        message:
          'Looking for fire hydrant and sprinkler system installation for our Navi Mumbai warehouse facility. The total covered area is approximately 50,000 sq ft.',
        status: 'new',
        createdAt: new Date('2026-06-19T14:15:00'),
      },
      {
        name: 'Amit Patel',
        email: 'amit.patel@adaniports.com',
        phone: '+91 76543 21098',
        message:
          'We require a containerized fire pump system for our port facility in Mundra, Gujarat. Need specifications and on-site assessment availability.',
        status: 'new',
        createdAt: new Date('2026-06-18T09:45:00'),
      },
      {
        name: 'Sunita Deshmukh',
        email: 'sunita.d@mahindra.com',
        phone: '+91 99887 76655',
        message:
          'Interested in AMC services for our existing fire protection setup at Mahindra Chakan plant. Currently have hydrant and sprinkler systems installed.',
        status: 'contacted',
        createdAt: new Date('2026-06-15T11:00:00'),
      },
      {
        name: 'Vikram Singh',
        email: 'vikram.singh@larsentoubro.com',
        phone: '+91 88776 65544',
        message:
          'Need fire suppression system for our server room and data center in Pune. Looking for FM-200 or Inergen based solutions. Please advise.',
        status: 'contacted',
        createdAt: new Date('2026-06-12T16:30:00'),
      },
      {
        name: 'Ananya Iyer',
        email: 'ananya.iyer@infosys.com',
        phone: '+91 77665 54433',
        message:
          'Our Mysore campus requires a comprehensive fire safety audit and upgrade of the existing fire alarm system across 3 buildings. Please share your proposal.',
        status: 'converted',
        createdAt: new Date('2026-06-08T13:20:00'),
      },
      {
        name: 'Deepak Joshi',
        email: 'deepak.joshi@hindalco.com',
        phone: '+91 66554 43322',
        message:
          'Requesting a quote for complete fire protection system including hydrant, sprinkler and alarm systems for our new aluminium processing plant in Dahej.',
        status: 'converted',
        createdAt: new Date('2026-06-05T10:10:00'),
      },
      {
        name: 'Meera Nair',
        email: 'meera.nair@gmail.com',
        phone: '+91 55443 32211',
        message:
          'I am looking for a basic fire alarm system for my residential apartment complex in Kochi. Around 24 units. Is this something you handle?',
        status: 'rejected',
        createdAt: new Date('2026-06-01T08:50:00'),
      },
    ];

    // Seed Projects (16 completed + 3 ongoing)
    const projects = [
      // Completed projects
      { name: 'Nagpur Police Housing', location: 'Nagpur', status: 'completed' },
      { name: 'Logos Logistics Park', location: 'Chennai', status: 'completed' },
      { name: 'Weg India', location: 'Hosur', status: 'completed' },
      { name: 'ASB International Pvt Ltd', location: 'Amarnath, Mumbai', status: 'completed' },
      { name: 'Navin Flooring', location: 'Dahej, Gujarat', status: 'completed' },
      { name: 'Astral Pipe', location: 'Dahej', status: 'completed' },
      { name: 'Asian Paints', location: 'Sirwal Khandala', status: 'completed' },
      { name: 'Xigo Logistic Park', location: 'Nagpur', status: 'completed' },
      { name: 'KSH International', location: 'Pune', status: 'completed' },
      { name: 'Finolex Cable', location: 'Urse, Pune', status: 'completed' },
      { name: 'Eaton', location: 'Ahmednagar', status: 'completed' },
      { name: 'Mass Housing', location: 'Mulund', status: 'completed' },
      { name: 'Mahindra', location: 'Chakan, Pune', status: 'completed' },
      { name: 'KSH International', location: 'Supa', status: 'completed' },
      { name: 'John Deere', location: 'Sanaswadi', status: 'completed' },
      { name: 'Welspun Logistics Park', location: 'Thane', status: 'completed' },
      // Ongoing projects
      { name: 'Logos Logistics Park', location: 'Chakan', status: 'ongoing' },
      { name: 'IGCL', location: 'Vapi', status: 'ongoing' },
      { name: 'Kirloskar', location: 'Solapur', status: 'ongoing' },
    ];

    const [seededInquiries, seededServices, seededProjects] = await Promise.all([
      Inquiry.insertMany(inquiries),
      Service.insertMany(services),
      Project.insertMany(projects),
    ]);

    return res.status(200).json({
      message: 'Seeded successfully',
      inquiries: seededInquiries.length,
      services: seededServices.length,
      projects: seededProjects.length,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
