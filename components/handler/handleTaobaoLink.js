const rp = require('request-promise')

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
    return context.sendText(`查詢錯誤`)
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
https://bit.ly/2tHC0Hf`
  logger.info(`reply: \n${replyText}`)
  await context.sendText(replyText)
}
