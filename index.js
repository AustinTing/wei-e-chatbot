require('dotenv').config()
const { LineBot } = require('bottender')
const { createServer } = require('bottender/express')
const handler = require('./components/handler')

const bot = new LineBot({
  accessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET
})

bot.onEvent(handler)

const server = createServer(bot)

server.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT} port...`)
})
