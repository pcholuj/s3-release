const url = require('url');
const {inspect} = require('util');
const {isString} = require('lodash');
const pkg = require('../../package.json');

const homepage = url.format({...url.parse(pkg.homepage), ...{hash: null}});
const stringify = obj => (isString(obj) ? obj : inspect(obj, {breakLength: Infinity, depth: 2, maxArrayLength: 5}));
const linkify = file => `${homepage}/blob/master/${file}`;

module.exports = {
  EINVALIDASSETS: ({assets}) => ({
    message: 'Invalid `assets` option.',
    details: `The [assets option](${linkify(
      'README.md#assets'
    )}) option must be an \`Array\` of \`Strings\` or \`Objects\` with a \`path\` property.

Your configuration for the \`assets\` option is \`${stringify(assets)}\`.`,
  }),
  EINVALIDSUCCESSCOMMENT: ({successComment}) => ({
    message: 'Invalid `successComment` option.',
    details: `The [successComment option](${linkify(
      'README.md#successcomment'
    )}) option, if defined, must be a non empty \`String\`.

Your configuration for the \`successComment\` option is \`${stringify(successComment)}\`.`,
  }),
  EINVALIDFAILTITLE: ({failTitle}) => ({
    message: 'Invalid `failTitle` option.',
    details: `The [failTitle option](${linkify(
      'README.md#failtitle'
    )}) option, if defined, must be a non empty \`String\`.

Your configuration for the \`failTitle\` option is \`${stringify(failTitle)}\`.`,
  }),
};
