const express=require('express');
const cors=require('cors');


const {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
require("dotenv").config();

const app=express();

app.use(cors());

const PORT=process.env.PORT || 8000;


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



app.get("/", async (req, res) => { 
        const variavle= await run();
       return res.status(200).json({data: variavle});
});

app.listen(PORT, ()=>{
    console.log(`Server is running on the PORT ${PORT}`);
})

