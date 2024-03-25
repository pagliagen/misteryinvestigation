const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isMaster: { type: Boolean, required: true, default: false },
  isAdmin: { type: Boolean, required: true, default: false },
  resetPasswordToken: { type: String, unique: true, sparse: true, default: null},
  resetPasswordExpires: { type: Date },
  characters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Character' }],
});

// Metodo per generare e salvare l'hash della password prima di salvare l'utente nel database
userSchema.pre('save', async function (next) {
  // Salta se la password non è stata modificata
  if (!this.isModified('password')) {
    return next();
  }

  try {
    // Genera un hash della password
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    this.resetPasswordToken = `${this.username}|${hashedPassword}`
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.generatePasswordResetToken = function() {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = resetToken;
  this.resetPasswordExpires = Date.now() + 3600000; // 1 ora di validità
};

userSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;
