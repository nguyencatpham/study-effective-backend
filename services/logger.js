import fs from 'fs'
import path from "path"
import Log from 'log'
let log = new Log('debug', fs.createWriteStream('systemLog.log'))

export const logger = {
    logError: (message) => {
        log.error(message)
    },
    logInfo: (message) => {
        log.info(message)
    },
    logDebug: (message) => {
        log.debug(message)
    },
    logWarning: (message) => {
        log.warning(message)
    }
}
export default logger