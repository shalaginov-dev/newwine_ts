import cron from 'node-cron'
const bot = require('./bot.create')

import { imageLinks } from './public/imgLinks'

interface MessageSending {
	url_taskMap: any
	startMessageSending: (userId: number) => void
	stopMessageSending: () => void
}

export const messageSending: MessageSending = {
	url_taskMap: {},
	startMessageSending(userId) {
		const task = cron.schedule('* * * * *', () => {
			const randomNumber = Math.floor(Math.random() * 352)
			bot.api.sendPhoto(userId, imageLinks[randomNumber])
		})
		this.url_taskMap['url'] = task
	},
	stopMessageSending() {
		this.url_taskMap.url.stop()
	},
}
