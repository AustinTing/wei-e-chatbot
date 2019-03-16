const _ = require('lodash')
// const queryString = require('query-string')
const { LineHandler } = require('bottender')
const rp = require('request-promise')

var initSessionAndCheckContext = context => {
  let { event, session } = context
  if (!event || !session || !session.user || !session.user.id || !session.user.displayName) {
    return true
  }
  let logger = require('./logger').getLogger(session.user.displayName)
  context['logger'] = logger
  logger.trace(JSON.stringify(event))
  console.log('\n')
  if (event.isText) {
    logger.info(`text: ${event.text}`)
  }
  if (event.isPostback) {
    logger.info(`postback: ${event.postback}`)
  }
  return false
}

// var isAboutProfile = async context => {
//   let { logger, event } = context
//   if ((event.isText && event.text === '會員資料')) {
//     logger.debug('handle, isAboutProfile true')
//     return true
//   }
//   return false
// }
// var replyProfile = async context => {
//   let { logger } = context
//   await userHelper.replyProfile(context)
//   logger.info('handle, reply profile')
// }

const handleUncaught = context => {
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

const logDisappearProp = context => {
  let logger = require('../logger').getLogger('handler basic property not exist')
  if (!context.event) return logger.error('no event, context: \n', context)
  if (!context.session) return logger.error('no session, raw context: \n', context)
  if (!context.session.id) return logger.error('no id, session: ', context.session)
  if (!context.session.displayName) return logger.error('no displayName, session: ', context.session)
  logger.error('Uncaught, context:', JSON.stringify(context))
}

module.exports = new LineHandler()
  .on(initSessionAndCheckContext, logDisappearProp)
  .onEvent(handleUncaught)
  .build()
