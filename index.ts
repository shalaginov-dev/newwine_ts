import { GrammyError, HttpError, Context } from 'grammy'
import { messageSending } from './bot.service'
const bot = require('./bot.create')

require('dotenv').config()
require('./bot.menu')

bot.command('start', async (ctx: Context) => {
	await ctx.reply(
		'Дорогой друг, с этого момента ты будешь получать послания тут один раз в день'
	)
	messageSending.startMorningSending(ctx.msg?.from?.id as number)
	await ctx.deleteMessage()
})

bot.command('stop', async (ctx: Context) => {
	await ctx.reply('Ты всегда можешь продолжить, нажав кнопку старт в меню')
	messageSending.stopMorningSending()
	await ctx.deleteMessage()
})

bot.catch((err: any) => {
	const ctx = err.ctx
	console.error(`Error while handling update ${ctx.update.update_id}:`)
	const e = err.error
	if (e instanceof GrammyError) {
		console.error('Error in request:', e.description)
	} else if (e instanceof HttpError) {
		console.error('Could not contact Telegram:', e)
	} else {
		console.error('Unknown error:', e)
	}
})

bot.start()
