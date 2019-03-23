
module.exports = context => {
  let { logger } = context
  if (context.event.isText) {
    return logger.info(`do nothing`)
  }
  if (context.event.isPostback &&
    (context.event.postback.data === 'cancel')) {
    return logger.info(`do nothing`)
  }
  logger.warn('Uncaught Flow, event:', context.event.rawEvent)
}
