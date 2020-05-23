# Intro

This Project is about to grab Screenshots as PNG in a regular timebase of a webpage.
It uses [Puppeteer](https://github.com/puppeteer/puppeteer) for rendering the webpage.
It saves the Screenshot as PNG Images.

# Setup
You should have nodejs and npm already installed.
Run `npm i` to install the required dependencies.

# How to start
Just execute 
`npm start -- -i <seconds> -u <url>`

or

`node app/cli.js -i <seconds> -u <url>`

with the mandatory attributes -i, --interval and -u, --url

# Parameters
* -i, --interval: give the interval between Screenshots in Seconds
* -u, --url: the URL to screenshot
* -o, --outdir (optional): the directory where the Screenshots should be stored. Default is `path` in the same location of this project
* -f, --filename (optional): the prefix of the Screenshot's Filename. The Script will automatically add a Timestamp in the format `YYYYMMDDHHmmss` so the target filename would be `<filename>-<YYYYMMDDHHmmss>.png`


# Raspberry Pi Setup on Raspbian
You can not use the Chromium comes with Puppeteer on Raspbian.
So install Chromium on your own and refer to it while launching pupeteer Browser.

* Install Chromium e.g. `sudo apt-get install chromium`
* Reference to the Chromium Installation e.g. `/usr/bin/chromium-browser` as `executablePath` Option like `pupeteer.launch({executablePath: 'path to chromium'})`. See also [Puppeteer Launch Options](https://github.com/puppeteer/puppeteer/blob/v3.1.0/docs/api.md#puppeteerlaunchoptions)