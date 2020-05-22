const fs = require('fs');
const path = require('path');
const moment = require('moment');

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

module.exports = {
    createDirectoryIfNotExists,
    getFileName,
    getFilenameWithTimestamp,
    getProjectRoot, //only for testing reasons
    isAbsolutePath, //only for testing reasons
    getAbsolutePath,
}