const { grap } = require('./capture');
const arguments = require('./arguments');

const { interval, url, outdir, fileNamePrefix } = arguments.parse();

grap(interval, url, outdir, fileNamePrefix);
