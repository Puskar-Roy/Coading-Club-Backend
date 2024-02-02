import { Document } from 'mongoose';
export interface User extends Document {
  name: string;
  email: string;
  department: string;
  rollno: number;
  domain: string;
  contactNumber: number;
  currentStudyYear: number;
  password: string;
  cpassword: string;
}
