import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    let folder = "MicroFinance";
    if (file.mimetype === "application/pdf") {
      folder = "MicroFinance/pdf";
    } else {
      folder = "MicroFinance/images";
    }
    return { folder };
  },
  allowedFormats: ["jpg", "png", "jpeg", "pdf"],
});

const uploads = multer({ storage });
export default uploads;
