const {
  TAOBAO_APP_SHOPPING_TUTORIAL,
  HOW_TO_PICK_SELLER,
  HOW_TO_RECOGNIZE_GOODS,
  RECOMMEND_GRIL_SHOP,
  FIND_COUPON_BY_YOUR_SELF,
  PRIVATE_CONSOLIDATION_TUTORIAL } = process.env

module.exports = async context => {
  const reply = `|淘寶app購物教學->${TAOBAO_APP_SHOPPING_TUTORIAL}
|怎麼挑賣家-> ${HOW_TO_PICK_SELLER}
|普貨特貨怎麼分？-> ${HOW_TO_RECOGNIZE_GOODS}
|女裝推薦店家-> ${RECOMMEND_GRIL_SHOP}
|優惠券網站自己找券-> ${FIND_COUPON_BY_YOUR_SELF}
|私人集運教學-> ${PRIVATE_CONSOLIDATION_TUTORIAL}

|童裝推薦店家->輸入 8
|買淘寶要知道的五件事（交易關閉，拒收....)->輸入 9
|文字訊息如何領優惠券->輸入 10
|要怎麼查商品有沒有優惠券->輸入 11
|找淘寶人工客服->輸入 12
|買220V電器注意事項->輸入13
|如何輸入折扣碼?->輸入 14
傳送相對應數字到line，機器人會把連結傳給你喲～`
  return context.sendText(reply)
}
