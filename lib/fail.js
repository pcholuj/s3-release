const {template} = require('lodash');
const debug = require('debug')('semantic-release:github');
const resolveConfig = require('./resolve-config');
const getClient = require('./get-client');

module.exports = async (pluginConfig, {options: {branch, repositoryUrl}, errors, logger}) => {
    console.log(pluginConfig, options);
};