const {isUndefined, castArray} = require('lodash');

module.exports = ({
  bucket,
  region,
  assets,
  successComment,
  failComment,
  failTitle,
  labels,
  assignees,
}) => ({
  bucket: bucket || process.env.S3_BUCKET,
  region: region || process.env.S3_BUCKET,
  assets: assets ? castArray(assets) : assets,
});
