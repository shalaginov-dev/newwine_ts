import {Bot, GrammyError, HttpError, Context} from "grammy";
import cron from 'node-cron';
require('dotenv').config()


const images = [
    "./public/images/image.png",
    "./public/images/image2.png",
    "./public/images/image3.png",
    "./public/images/image4.png",
    "./public/images/image5.png",
];

const bot = new Bot<Context>(process.env.BOT_TOKEN as string)


bot.command('start', async (ctx) => {
    await ctx.react('👍')
    await ctx.replyWithPhoto("https://images.wallpapersden.com/image/download/android-logo-2021_bGxnZWiUmZqaraWkpJRraWWtaGtl.jpg")
    // await ctx.api.sendPhoto(477328986, images[0])
    console.log(ctx.msg)
})

bot.on('message', async (ctx)=> {
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