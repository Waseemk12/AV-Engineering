import dbConnect from '../lib/mongodb.js';
import DetailedService from '../lib/models/DetailedService.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  await dbConnect();

  try {
    if (req.method === 'GET') {
      const services = await DetailedService.find({}).sort({ createdAt: 1 });
      return res.status(200).json(services);
    } 
    
    if (req.method === 'POST') {
      const service = await DetailedService.create(req.body);
      return res.status(201).json(service);
    }

    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
