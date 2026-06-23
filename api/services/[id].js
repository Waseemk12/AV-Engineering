import dbConnect from '../lib/mongodb.js';
import Service from '../lib/models/Service.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  await dbConnect();

  const { id } = req.query;

  try {
    if (req.method === 'DELETE') {
      const service = await Service.findByIdAndDelete(id);
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
      return res.status(200).json({ message: 'Service deleted successfully' });
    }

    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
