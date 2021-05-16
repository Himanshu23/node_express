const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  phoneNo: { type: String, default: '' },
}, {
  timestamps: true,
});

module.exports = mongoose.model('user', userSchema);
