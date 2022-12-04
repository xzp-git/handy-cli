import log from 'npmlog'

log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info'

log.heading = 'handy-cli'
log.headingStyle = { fg: 'red', bg: 'white', bold: true }
log.addLevel('success', 2000, { fg: 'green', bold: true })

export { log }
