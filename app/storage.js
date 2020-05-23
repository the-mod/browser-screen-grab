const fs = require('fs');
const path = require('path');
const moment = require('moment');
const { log } = require('./logger');

/**
 * returns timeStamp of now in the format YYYYMMDDHHmmss
 */
const now = () => {
    return moment().utc().format('YYYYMMDDHHmmss');
}

/**
 * gets to project root path
 */
const getProjectRoot = () => {
    return path.join(__dirname, '..');
}

/**
 * checks if the given path is absolute
 * @param {string} dir 
 */
const isAbsolutePath = (dir) => {
    return path.isAbsolute(dir);
}

/**
 * Gets the absolute path if the given directory was relative to project root.
 * If the given path was already absoulte it gets returned as is.
 * @param {string} outDir path to the ouput directory
 */
const getAbsolutePath = (outDir) => {
    return isAbsolutePath(outDir) ? outDir : path.join(getProjectRoot(), outDir);
}

/**
 * checks if the given directory path exists, if not it will create it
 * @param {string} path 
 */
const createDirectoryIfNotExists = (path) => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
}

/**
 * Creates a absolute filepath
 * @param {string} targetDir the directory
 * @param {string} fileNamePrefix prefix of filename
 * @param {string} fileNameSuffix suffix of filename
 */
const getFileName = (targetDir, fileNamePrefix, fileNameSuffix) => {
    filename = `${fileNamePrefix}-${fileNameSuffix}.png`;
    return path.resolve(targetDir, filename);
}

/**
 * Creates a absolute filepath with a timestamp (YYYYMMDDHHmmss) as filename suffix
 * @param {string} targetDir 
 * @param {string} fileNamePrefix 
 */
const getFilenameWithTimestamp = (targetDir, fileNamePrefix) => {
    return getFileName(targetDir, fileNamePrefix, now());
}

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
  * Checks if the outdir exists, if not it creates it and returns a absolute path to it.
  * @param {string} path the path of the outdir
  */
const initDirectory = (path) => {
    const targetPath = getAbsolutePath(path);
    if (!directoryExists(targetPath)) {
      log(`Directory '${targetPath}' does not exists. Creating directory...`);
      try {
        createDirectoryIfNotExists(targetPath);
      } catch(err) {
        throw new Error(`Can not create Directory '${targetPath}'`);
      }
      log(`Directory '${targetPath}' created`);
    } else {
      if (!isDirectoryWritable(targetPath)) {
        throw new Error(`Directory '${targetPath}' is not writable`);
      }
    }
    return targetPath;
}

module.exports = {
    initDirectory,
    createDirectoryIfNotExists,
    getFileName,
    getFilenameWithTimestamp,
    getProjectRoot, //only for testing reasons
    isAbsolutePath, //only for testing reasons
    getAbsolutePath, //only for testing reasons
}