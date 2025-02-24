import mongoose from 'mongoose';

const AdminLoginSchema = new mongoose.Schema({
  email: { type: String },
  password: { type: String },
  token: { type: String }
});

 const adminLoginModel = mongoose.model('adminLoginModel', AdminLoginSchema);
export default adminLoginModel
