const yargs = require('yargs');

const {
  isIntervalValid,
  isURLValid,
  isPathValid,
} = require('./validator');

const { log } = require('./logger');

const DEFAULT_OUT_DIR = 'pics';
const DEFAULT_FILE_NAME = 'screenshot';

const urlArgument = {
  name: 'url',
  options: {
    alias: 'u',
    nargs: 1,
    description: 'URL of the Page in the form [http|https]://[host]:[port]/[path]?[query]',
    type: 'string',
  }
}

const intervalArgument = {
  name: 'interval',
  options: {
    alias: 'i',
    nargs: 1,
    description: 'Interval of taking Screenshots in Seconds',
    type: 'number',
  }
}

const filenameArgument = {
  name: 'filename',
  options: {
    alias: 'f',
    nargs: 1,
    description: 'Filename prefix',
    default: DEFAULT_FILE_NAME,
    type: 'string',
  }
}

const outdirArgument = {
  name: 'outdir',
  options: {
    alias: 'o',
    nargs: 1,
    description: 'Directory where Screenshots be stored',
    default: DEFAULT_OUT_DIR,
    type: 'string',
  }
}

const parse = () => {
    args = yargs
    .usage('Usage: $0 -i [num] -u [string]')
    .epilogue('for more information, go to https://github.com/the-mod/browser-screen-grab')
    .option(urlArgument.name, urlArgument.options)
    .option(intervalArgument.name, intervalArgument.options)
    .option(filenameArgument.name, filenameArgument.options)
    .option(outdirArgument.name, outdirArgument.options)
    .demandOption(['u', 'i'])
    .help('h')
    .alias('h', 'help')
    .argv;

    // validating given url
    const url = args.url;
    if (!isURLValid(url)) {
      log(`Given url ${url} is not valid`);
      process.exit(1);
    }

    // validating given interval
    inputInterval = args.interval;
    if (!isIntervalValid(inputInterval)) {
      log(`Given interval ${inputInterval} is not valid`);
      process.exit(1);
    }
  
    // validating the directory
    const outdir = args.outdir;
    if (!isPathValid(outdir)) {
      log(`Given direcoty ${outdir} is not valid`);
      process.exit(1);
    }

    const filename = args.filename;
    // TODO check if it is string
  
    return {
      interval: inputInterval * 1000,
      url,
      outdir,
      fileNamePrefix: args.filename,
    }
}

module.exports = {
    parse,
    DEFAULT_FILE_NAME,
    DEFAULT_OUT_DIR,
}
