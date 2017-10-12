import Log from 'log'
import fs from 'fs'
import path from "path"
let log = new Log('debug', fs.createWriteStream('systemLog.log'))

export default services = {
    logError: (message) => {
        log.error(message)
    },
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