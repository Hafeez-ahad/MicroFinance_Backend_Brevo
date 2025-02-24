const mongoose = require('mongoose');

const userDetail = mongoose.Schema({
  address: { type: String },
  phone: { type: String },
  statementPic: {type:String},
  guarantor1CNIC: { type: String },
  guarantor1Email: { type: String },
  guarantor1Location: { type: String },
  guarantor1Name: { type: String },
  guarantor2CNIC: { type: String },
  guarantor2Email: { type: String },
  guarantor2Location: { type: String },
  guarantor2Name: { type: String },
  status:{ type: String },
  collectBranch:{type:String}
}, { timestamps: true });

const userDetailSchema = mongoose.model('userDetailSchema', userDetail);

export default userDetailSchema