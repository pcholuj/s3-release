const { castArray } = require('lodash');

module.exports = ({
  bucket,
  region,
  assets,
  prefixTemplate,
  s3ClientOptions,
  globSettings,  
}) => ({
  bucket: bucket || process.env.S3_BUCKET,
  region: region || process.env.S3_BUCKET,
  assets: assets ? castArray(assets) : assets,
  prefixTemplate: prefixTemplate || '${branch}-${gitTag}', // branch, env, gitTag
  s3ClientOptions,
  globSettings,
});
