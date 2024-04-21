import cron from 'node-cron'
const bot = require('./bot.create')

import {imageLinks} from './public/imgLinks'
import {imageLinks2} from './public/imgLinks2'

interface MessageSending {
    url_taskMap: any
    startMorningSending: (userId: number) => void
    stopMorningSending: () => void
    // startEveningSending: (userId: number) => void
    // stopEveningSending: () => void
}

export const messageSending: MessageSending = {
    url_taskMap: {},
    startMorningSending(userId) {
        let num = 1
        const morningTask = cron.schedule('* * * * *', () => {
            const randomNumber = Math.floor(Math.random() * 350)
            if (num % 2 === 0) {
				bot.api.sendPhoto(userId, imageLinks[randomNumber])
                num++
            } else {
				bot.api.sendPhoto(userId, imageLinks2[randomNumber])
                num++
            }

        })
        this.url_taskMap['morningJob'] = morningTask
    },
    stopMorningSending() {
        this.url_taskMap.morningJob.stop()
    },


    // startEveningSending(userId) {
    //     const eveningTask = cron.schedule('* * * * *', () => {
    //         const randomNumber = Math.floor(Math.random() * 350)
    //         bot.api.sendPhoto(userId, imageLinks2[randomNumber])
    //     })
    //     this.url_taskMap['eveningJob'] = eveningTask
    // },
    // stopEveningSending() {
    //     this.url_taskMap.eveningJob.stop()
    // },
}
