import express, { response } from "express";
import firstModel from "../Models/firstModel.js";
import { passwordGenerator } from "../Helper/randomPassword.js";
import uploads from "../cloudnaryMulter/cloudnary.js";
import adminLoginModel from "../Models/adminLoginModel.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { sendEmailBrevo } from "../mailtrap/email.js";
import { v2 as cloudinary } from "cloudinary";
// ==
dotenv.config(); // Load .env variables
const SECRET_KEY = process.env.SECRET_KEY;

// ==
const firstRoute = express.Router();

// get route
firstRoute.get("/", async (req, res) => {
  try {
    const getData = await firstModel.find();

    res
      .status(200)
      .send({ status: 200, data: getData, message: "Responce Success" });
  } catch (error) {
    res.status(404).send({ error });
  }
});
// add data route
firstRoute.post("/add", async (req, res) => {
  try {
    const { name, email, cnic } = req.body;

    const findExistEmail = await firstModel.findOne({ email });

    if (!findExistEmail) {
      const password = passwordGenerator();
      const newData = { name, email, cnic, password };

      // Save data to the database
      await firstModel.create(newData);
      // Send email with the password
      await sendEmailBrevo(email, password);

      // Send success response
      res
        .status(201)
        .send({ message: "Data saved, password sent to Your Email. " });
    } else {
      res.status(400).send({ status: 400, message: "Email already exists" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).send({ status: 400, message: error.message });
  }
});
// for new password route
firstRoute.post("/newpass", async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const findPassword = await firstModel.findOne({ password });

    if (!findPassword) {
      return res
        .status(400)
        .send({ status: 400, message: "Incorrect User password" });
    }

    if (findPassword.password === newPassword) {
      return res
        .status(400)
        .send({ status: 400, message: "New Password sholuld be diffrent" });
    }

    // Update password
    findPassword.password = newPassword;
    await findPassword.save();

    return res.status(200).send({
      status: 200,
      message: "Your Password is changed",
      id: findPassword._id,
    });
  } catch (error) {
    return res.status(500).send({ status: 500, message: error.message });
  }
});
// userDetail updation route
firstRoute.post(
  "/userDetail",
  //  uploads.fields([{ name: "file", maxCount: 1 }]),
  uploads.single("file"), // ✅ Use `single()`
  async (req, res) => {
    try {
      const picture = req.file.filename;
      const pictureId = req.file.path;
      console.log(picture, pictureId);

      const {
        address,
        phone,
        guarantor1CNIC,
        guarantor1Email,
        guarantor1Location,
        guarantor1Name,
        guarantor2CNIC,
        guarantor2Email,
        guarantor2Location,
        guarantor2Name,
        id,
      } = req.body;

      const newObject = {
        address,
        phone,
        guarantor1CNIC,
        guarantor1Email,
        guarantor1Location,
        guarantor1Name,
        guarantor2CNIC,
        guarantor2Email,
        guarantor2Location,
        guarantor2Name,
        picture,
        pictureId,
        id,
      };

      const updatedUser = await firstModel.findOneAndUpdate(
        { _id: id }, // Find user by _id
        {
          $set: {
            address,
            phone,
            guarantor1CNIC,
            guarantor1Email,
            guarantor1Location,
            guarantor1Name,
            guarantor2CNIC,
            guarantor2Email,
            guarantor2Location,
            guarantor2Name,
            picture,
            pictureId,
            status: "pending",
          },
        }, // Update fields
        { new: true } // Return updated document
      );

      return res.status(201).send({
        status: 201,
        message: "File uploaded successfully",
        data: updatedUser,
      });
    } catch (error) {
      return res.status(400).send({ status: 400, message: error.message });
    }
  }
);
// admin route for approve
firstRoute.post("/admin", async (req, res) => {
  try {
    const { id, slotDetails, token } = req.body;

    if (slotDetails == "") {
      return res.status(404).send({
        status: 404,
        message: "Please Enter Slot Details",
      });
    } else {
      const updatedUser = await firstModel.findOneAndUpdate(
        { _id: id }, // Find user by _id
        {
          $set: {
            status: "Approved",
            Token: token,
            Slot: slotDetails,
          },
        }, // Update fields
        { new: true } // Return updated document
      );

      return res.status(201).send({
        status: 201,
        message: "Response sucess",
        data: updatedUser,
      });
    }
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});
// admin route for Reject
firstRoute.post("/adminReject", async (req, res) => {
  try {
    const { id } = req.body;

    const updatedUser = await firstModel.findOneAndUpdate(
      { _id: id }, // Find user by _id
      {
        $set: {
          status: "Rejected",
          Token: "",
          Slot: "",
        },
      }, // Update fields
      { new: true } // Return updated document
    );

    return res.status(201).send({
      status: 201,
      message: "Response sucess",
      data: updatedUser,
    });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});
// ADMIN LOGIN WITH JWT TOKEN
firstRoute.post("/adminlogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const findEmail = await adminLoginModel.findOne({ email });
    console.log(findEmail);

    if (findEmail && password == findEmail.password) {
      // JWT Token Generate
      const token = jwt.sign(
        { id: findEmail._id, email: findEmail.email },
        SECRET_KEY, 
        { expiresIn: "1h" } // Token expiration
      );

      return res.status(201).send({
        status: 201,
        message: "Responce Sucess",
        token, 
      });
    } else {
      return res.status(404).send({
        status: 404,
        message: "Invalid Credentials",
      });
    }
  } catch (e) {
    return res.status(500).send({ status: 500, message: e.message });
  }
});
// DELETE REJECTED
firstRoute.post("/deleteRejected", async (req, res) => {
  try {
    const { password } = req.body;

    // Get saved password from environment variable
    const savedPassword = process.env.rejectPassword;

    // Check if the provided password matches the saved one
    if (password === savedPassword) {
      // find Rejected
      const findRejected = await firstModel.find({ status: "Rejected" });
      if (findRejected.length > 0) {
        // DELETING DATA FROM MONGODB
        const rejected = await firstModel.deleteMany({ status: "Rejected" });

        // DELETING IMG FROM CLOUDINARY
        const pictureId = findRejected.map((item) => item.picture);
        console.log(pictureId)
       if(pictureId.length>0){
        pictureId.forEach(async(item)=>{
          try{
            cloudinary.uploader.destroy(item)
          }
          catch(e){
            res.status(404).send({stauts:404,message:e.message})
          }
        })
       }
          

        return res.status(200).send({
          status: 200,
          message: "Deleted All Rejected",
          data: pictureId,
        });
      } else {
        return res
          .status(404)
          .send({ status: 404, message: "No Rejected Status Found" });
      }
    } else {
      return res.status(404).send({ status: 404, message: "Invalid Password" });
    }
  } catch (e) {
    return res.status(500).send({ status: 500, message: e.message });
  }
});
// delete-all route
firstRoute.delete("/delete-all", async (req, res) => {
  try {
    // Delete all documents in the collection
    const deleteResult = await firstModel.deleteMany({});
    // await cloudinary.uploader.destroy({})

    // Check if any documents were deleted
    if (deleteResult.deletedCount > 0) {
      res.status(200).send({
        status: 200,
        message: "All data deleted successfully",
        deletedCount: deleteResult.deletedCount,
      });
    } else {
      res.status(404).send({ status: 404, message: "No data found to delete" });
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    res
      .status(500)
      .send({ status: 500, error: "An error occurred while deleting data" });
  }
});

// firstRoute.post('/adminget' ,async (req,res)=>{
// const {email,password}  = req.body;
// const obj = {email,password};
// const saveData = adminLoginModel.create(obj)
//  res
//       .status(200)
//       .send({ status: 200, data: saveData, message: "Responce Success" });
//   })

// firstRoute.get('/adminget' ,async (req,res)=>{
//   const get = await adminLoginModel.find();
//   res
//       .status(200)
//       .send({ status: 200, data: get, message: "Responce Success" });
//   })
export default firstRoute;
