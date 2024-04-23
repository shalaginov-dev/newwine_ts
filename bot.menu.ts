export {}
const bot = require('./bot.create')

module.exports = bot.api.setMyCommands([
	{
		command: 'start',
		description: 'Начать получать послания',
	},
	{
		command: 'stop',
		description: 'Приостановить получение посланий',
	},
	{
		command: 'links',
		description: 'Наши ссылки',
	},
	{
		command: 'detox',
		description: 'Детоксикация от религии',
	},
])
