import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor usa un email válido']
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  nombre: {
    type: String,
    default: ''
  },
  apellido: {
    type: String,
    default: ''
  },
  foto: {
    type: String,
    default: null
  },
  rating: {
    type: Number,
    default: 1200
  },
  gamesPlayed: {
    type: Number,
    default: 0
  },
  wins: {
    type: Number,
    default: 0
  },
  losses: {
    type: Number,
    default: 0
  },
  draws: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash de contraseña antes de guardar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function(password) {
  return await bcryptjs.compare(password, this.password);
};

// Método para obtener datos públicos del usuario
userSchema.methods.getPublicData = function() {
  const { password, ...rest } = this.toObject();
  return rest;
};

export default mongoose.model('User', userSchema);
