const { COUPON_NOTES, COUPON_NOTES_URL } = process.env
const { Line } = require('messaging-api-line')
const reply = `"目前沒有折扣碼發送
--------------------
折扣碼使用方式：
1. 只適用於台灣收貨地址的訂單。
2. 折扣碼可於 3月7日-3月9日使用，並支持與紅包、商家優惠券、購物津貼等疊加使用。
3. 可適用於天貓和淘寶平台商品。
4. 折扣碼的使用數量有限，先到先得，用完即止。
5. 折扣碼僅支援於手機淘寶及淘寶Lite App 上使用。
6. 此活動主辦單位可以根據本活動的實際舉辦情況對活動規則進行變動或調整，本活動參加者視為同意本活動辦法及注意事項並受其拘束，活動辦法及注意事項嗣後如經主辦單位變更或修改者亦同。 
7. 用戶不得要求更換其他物品或將獎品轉讓或折換成現金。獎品一經兌換、簽收受領後，如有 遺失、盜領、自行拋棄、毀損，均由得獎者自行承擔相關損害及損失，概與主辦單位無關。
詳細說明：${COUPON_NOTES}`
module.exports = async context => {
  return context.reply([
    Line.createText(reply),
    Line.createImage({
      originalContentUrl: COUPON_NOTES_URL
    })
  ])
}
