import {ref} from 'vue'
import { defineStore } from 'pinia'
const useRouterConfig = defineStore('routerConfig', () => {
    const isGetterRouter = ref(false)
    const changeIsGetterRouter = (value) => {
        isGetterRouter.value = value
    }
    return {
        isGetterRouter,
        changeIsGetterRouter
    }
})
export default useRouterConfig