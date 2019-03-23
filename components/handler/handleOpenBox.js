const { FB_GROUP, FURNITURE_OCEAN_SHIPMENT, ELECTONICS,
  HOUSEWARE, WOMEN_CLOTH, CAR, WEDDING, CHILDREN } = process.env
module.exports = async context => {
  const reply = `社友實際購買過後的開箱文整理

開箱文必須先加入ＦB社團才能觀看。${FB_GROUP}
  
>>>開箱文<<<
|傢俱海運篇 ${FURNITURE_OCEAN_SHIPMENT}
|電器燈具篇 ${ELECTONICS}
|居家飾品用品 ${HOUSEWARE}
|女裝篇 ${WOMEN_CLOTH}
|汽車用品篇 ${CAR}
|婚禮篇 ${WEDDING}
|兒童篇 ${CHILDREN}`
  return context.replyText(reply)
}
