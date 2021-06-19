import React from 'react'

export default function useFormatTime(time) {

    if (time) {
        return {
            hrs: Math.floor(time / 3600) >= 0 ? (Math.floor(time / 3600) < 10 ? `0${Math.floor(time / 3600)}` : Math.floor(time / 3600)) : '00',
            mins: Math.floor(time / 60) > 0 && Math.floor(time % 60) <= 59 ? ((Math.floor(time / 60) % 60) < 10 ? `0${Math.floor(time / 60) % 60}` : Math.floor(time / 60) % 60) : '00',
            secs: Math.floor(time % 60) <= 59 ? (Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60)) : '00'
        }
    } else {
        return {
            hrs: '00',
            mins: '00',
            secs: '00'
        }
    }
}
