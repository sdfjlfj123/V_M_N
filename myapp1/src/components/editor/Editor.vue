<template>
    <div>
        <div style="border: 1px solid #ccc">
            <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                mode=default />
            <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
                mode=default @onCreated="handleCreated" @onChange="handleChange" />
        </div>
    </div>
</template>
<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { ref, shallowRef, onMounted, onBeforeUnmount, defineEmits, defineProps, onUpdated, watch } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

// 定义 emit 函数
const emit = defineEmits(['event'])

const props = defineProps({
    content: String
})

// onMounted(() => {
//     // console.log(props.content)
//     if (props.content) {
//         console.log(props.content)
//         const editorRef = shallowRef()
//         handleCreated()
//         // setTimeout(() => {
//         //     valueHtml.value = props.content
//         // }, 1000)
        
//         const editor = editorRef.value // 获取 editor ，必须等待它渲染完之后
//         if (editor == null) return
//         console.log(11)
//         // editor.insertText('hello world') // 执行 editor API
//     }
// })



// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('<p></p>')

// 模拟 ajax 异步获取内容

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

// 编辑器创建时
const handleCreated = (editor) => {
    editorRef.value = editor // 记录 editor 实例，重要！
}
watch(editorRef,()=>{
    insertText()
    
})
const insertText = () => {
    const editor = editorRef.value // 获取 editor ，必须等待它渲染完之后
    if (editor == null) return
    if(props.content){
        editor.setHtml(props.content)
        // editor.setHTML('11') // 执行 editor API
    }
}

// onUpdated(()=>{
//     insertText()
// })
// 编辑器内容改变时
const handleChange = () => {
    // emit 事件
    emit('event', valueHtml.value)
}

</script>