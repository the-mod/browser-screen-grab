const _ = require('lodash');
const { isURL } = require('validator');
const isValid = require('is-valid-path');

const URL_OPTIONS = {
  protocols: ['http', 'https'],
  require_protocol: true,
  require_host: true,
};

/**
 * checks the given url
 * @param {string} url
 */
const isURLValid = (url) => {
  return isURL(url, URL_OPTIONS);
};

/**
 * checks if the given interval is a finite number
 * @param {number} interval
 */
const isIntervalValid = (interval) => _.isFinite(interval);

/**
 * checks if the given path is valid
 * @param {string} path
 */
const isPathValid = (path) => isValid(path);

module.exports = {
  isIntervalValid,
  isURLValid,
  isPathValid,
};
