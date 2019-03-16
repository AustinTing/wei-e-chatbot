// const _ = require('lodash')
// const queryString = require('query-string')
const { LineHandler } = require('bottender')
const rp = require('request-promise')

var initContext = context => {
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
  return false
}

const logDisappearProp = context => {
  let logger = require('../logger').getLogger('handler basic property not exist')
  if (!context.event) return logger.error('no event, context: \n', context)
  if (!context.session) return logger.error('no session, raw context: \n', context)
  if (!context.session.id) return logger.error('no id, session: ', context.session)
  if (!context.session.displayName) return logger.error('no displayName, session: ', context.session)
  logger.error('Uncaught, context:', JSON.stringify(context))
}

const handleTaobaoText = async context => {
  const { event, logger } = context
  const { text } = event
  logger.info(`handleTaobaoText`)
  let option = {
    method: 'POST',
    uri: process.env.URI,
    qs: {
      vekey: process.env.VEKEY,
      para: text
    }
  }
  const result = JSON.parse(await rp(option))
  if (result.error !== '0') {
    logger.error(result)
    return context.sendText(`查詢錯誤`)
  }
  const { data } = result
  const replyText = `${data.title}
参考价：${data.zk_final_price}
内部券：暂无
淘口令：(${data.tbk_pwd})
————————————————
複製本段訊息，打開淘寶APP 即可領券
要看更多優惠券請打開優惠券網站:
https://bit.ly/2tHC0Hf`
  logger.info(`reply: \n${replyText}`)
  await context.sendText(replyText)
}

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

module.exports = new LineHandler()
  .on(initContext, logDisappearProp)
  .onText(/https:\/\/m.tb.cn\//g, handleTaobaoText)
  .onEvent(handleUncaught)
  .build()
