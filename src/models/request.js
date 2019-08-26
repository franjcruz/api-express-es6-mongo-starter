import mongoose from 'mongoose';

let request = mongoose.Schema({
  tx_id: String,
  cryptocurrency: String,
  confirmations: Number,
  webhook: String
});

module.exports = mongoose.model('Request', request);
