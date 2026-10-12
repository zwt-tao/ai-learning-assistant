import { Router } from 'express'
import { streamLLM } from '../llm.js'   // 第1空：函数名

const router = Router()
let history = []

router.post('/', async (req, res) => {
  const msg = req.body.message
  history.push({ role: 'user', content: msg })
  // 第2空：设置 SSE 头
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')

  // 第3空：拿到 LLM 流（不再 await 完整结果）
  const llmStream = await streamLLM(history)

  // 第4空：逐段读流
  const decoder = new TextDecoder()
  let fullAnswer = ''
  for await (const chunk of llmStream) {
    // chunk 是 Buffer（二进制），要先解码成字符串
    const text = decoder.decode(chunk, { stream: true })

    // 按行处理
    const lines = text.split('\n')
    for (const line of lines) {
      // 第5空：只处理以 "data: " 开头的行
      if (!line.startsWith('data: ')) continue

      const dataStr = line.slice(6)   // 去掉 "data: " 前缀

      // 第6空：如果是结束标记
      if (dataStr === '[DONE]') continue

      try {
        const json = JSON.parse(dataStr)
        // 第7空：从 DeepSeek 的格式里取出新内容
        const content = json.choices[0].delta?.content

        // 第8空：如果有新内容，转发给浏览器
       if (content) {
         fullAnswer += content   // ← 新增：拼接完整回答
         res.write(`data: ${JSON.stringify({ content })}\n\n`)
        }
      } catch (e) {
        // 忽略解析错误（SSE 里偶尔会有空行）
      }
    }
  }

  history.push({ role: 'assistant', content: fullAnswer })
  // 第9空：结束响应
  res.end()
})

  router.post('/reset', (req, res) => {
    history = []
    res.json({ ok: true })
  })

export default router
