const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobno: { type: String, required: true, minlength: 10, maxlength: 10 }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
