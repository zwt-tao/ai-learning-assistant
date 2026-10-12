import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ status: 'ok', message: '后端运行正常' })
})

export default router
