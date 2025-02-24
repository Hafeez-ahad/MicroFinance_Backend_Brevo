import mongoose from "mongoose";

const first_model = mongoose.Schema({
    name:{type:String},
    email:{type:String},
    cnic:{type:String},
    password:{type:String},
     address: { type: String },
    phone: { type: String },
    picture: {type:String},
    pictureId: {type:String},
    guarantor1Name: { type: String },
    guarantor1CNIC: { type: String },
    guarantor1Email: { type: String },
    guarantor1Location: { type: String },
    guarantor2Name: { type: String },
    guarantor2CNIC: { type: String },
    guarantor2Email: { type: String },
    guarantor2Location: { type: String },
    status:{ type: String },
    collectBranch:{type:String},  
    Token:{type:String},  
    Slot:{type:String},  
    
},{timestamps:true})

const firstModel = mongoose.model('firstModel', first_model)
export default firstModel