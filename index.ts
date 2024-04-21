import {GrammyError, HttpError, Context, InlineKeyboard} from 'grammy'
import {messageSending} from './bot.service'

const bot = require('./bot.create')
import {EmojiFlavor, emojiParser} from "@grammyjs/emoji"

require('dotenv').config()
require('./bot.menu')

export type MyContext = EmojiFlavor

bot.use(emojiParser())
bot.command('start', async (ctx: Context) => {
    await ctx.reply(
        `Спасибо, что вы с нами🎉
Теперь каждый день в 10.00 по мск
ожидайте новое послание 💌`
    )
    messageSending.startMorningSending(ctx.msg?.from?.id as number)
    await ctx.deleteMessage()
})

bot.command('stop', async (ctx: Context) => {
    await ctx.reply(`Дорогой друг, вы всегда можете
возобновить получение посланий,
выбрав в меню команду «старт» 🙏🏻`)
    messageSending.stopMorningSending()
    await ctx.deleteMessage()
})


bot.command('links', async (ctx: MyContext) => {
    const wineEmoji = ctx.emoji`${"wine_glass"}`
    const arrowEmoji = ctx.emoji`${"backhand_index_pointing_down_light_skin_tone"}`
    const mainKeyboard = new InlineKeyboard()
        .url(`Instagram`, 'https://www.instagram.com/newwwwwine?igsh=ZDZwcnA3b2F0MGNl').row()
        .url(`Telegram`, 'https://t.me/newwwwwine').row()
        .url(`Pinterest`, 'https://pin.it/2FqNG24KD')
    const bonusKeyboard = new InlineKeyboard()
        .url('Tg. Канал «Рождество»', 'https://t.me/CHRISTmas_in_heart').row()
        .url('Inst. «Творцы реальности»', 'https://www.instagram.com/prophetscall?igsh=NnNvYTZpZWxkZjNo').row()
        .url('Inst. «Реформация»', 'https://www.instagram.com/reformation_spirit?igsh=eXNtZWh4cTN2NDFw')

    await ctx.reply(`${wineEmoji}   мы в других соцсетях  ${arrowEmoji}`, {reply_markup: mainKeyboard})
    await ctx.reply(`${wineEmoji} также мы рекомендуем ${arrowEmoji}`, {reply_markup: bonusKeyboard})
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
