const url = require('url');
const AWS = require('aws-sdk');

module.exports = (bucket, region) => {
  const s3 = new AWS.S3({
    region
  });

  return async ({
    filePath,
    fileContent,
    contentType,
    gitTag,
  }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Uploading file to ${bucket}/${gitTag}/${filePath} with content type: ${contentType}`)
        resolve({});
      }, 100);
    });

    // return await s3.putObject({
    //   Bucket: bucket,
    //   Key: ${gitTag}/${filePath},
    //   Body: fileContent,
    //   ContentType: contentType
    // });
  }
};