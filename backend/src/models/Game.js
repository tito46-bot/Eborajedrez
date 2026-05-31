import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  whitePlayer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  blackPlayer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'abandoned'],
    default: 'active'
  },
  result: {
    type: String,
    enum: ['white_wins', 'black_wins', 'draw', 'abandoned'],
    default: null
  },
  moves: {
    type: Array,
    default: []
  },
  pgn: {
    type: String,
    default: ''
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  endedAt: {
    type: Date,
    default: null
  },
  timeControl: {
    type: String,
    enum: ['bullet_1', 'blitz_3', 'blitz_5', 'rapid_10', 'classical'],
    default: 'blitz_5'
  },
  whiteRatingChange: {
    type: Number,
    default: 0
  },
  blackRatingChange: {
    type: Number,
    default: 0
  }
});

export default mongoose.model('Game', gameSchema);
