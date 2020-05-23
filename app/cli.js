const { grab } = require('./capture');
const arguments = require('./arguments');

const { interval, url, outdir, fileNamePrefix } = arguments.parse();

grab(interval, url, outdir, fileNamePrefix);
