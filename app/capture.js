const puppeteer = require('puppeteer');

const storage = require('./storage');
const { log } = require('./logger');

const {
  DEFAULT_FILE_NAME,
  DEFAULT_OUT_DIR,
} = require('./arguments');

let browser = null;

/**
 * Creates a Browser Object
 * @param {Object} launchOptions pass options to pupeteer e.g. executablePath
 */
const getBrowser = async (launchOptions) => {
    if (!browser) {
        browser = await puppeteer.launch(launchOptions);
    }
    return browser
}

/**
 * gets the given page of the url, takes a Screenshot and stores it under the given outdir with the given fileNamePrefix
 * @param {string} url 
 * @param {string} outputDir 
 * @param {string} fileNamePrefix 
 * @param {Object} puppeteerOptions 
 */
const getPage = async (url, outputDir, fileNamePrefix, puppeteerOptions) => {
  const browser = await getBrowser(puppeteerOptions);
  const page = await browser.newPage();
  const outputPath = storage.getFilenameWithTimestamp(outputDir, fileNamePrefix);
  await page.setViewport({
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });

  await page.goto(url);
  await page.screenshot({
    fullPage: false, // set to true if page is scrollable
    path: outputPath
  });
  log('saved to: ' + outputPath);
  await page.close();
};

/**
 * starts the process of screen graping within the given interval
 * @param {number} interval in milliseconds
 * @param {string} url the URL to capute
 * @param {string} outdir the out dir should exist
 * @param {string} fileNamePrefix the prefix of the filenames
 * @param {Object} puppeteerOptions launch options for pupeteer to override
 */
const grap = (interval, url, outdir = DEFAULT_OUT_DIR, fileNamePrefix = DEFAULT_FILE_NAME, puppeteerOptions = {}) => {
  try {
    targetDir = storage.initDirectory(outdir);

    log(`Starting interval of ${interval} milliseconds`);
    log(`Working on Directory ${targetDir}`);

    setInterval(() => {
      getPage(url, outdir, fileNamePrefix, puppeteerOptions);
    }, interval);
    
  } catch(err) {
    log(`Error initializing outdir: ${err}`);
    process.exit(1);
  }
};

module.exports = {
  grap,
}
