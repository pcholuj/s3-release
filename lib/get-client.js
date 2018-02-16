const url = require('url');
const {template} = require('lodash')
const path = require('path');
const AWS = require('aws-sdk');
const resolveConfig = require('./resolve-config');

module.exports = (pluginConfig) => {
  const {
    bucket,
    region,
    prefixTemplate,
    envPrefix,
    tagPrefix,
    branchPrefix,
    s3ClientOptions
  } = resolveConfig(pluginConfig);

  const computed = template(prefixTemplate);

  const s3 = new AWS.S3(Object.assign({}, s3ClientOptions, {
    region
  }));

  return async ({
    filePath,
    fileContent,
    contentType,
    gitTag,
    branch,
  }) => {
    const pathPrefix = computed({branch, gitTag, env: process.env.NODE_ENV || null});
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Uploading file to ${path.join(bucket, pathPrefix, filePath)} with content type: ${contentType}`)
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