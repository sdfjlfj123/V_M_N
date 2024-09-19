import { defineStore } from "pinia"
const userStore = defineStore('user', {
    state: () => ({
        userdata: {}
    }),
    actions: {
        changeUser(value) {
            this.userdata = {
                ...this.userdata,
                ...value
            }
        }
    },
    persist: {
        enabled: true, // 确保启用持久化
        strategies: [
            {
                key: 'user', // 本地存储中的键
                storage: localStorage // 可以是 localStorage 或 sessionStorage
            }
        ]
    }

})
export default userStore