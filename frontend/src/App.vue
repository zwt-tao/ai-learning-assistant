<template>
  <div class="container">
    <h1>AI 学习助手</h1>

    <!-- 显示 AI 回复的区域 -->
<div class="chat-box">
  <p v-if="messages.length === 0">还没有对话，向 AI 提问吧！</p>
  <div v-for="(msg, index) in messages" :key="index" class="msg" :class="msg.role">
    <b>{{ msg.role === 'user' ? '你' : 'AI' }}：</b>{{ msg.content }}
  </div>
</div>

    <!-- 输入框 + 发送按钮 -->
    <div class="input-area">
      <input type="text" placeholder="输入你的问题..." v-model="question" @keyup.enter="send" />
      <button @click="send" :disabled="loading">
        <span v-if="loading">发送中...</span>
        <span v-else>发送</span>
      </button>
      <button @click="reset" :disabled="loading">重置对话</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const question = ref('')
const messages = ref([])
const loading = ref(false)

async function send() {
  if (loading.value) return
  loading.value = true

  if (!question.value.trim()) {
    messages.value.push({ role: 'assistant', content: '请输入问题！' })
    loading.value = false
    return
  }

  try {
    const userMessage = question.value
    messages.value.push({ role: 'user', content: userMessage })
    messages.value.push({ role: 'assistant', content: '' })
    question.value = ''
    // 第1空：用 fetch 发 POST 请求（不再用 axios）
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    })

    // 第2空：拿到读水器
    const reader = response.body.getReader()
    const decoder = new TextDecoder()   // 浏览器端的 TextDecoder

    // 第3空：循环读流
    while (true) {
      const { done, value } = await reader.read()
      if (done) break   // 读完了

      // 第4空：解码成字符串（stream:true 记住跨段的半个字）
      const text = decoder.decode(value, { stream: true })

      // 第5空：按行解析 SSE
      // text 长这样： data: {"content":"是"}\n\n
      //             data: {"content":"一种"}\n\n
      const lines = text.split('\n')
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const dataStr = line.slice(6)
        if (dataStr === '[DONE]') continue
        try {
          const json = JSON.parse(dataStr)
          if (json.content) {
            messages.value[messages.value.length - 1].content += json.content   // 追加！不是覆盖
          }
        } catch (e) {}
      }
    }
  } catch (error) {
    messages.value[messages.value.length - 1].content = '出错了：' + error.message
  } finally {
    loading.value = false
  }
}

async function reset() {
  if (loading.value) return
  loading.value = true

  try {
    await fetch('http://localhost:3000/api/chat/reset', { method: 'POST' })
    messages.value = []
    question.value = ''
  } catch (error) {
    console.error('重置对话失败：', error)
  } finally {
    loading.value = false
    question.value = ''
  }
}

</script>

<style>
.container {
  max-width: 600px;
  margin: 50px auto;
  font-family: Arial, sans-serif;
}

.chat-box {
  min-height: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.input-area {
  display: flex;
  gap: 8px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

button {
  padding: 10px 20px;
  background: #4a90d9;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
