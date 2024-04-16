import { Bot, GrammyError, HttpError, Context, Keyboard } from 'grammy'
import cron from 'node-cron'
import { imageLinks } from './public/imgLinks'

require('dotenv').config()
require('./command/menu.command')

interface Data {
	startMessageSending: (userId: number, isSend: string) => void
}

const keyboard = new Keyboard().text('stop').resized().oneTime()

const bot = new Bot<Context>(process.env.BOT_TOKEN as string)

const message: any = {
	url_taskMap: {},
	startMessageSending(userId: any, isSend: any) {
		const task = cron.schedule('* * * * *', () => {
			const randomNumber = Math.floor(Math.random() * 352)
			console.log(randomNumber)
			bot.api.sendPhoto(userId, imageLinks[randomNumber])
		})
		this.url_taskMap['url'] = task
	},
	stopMessageSending() {
		this.url_taskMap.url.stop()
		console.log('job should be stopped')
	},
}

bot.command('start', async ctx => {
	await ctx.reply(
		'Дорогой друг, с этого момента ты будешь получать послания тут один раз в день'
	)
	message.startMessageSending(ctx.msg?.from?.id as number, true)
	await ctx.deleteMessage()
})

bot.command('stop', async ctx => {
	message.stopMessageSending()
	await ctx.deleteMessage()
})

bot.catch(err => {
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
