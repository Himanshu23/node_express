const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('activity', notesSchema);
