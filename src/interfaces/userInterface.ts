import { Document } from 'mongoose';
export interface User extends Document {
  name: string;
  email: string;
  department: string;
  rollno: number;
  domain: string;
  contactNumber: number;
  currentStudyYear: number;
  isPaymentDone: boolean;
  image: string;
  googleId: string;
}
