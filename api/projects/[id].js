import dbConnect from '../lib/mongodb.js';
import Project from '../lib/models/Project.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  await dbConnect();

  const { id } = req.query;

  try {
    if (req.method === 'PATCH') {
      const project = await Project.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      return res.status(200).json(project);
    }

    if (req.method === 'DELETE') {
      const project = await Project.findByIdAndDelete(id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      return res.status(200).json({ message: 'Project deleted successfully' });
    }

    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
