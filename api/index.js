import express from 'express';
import rateLimit from 'express-rate-limit';
import dbConnect from './lib/mongodb.js';
import Inquiry from './lib/models/Inquiry.js';
import Service from './lib/models/Service.js';
import DetailedService from './lib/models/DetailedService.js';
import Project from './lib/models/Project.js';

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
  await Inquiry.findByIdAndDelete(req.params.id);
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
  await Service.findByIdAndDelete(req.params.id);
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
  await DetailedService.findByIdAndDelete(req.params.id);
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
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
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

  res.json({ message: 'Seeded successfully' });
});

// Export the Express app as a Vercel Serverless Function
export default app;
