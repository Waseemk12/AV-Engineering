import mongoose from 'mongoose';

const DetailedServiceSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  icon: { type: String, default: 'Droplet' }, // Name of the lucide icon
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.DetailedService || mongoose.model('DetailedService', DetailedServiceSchema);
