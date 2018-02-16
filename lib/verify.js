const {isString, isPlainObject, isUndefined, isArray} = require('lodash');
const urlJoin = require('url-join');
const AggregateError = require('aggregate-error');
const resolveConfig = require('./resolve-config');
const getClient = require('./get-client');

const isNonEmptyString = value => isString(value) && value.trim();
const isStringOrStringArray = value => isNonEmptyString(value) || (isArray(value) && value.every(isNonEmptyString));

module.exports = async (pluginConfig, {options: {repositoryUrl}, logger}) => {
  console.log('verify', pluginConfig, repositoryUrl, );
};
