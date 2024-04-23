import cron from 'node-cron'
import {images, images2} from './public/images'

const bot = require('./bot.create')


interface MessageSending {
    url_taskMap: any
    startMorningSending: (userId: number) => void
    stopMorningSending: () => void
}

export const messageSending: MessageSending = {
    url_taskMap: {},
    startMorningSending(userId) {
        let num = 1
        const morningTask = cron.schedule('* * * * *', () => {
            const randomNumber = Math.floor(Math.random() * 350)
            if (num % 2 === 0) {
                bot.api.sendPhoto(userId, images[randomNumber])
                num++
            } else {
                bot.api.sendPhoto(userId, images2[randomNumber])
                num++
            }

        })
        this.url_taskMap['morningJob'] = morningTask
    },
    stopMorningSending() {
        this.url_taskMap.morningJob.stop()
    }
}
