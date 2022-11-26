const multer = require("multer");
const multerS3 = require("multer-s3");
// const AWS = require("aws-sdk");
const { S3Client } = require('@aws-sdk/client-s3');

// create s3 config 
const s3 = new S3Client({
    region: process.env.S3_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
    signatureVersion: 'v4'
});

// s3 storage 
const storage = multerS3({
    s3: s3,
    bucket: "plsr-profile-picture",
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
});

// filter image type 
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

const uploader = () => {
    return (
        multer({
            storage: storage,
            fileFilter: fileFilter,
            limits: {
                fileSize: 1024 * 1024 * 5 // allowing only 5 MB files
            }
        })
    )
};

module.exports = uploader;

// aws bucket policy for public s3 data 
// {
//     "Version": "2012-10-17",
//     "Statement": [
//         {
//             "Sid": "PublicReadGetObject",
//             "Effect": "Allow",
//             "Principal": "*",
//             "Action": [
//                 "s3:GetObject"
//             ],
//             "Resource": [
//                 "arn:aws:s3:::Bucket-Name/*"
//             ]
//         }
//     ]
// }