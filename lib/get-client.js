const url = require('url');
const { template } = require('lodash')
const path = require('path');
const AWS = require('aws-sdk');
const resolveConfig = require('./resolve-config');
const debug = require('debug')('semantic-release:s3');

module.exports = (pluginConfig) => {
  const {
    bucket,
    region,
    prefixTemplate,
    s3ClientOptions
  } = resolveConfig(pluginConfig);

  const computed = template(prefixTemplate);

  const s3 = new AWS.S3(Object.assign({}, s3ClientOptions, {
    region
  }));

  debug('S3Client Bucket:', bucket);
  debug('S3Client Region:', region);
  debug('S3Client Options:', Object.assign({}, s3ClientOptions, {
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
    const computedPath = path.join(pathPrefix, filePath);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          filePath: computedPath,
          bucket,
          region,
          size: fileContent.length,
        });
      }, 100);
    });

    // return await s3.putObject({
    //   Bucket: bucket,
    //   Key: computedPath,
    //   Body: fileContent,
    //   ContentType: contentType
    // });
  }
};