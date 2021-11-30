const fs = require("fs");
const AWS = require("aws-sdk");
const zlib = require("zlib");

const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_AWS_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_AWS_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
});

const Expires = 60 * 5;
const Bucket = process.env.BUCKET_NAME;

const uploadFile = (path: string) =>
  new Promise((res, rej) => {
    var body = fs.createReadStream(path).pipe(zlib.createGzip());
    const fileNameArr = path.split("/");
    const Key = fileNameArr[fileNameArr.length - 1];
    var s3obj = new AWS.S3({ params: { Bucket, Key } });
    s3obj.upload({ Body: body }, function (err: Error, data: any) {
      if (err) throw err;
      s3.getSignedUrl(
        "getObject",
        {
          Bucket,
          Key,
          Expires,
          ResponseContentType: "text/csv",
        },
        (err: any, url: string) => {
          if (err) throw err;
          res(url);
        }
      );
    });
  });

export default uploadFile;
