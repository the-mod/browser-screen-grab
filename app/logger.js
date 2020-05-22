const moment = require('moment');

/**
 * prints the message to cosole
 */
const log = (msg) => {
    console.log(`[${moment().utc().toISOString()}]: ${msg}`)
}

module.exports = {
    log,
}