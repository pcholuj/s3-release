const {basename, extname} = require('path');
const {stat, readFile} = require('fs-extra');
const {isPlainObject} = require('lodash');
const parseGithubUrl = require('parse-github-url');
const pReduce = require('p-reduce');
const mime = require('mime');
const debug = require('debug')('semantic-release:s3');
const globAssets = require('./glob-assets.js');
const resolveConfig = require('./resolve-config');
const getClient = require('./get-client');

module.exports = async (pluginConfig, {options: {branch, repositoryUrl}, nextRelease: {gitTag, notes}, logger}) => {
  const {bucket, region, assets} = resolveConfig(pluginConfig);
  const client = getClient(pluginConfig);

  debug('release to bucket: %s, region %s', bucket, region);
  debug('release name: %s', gitTag);
  debug('release branch: %s', branch);

  logger.log('Published S3 release, bucket: %s, region: %s', bucket, region);

  if (assets && assets.length > 0) {
    const globbedAssets = await globAssets(assets);
    debug('globed assets: %o', globbedAssets);

    await pReduce(globbedAssets, async (_, asset) => {
      const filePath = isPlainObject(asset) ? asset.path : asset;
      let file;

      try {
        file = await stat(filePath);
      } catch (err) {
        logger.error('The asset %s cannot be read, and will be ignored.', filePath);
        return;
      }
      if (!file || !file.isFile()) {
        logger.error('The asset %s is not a file, and will be ignored.', filePath);
        return;
      }

      const fileName = basename(filePath);

      debug('file path: %o', filePath);
      debug('file name: %o', fileName);

      const result = await client({
        filePath: filePath,
        fileContent: await readFile(filePath),
        contentType: mime.getType(extname(fileName)) || 'text/plain',
        branch,
        gitTag,
      });

      logger.log('Published file to bucket: %s region: %s filepath: %s size: %s', result.bucket, result.region, result.filePath, result.size);
    });
  }

  return {name: 'S3 release'};
};
