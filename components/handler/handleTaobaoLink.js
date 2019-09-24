const { Line } = require('messaging-api-line')
const rp = require('request-promise')
const { COUPON_WEBSITE } = process.env

module.exports = async context => {
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
    return context.reply([Line.createText('此商品無優惠券')])
  }
  logger.debug(JSON.stringify(result))
  const { data } = result
  let { coupon_info: couponInfo } = data
  if (!couponInfo) {
    couponInfo = '暫無'
  }
  const replyText = `${data.title}
参考价：${data.zk_final_price}
内部券：${couponInfo}
淘口令：(${data.tbk_pwd})
————————
複製本段訊息，打開淘寶APP 即可領券
————————
要看更多優惠券請打開優惠券網站:
${COUPON_WEBSITE}`
  logger.info(`reply: \n${replyText}`)
  return context.reply([Line.createText(replyText)])
}
