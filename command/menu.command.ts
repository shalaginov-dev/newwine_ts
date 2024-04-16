import * as bot from '../connection/token.connection'

module.exports = bot.api.setMyCommands([
	{
		command: 'start',
		description: 'Начать получать послания',
	},
	{
		command: 'stop',
		description: 'Приостановить получение посланий',
	},
])
