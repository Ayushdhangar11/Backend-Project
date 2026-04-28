import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,  
    secure: true
});

const uploadToCloudinary = async (localfilePath) => {
    try {
        if(!localfilePath) {
            throw new Error("File path is required");
        }    
        const filePath = fs.createReadStream(localfilePath);
        const result = await cloudinary.uploader.upload(filePath, { resource_type: "auto"});
        console.log("Cloudinary upload result : ", result.url);
        return result;
    } catch (error) {
        fs.unlinkSync(localfilePath);//remove temp file after uploading failed from our local server
        console.log("Error in uploading to cloudinary : ", error);
        return null;
    }
}

export {uploadToCloudinary};