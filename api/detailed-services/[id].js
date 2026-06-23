import dbConnect from '../lib/mongodb.js';
import DetailedService from '../lib/models/DetailedService.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id } = req.query;
  await dbConnect();

  try {
    if (req.method === 'DELETE') {
      const service = await DetailedService.findByIdAndDelete(id);
      if (!service) return res.status(404).json({ error: 'Detailed service not found' });
      return res.status(200).json({ message: 'Detailed service deleted successfully' });
    }

    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
