const fs = require('fs');
const _ = require('lodash');
const URL = require("url").URL;

/**
 * checks if the given path is writeable
 * @param {string} path 
 */
const isDirectoryWritable = (path) => {
    try {
      fs.accessSync(path, fs.constants.W_OK);
      return true;
    } catch(err) {
      return false;
    };
 }
    
/**
 * checks if the given path exists
 * @param {string} path 
 */
 const directoryExists = (path) => {
     return fs.existsSync(path);
 }
    
/**
 * checks the given url
 * @param {string} url 
 */
 const isURLValid = (url) => {
     try {
         new URL(url);
         return true;
     } catch (err) {
         return false;
     }
 }
    
/**
 * checks if the given interval is a finite number
 * @param {number} interval 
 */
 const isIntervalValid = (interval) => _.isFinite(interval);
 
 module.exports = {
    isIntervalValid,
    isURLValid,
    directoryExists,
    isDirectoryWritable,
 }