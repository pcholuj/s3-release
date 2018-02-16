const verifyS3 = require('./lib/verify');
const publishS3 = require('./lib/publish');
const successS3 = require('./lib/success');
const failS3 = require('./lib/fail');

let verified;

const verifyConditions = async (pluginConfig, context) => {
  const {options} = context;
  if (options.publish) {
    const publishPlugin =
      (Array.isArray(options.publish) ? options.publish : [options.publish]).find(
        config => config.path && config.path === '@semantic-release/s3'
      ) || {};
  }

  await verifyS3(pluginConfig, context);
  verified = true;
}

const publish = async (pluginConfig, context) => {
  if (!verified) {
    await verifyS3(pluginConfig, context);
    verified = true;
  }
  return publishS3(pluginConfig, context);
}

const success = async (pluginConfig, context) => {
  if (!verified) {
    await verifyS3(pluginConfig, context);
    verified = true;
  }
  await successS3(pluginConfig, context);
}

const fail = async (pluginConfig, context) => {
  if (!verified) {
    await verifyS3(pluginConfig, context);
    verified = true;
  }
  await failS3(pluginConfig, context);
}

module.exports = {verifyConditions, publish, success, fail};
