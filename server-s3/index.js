const express=require('express');
const cors=require('cors');
// const AWS = require("aws-sdk");

const {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
require("dotenv").config();

const app=express();

app.use(cors());

const PORT=process.env.PORT || 8000;



// const s3 = new AWS.S3({
//   accessKeyId: process.env.accessKeyId,
//   secretAccessKey: process.env.secretAccessKey,
// });

const BUCKET_NAME = "testbucketfp";

const REGION = "ap-south-1";
// Create an Amazon S3 service client object.
const s3Client = new S3Client({
  region: REGION,
  signer: {
    sign: async (request) => request,
  },
});
const run = async () => {
    var bucketParams = {
      Bucket: BUCKET_NAME,
    };
  try {
    const data = await s3Client.send(new ListObjectsCommand(bucketParams));
    console.log("Success", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};



// const listObjectsInBucket = async(bucketName) => {
//     // Create the parameters for calling listObjects
//     var bucketParams = {
//         Bucket : BUCKET_NAME,
//     };
  
//     // Call S3 to obtain a list of the objects in the bucket

    
//     const obj = s3.listObjects(bucketParams, function(err, data) {
//         if (err) {
//             console.log("Error", err);
//             // return err;
//         } else {
//             console.log("Success", data);
//             return data;
//         }
//     });

//     return JSON.stringify(obj);
// }


app.get("/", async (req, res) => {
    //    const variavle = await listObjectsInBucket(BUCKET_NAME); 
        const variavle= await run();
       return res.status(200).json({data: variavle});
});

app.listen(PORT, ()=>{
    console.log(`Server is running on the PORT ${PORT}`);
})

