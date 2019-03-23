const { LineHandler } = require('bottender')
const handleUncaught = require('./handleUncought')
const { ACCOUNT, EMAIL, RETURN_TWD_FORM, RECOMMEND_GRIL_SHOP, RECOMMEND_CHILDREN_SHOP,
  FIVE_THING_BUY_TAOBAO_YOU_SHOULD_KNOW, HOW_TO_GET_COUPON_BY_TEXT, WECHAT_CHECK_COUPON_TUTORIAL,
  TAOBAO_CUSTOMER_SERVICE, CONSOLIDATION_CUSTOMER_SERVICE, TAOBAO_TW_CUSTOMER_SERVICE_PHONE,
  BUY_ELECTRONICS_NOTES
} = process.env
const handleOne = async context => {
  const reply = `索取實名帳號
帳號：${ACCOUNT}
姓名：${EMAIL}
其他欄位填寫自己的資料即可（可參考圖片）

Ｅmail 要寫平常會看的 如果返利有問題會用email 通知
沒有ＱＱ的 ＱＱ欄位 隨意填寫八位數字即可

提取後請填表單 約十天後會轉到你的台幣帳戶喔！表單▶http://bit.ly/2oRkcZo`
  return context.replyText(reply)
}

module.exports = new LineHandler()
  .onText('1', handleOne)
  .onText('2', async context => context.replyText(`填寫返台幣表單連結➡${RETURN_TWD_FORM}`))
  .onText('7', async context => context.replyText(`女裝推薦店家-> ${RECOMMEND_GRIL_SHOP}`))
  .onText('8', async context => context.replyText(`童裝推薦店家-> ${RECOMMEND_CHILDREN_SHOP}`))
  .onText('9', async context => context.replyText(`買淘寶要知道的五件事（交易關閉，拒收....)-> ${FIVE_THING_BUY_TAOBAO_YOU_SHOULD_KNOW}`))
  .onText('10', async context => context.replyText(`文字訊息如何領優惠券-> ${HOW_TO_GET_COUPON_BY_TEXT}`))
  .onText('11', async context => context.replyText(`微信公眾號查優惠券教學-> ${WECHAT_CHECK_COUPON_TUTORIAL}`))
  .onText('12', async context => context.replyText(`找淘寶人工客服：${TAOBAO_CUSTOMER_SERVICE}\n找官方集運人工客服：${CONSOLIDATION_CUSTOMER_SERVICE}\n淘寶台灣客服電話：${TAOBAO_TW_CUSTOMER_SERVICE_PHONE}`))
  .onText('13', async context => context.replyText(`購買電器注意事項(220V怎麼轉接)?${BUY_ELECTRONICS_NOTES}`))
  .onEvent(handleUncaught)
  .build()
