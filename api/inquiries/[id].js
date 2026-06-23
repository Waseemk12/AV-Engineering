import dbConnect from '../lib/mongodb.js';
import Inquiry from '../lib/models/Inquiry.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  await dbConnect();

  const { id } = req.query;

  try {
    if (req.method === 'PATCH') {
      const inquiry = await Inquiry.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!inquiry) {
        return res.status(404).json({ error: 'Inquiry not found' });
      }
      return res.status(200).json(inquiry);
    }

    if (req.method === 'DELETE') {
      const inquiry = await Inquiry.findByIdAndDelete(id);
      if (!inquiry) {
        return res.status(404).json({ error: 'Inquiry not found' });
      }
      return res.status(200).json({ message: 'Inquiry deleted successfully' });
    }

    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
