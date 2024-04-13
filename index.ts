import {Bot, GrammyError, HttpError, Context, Keyboard} from "grammy";
import cron from 'node-cron';
import {imageLinks} from "./public/imgLinks";

require('dotenv').config()

interface Data {
    users: { userId: number }[]
    startMessageSending: (userId: number, isStop: boolean) => void
}

const keyboard = new Keyboard().text('stop').resized().oneTime()

const bot = new Bot<Context>(process.env.BOT_TOKEN as string)

const data: Data = {
    users: [
        {userId: 6839434298},
        {userId: 477328986},
    ],
    startMessageSending(userId, isStop) {
        const task = cron.schedule('* * * * *', () => {
            const randomNumber = Math.floor(Math.random() * 6)
            if (userId !== null)
                data.users.forEach((user) => {
                    bot.api.sendPhoto(user.userId, imageLinks[randomNumber])

                })
        })
        if (isStop){
            console.log('isStop: ',isStop)
            task.stop()
        }
    },
}

bot.command('start', async (ctx) => {
    await ctx.reply('Hi dear friend!', {
        reply_markup: keyboard
    })
    data.startMessageSending(6839434298, false)
})

bot.hears('stop', async (ctx) => {
    await bot.stop().then(()=>{
        console.log('bot stopped!')
        data.startMessageSending(123, true)
    })
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