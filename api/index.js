import express from 'express';
import rateLimit from 'express-rate-limit';
import dbConnect from './lib/mongodb.js';
import Inquiry from './lib/models/Inquiry.js';
import Service from './lib/models/Service.js';
import DetailedService from './lib/models/DetailedService.js';
import Project from './lib/models/Project.js';
import DeletedItem from './lib/models/DeletedItem.js';

const app = express();
app.set('trust proxy', 1);

// Vercel parses the body automatically, but express.json() might overwrite it. 
// We conditionally apply express.json() only if the body hasn't been parsed.
app.use((req, res, next) => {
  if (req.body && Object.keys(req.body).length > 0) {
    next();
  } else {
    express.json()(req, res, next);
  }
});

// Add CORS headers for all routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Middleware to connect to DB
app.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (error) {
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// --- Auth ---
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per `window`
  message: { error: 'Too many login attempts, please try again after 15 minutes' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.post('/api/auth', loginLimiter, (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'avengineers1141*';
  
  if (password === adminPassword) {
    res.json({ success: true, token: 'admin_authenticated' });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// --- Inquiries ---
app.get('/api/inquiries', async (req, res) => {
  const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
  res.json(inquiries);
});

app.post('/api/inquiries', async (req, res) => {
  const inquiry = await Inquiry.create(req.body);
  res.status(201).json(inquiry);
});

app.patch('/api/inquiries/:id', async (req, res) => {
  const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(inquiry);
});

app.delete('/api/inquiries/:id', async (req, res) => {
  const doc = await Inquiry.findById(req.params.id);
  if (doc) {
    await DeletedItem.create({ originalId: doc._id.toString(), collectionName: 'Inquiry', data: doc.toObject() });
    await Inquiry.findByIdAndDelete(req.params.id);
  }
  res.json({ message: 'Deleted' });
});

// --- Services ---
app.get('/api/services', async (req, res) => {
  const services = await Service.find({}).sort({ displayOrder: 1 });
  res.json(services);
});

app.post('/api/services', async (req, res) => {
  const service = await Service.create(req.body);
  res.status(201).json(service);
});

app.delete('/api/services/:id', async (req, res) => {
  const doc = await Service.findById(req.params.id);
  if (doc) {
    await DeletedItem.create({ originalId: doc._id.toString(), collectionName: 'Service', data: doc.toObject() });
    await Service.findByIdAndDelete(req.params.id);
  }
  res.json({ message: 'Deleted' });
});

// --- Detailed Services ---
app.get('/api/detailed-services', async (req, res) => {
  const services = await DetailedService.find({}).sort({ createdAt: 1 });
  res.json(services);
});

app.post('/api/detailed-services', async (req, res) => {
  const service = await DetailedService.create(req.body);
  res.status(201).json(service);
});

app.delete('/api/detailed-services/:id', async (req, res) => {
  const doc = await DetailedService.findById(req.params.id);
  if (doc) {
    await DeletedItem.create({ originalId: doc._id.toString(), collectionName: 'DetailedService', data: doc.toObject() });
    await DetailedService.findByIdAndDelete(req.params.id);
  }
  res.json({ message: 'Deleted' });
});

// --- Projects ---
app.get('/api/projects', async (req, res) => {
  const projects = await Project.find({}).sort({ createdAt: -1 });
  res.json(projects);
});

app.post('/api/projects', async (req, res) => {
  const project = await Project.create(req.body);
  res.status(201).json(project);
});

app.patch('/api/projects/:id', async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(project);
});

app.delete('/api/projects/:id', async (req, res) => {
  const doc = await Project.findById(req.params.id);
  if (doc) {
    await DeletedItem.create({ originalId: doc._id.toString(), collectionName: 'Project', data: doc.toObject() });
    await Project.findByIdAndDelete(req.params.id);
  }
  res.json({ message: 'Deleted' });
});

// --- Recently Deleted ---
app.get('/api/deleted', async (req, res) => {
  const items = await DeletedItem.find({}).sort({ deletedAt: -1 });
  res.json(items);
});

app.post('/api/deleted/:id/restore', async (req, res) => {
  const item = await DeletedItem.findById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  
  // Re-insert into original collection
  const data = item.data;
  delete data._id; // Let mongoose assign the same ID or a new one? Better keep the same ID.
  // Actually, we can use the original ID.
  const models = { Inquiry, Service, DetailedService, Project };
  const Model = models[item.collectionName];
  if (!Model) return res.status(400).json({ error: 'Unknown collection' });

  await Model.create({ _id: item.originalId, ...data });
  await DeletedItem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Restored' });
});

app.delete('/api/deleted/:id', async (req, res) => {
  await DeletedItem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Permanently Deleted' });
});

// --- Seed ---
app.get('/api/seed', async (req, res) => {
  // Clear existing
  await Inquiry.deleteMany({});
  await Service.deleteMany({});
  await Project.deleteMany({});
  await DetailedService.deleteMany({});
  
  // Seed basic services
  const services = [
    { title: 'Fire alarm and Detection System', description: 'Designed to detect one or more of the three characteristics of fire- smoke, heat and flame.', image: '/fire-alarm.jpg', displayOrder: 1 },
    { title: 'Containerized Fire Pump System', description: 'Constructed inside a standard shipping container, the units are easy to ship and install.', image: '/containerized.jpg', displayOrder: 2 },
    { title: 'Fire Hydrant & Sprinkler Systems', description: 'Fire hydrants and Sprinklers are an active fire protection measure.', image: '/fire-hydrant.jpg', displayOrder: 3 },
    { title: 'Fire Suppression System', description: 'Engineered group of units that are built to extinguish fires through the application of a substance.', image: '/fire-suppression.jpg', displayOrder: 4 },
    { title: 'AMC Services', description: "To ensure your system is up to date when it's required.", image: '/amc-services.jpg', displayOrder: 5 }
  ];
  await Service.insertMany(services);

  // Seed detailed services
  const detailedServices = [
    { category: "Fire Protection System", name: "Water-Based System", icon: "Droplet" },
    { category: "Fire Protection System", name: "Hydrant System", icon: "Droplet" },
    { category: "Fire Protection System", name: "Sprinkles System", icon: "Droplet" },
    { category: "Fire Protection System", name: "MVWS & HVWS System", icon: "Settings" },
    { category: "Fire Protection System", name: "Foam System", icon: "Droplet" },
    { category: "Fire Protection System", name: "Gas Suppression System", icon: "Wind" },
    { category: "Fire Protection System", name: "Co2/FM-200/Inergen", icon: "Wind" },
    { category: "Fire Protection System", name: "Fire Detection & Alarm", icon: "Bell" },
    
    { category: "Security System", name: "Access Control System", icon: "Lock" },
    { category: "Security System", name: "Video Surveillance System", icon: "Video" },
    { category: "Security System", name: "Intrusion Alarm System", icon: "Bell" },
    { category: "Security System", name: "Perimeter Protection", icon: "Shield" },
    { category: "Security System", name: "Public Address System", icon: "Speaker" },
    
    { category: "Process & Utility Piping System", name: "Compressed Air Piping", icon: "Wind" },
    { category: "Process & Utility Piping System", name: "IBR Steam Piping", icon: "Thermometer" },
    { category: "Process & Utility Piping System", name: "Fuel Transfer System", icon: "Factory" },
    { category: "Process & Utility Piping System", name: "Chilled Water Piping", icon: "Droplet" },
    { category: "Process & Utility Piping System", name: "Sewage Transfer System", icon: "Droplet" },
    { category: "Process & Utility Piping System", name: "Hot & Cold Acoustic Insulation", icon: "Thermometer" },
    { category: "Process & Utility Piping System", name: "Falls ceiling Insulation", icon: "HardHat" },
    
    { category: "Heavy Engineering Fabrication", name: "Pipe Rack & Super Structures", icon: "HardHat" },
    { category: "Heavy Engineering Fabrication", name: "Tank & Vessel Manufacturing", icon: "Factory" },
    { category: "Heavy Engineering Fabrication", name: "Tower & Chimney Manufacturing", icon: "Factory" }
  ];
  await DetailedService.insertMany(detailedServices);

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
  await Inquiry.insertMany(inquiries);

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
  await Project.insertMany(projects);

  res.json({ message: 'Seeded successfully' });
});

// Export the Express app as a Vercel Serverless Function
export default app;
