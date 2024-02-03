import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../interfaces/userInterface';

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    googleId: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
    rollno: {
      type: Number,
    },
    contactNumber: {
      type: Number,
      unique: true,
    },
    currentStudyYear: {
      type: Number,
    },
    image: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
    },
    isPaymentDone: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const UserModel = model<User>('User', userSchema);

export default UserModel;
