import { Bot, Context } from 'grammy'
require('dotenv').config()

module.exports = new Bot<Context>(process.env.BOT_TOKEN as string)
