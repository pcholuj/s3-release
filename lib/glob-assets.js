const pReduce = require('p-reduce');
const glob = require('glob');
const path = require('path');
const debug = require('debug')('semantic-release:s3');

module.exports = async assets =>
  await pReduce(assets, async (result, asset) => {
    return new Promise((resolve, reject) => {
      return glob(asset, {
        dot: true,
      }, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    })
  }, []);