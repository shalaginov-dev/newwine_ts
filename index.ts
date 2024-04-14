import {Bot, GrammyError, HttpError, Context, Keyboard} from "grammy";
import cron from 'node-cron';
import {imageLinks} from "./public/imgLinks";

require('dotenv').config()

interface Data {
    startMessageSending: (userId: number,) => void
}

const keyboard = new Keyboard().text('stop').resized().oneTime()

const bot = new Bot<Context>(process.env.BOT_TOKEN as string)

const data: Data = {
    startMessageSending(userId) {
        cron.schedule('* * * * *', () => {
            const randomNumber = Math.floor(Math.random() * 5)
            console.log(randomNumber)
            bot.api.sendPhoto(userId, imageLinks[randomNumber])
        })
    },
}

bot.command('start', async (ctx) => {
    await ctx.reply('Hi dear friend!', {reply_markup: keyboard})
    data.startMessageSending(ctx.msg?.from?.id as number)
})

bot.catch((err) => {
    const ctx = err.ctx
    console.error(`Error while handling update ${ctx.update.update_id}:`)
    const e = err.error
    if (e instanceof GrammyError) {
        console.error("Error in request:", e.description)
    } else if (e instanceof HttpError) {
        console.error("Could not contact Telegram:", e)
    } else {
        console.error("Unknown error:", e)
    }
});

bot.start()