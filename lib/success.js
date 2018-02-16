const {uniqBy, template} = require('lodash');
const AggregateError = require('aggregate-error');
const debug = require('debug')('semantic-release:s3');
const resolveConfig = require('./resolve-config');
const getClient = require('./get-client');

module.exports = async (
  pluginConfig,
  {options: {branch, repositoryUrl}, lastRelease, commits, nextRelease, releases, logger}
) => {
  console.log('success', pluginConfig, options);
};
