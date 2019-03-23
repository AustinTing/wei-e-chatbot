// const _ = require('lodash')
// const queryString = require('query-string')
const { LineHandler } = require('bottender')
const handleTaobaoLink = require('./handleTaobaoLink')
const handleHelp = require('./handleHelp')
const handleNumber = require('./handleNumber')
const handleOpenBox = require('./handleOpenBox')
const handleNote = require('./handleNote')
const handleUncaught = require('./handleUncought')

var initContext = context => {
  let { event, session } = context
  if (!event || !session || !session.user || !session.user.id || !session.user.displayName) {
    return true
  }
  let logger = require('../../logger').getLogger(session.user.displayName)
  context['logger'] = logger
  logger.trace(JSON.stringify(event))
  console.log('\n')
  if (event.isText) {
    logger.info(`text: ${event.text}`)
  }
  return false
}

const logDisappearProp = context => {
  let logger = require('../../logger').getLogger('handler basic property not exist')
  if (!context.event) return logger.error('no event, context: \n', context)
  if (!context.session) return logger.error('no session, raw context: \n', context)
  if (!context.session.id) return logger.error('no id, session: ', context.session)
  if (!context.session.displayName) return logger.error('no displayName, session: ', context.session)
  logger.error('Uncaught, context:', JSON.stringify(context))
}

module.exports = new LineHandler()
  .on(initContext, logDisappearProp)
  .onText(/https:\/\/m.tb.cn\//g, handleTaobaoLink)
  .onText('幫助', handleHelp)
  .onText(/\d+/, handleNumber)
  .onText('開箱文', handleOpenBox)
  .onText('折扣碼', handleNote)

  .onEvent(handleUncaught)
  .build()
