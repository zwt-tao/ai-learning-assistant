import app from './app.js'
import { PORT } from './config/index.js'

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`)
})
