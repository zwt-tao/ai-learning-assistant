import express from 'express'
import cors from 'cors'
import healthRouter from './routes/health.js'
import chatRouter from './routes/chat.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/chat', chatRouter)

app.use('/api/health', healthRouter)

app.get('/', (req, res) => {
  res.send('Hello, AI 学习助手!')
})

export default app
