import mongoose from 'mongoose';

const deletedItemSchema = new mongoose.Schema({
  originalId: { type: String, required: true },
  collectionName: { type: String, required: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  deletedAt: { type: Date, default: Date.now }
});

// TTL index to automatically remove documents after 30 days (2592000 seconds)
deletedItemSchema.index({ deletedAt: 1 }, { expireAfterSeconds: 2592000 });

export default mongoose.models.DeletedItem || mongoose.model('DeletedItem', deletedItemSchema);
