import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contactPoint: {
    type: String,
    required: true
  },
  joined: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.models['User'] || mongoose.model('User', userSchema);

export default User;