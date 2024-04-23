import { Bot, Context } from 'grammy'
import { EmojiFlavor } from '@grammyjs/emoji'
require('dotenv').config()

export type MyContext = EmojiFlavor

module.exports = new Bot<MyContext>(process.env.BOT_TOKEN as string)
