import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINRAY_CLOUD_NAME,
  api_key: process.env.CLOUDINRAY_API_KEY,
  api_secret: process.env.CLOUDINRAY_API_SECRET, // Click 'View Credentials' below to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
  console.log(localFilePath);
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File is uploaded on cloudinary", response);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log("Error while uploading file:", error);
    // fs.unlinkSync(localFilePath);
    return null;
  }
};

export { uploadOnCloudinary };
