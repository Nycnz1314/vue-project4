import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usepicStore = defineStore('pic', () => {
    const picIp='http://localhost:8088/pic/'
    return {picIp}
})
