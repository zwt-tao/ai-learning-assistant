import { embedText } from './embedding.js'

// 余弦相似度：比较两个向量的方向
// 结果范围 -1 到 1，越接近 1 越相似
function cosineSimilarity(a, b) {
  let dotProduct = 0   // 点积
  let normA = 0        // a 的长度
  let normB = 0        // b 的长度

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i]
    normA += a[i] * a[i]
    normB += b[i] * b[i]
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}

// 三个句子
const A = 'Vue 是一个前端 JavaScript 框架'
const B = 'Vue 可以用于构建 Web 用户界面'
const C = '今天晚上我要去健身房锻炼'

console.log('正在生成向量...')
const [vecA, vecB, vecC] = await Promise.all([
  embedText(A),
  embedText(B),
  embedText(C)
])

console.log('\n=== 语义相似度实验 ===')
console.log(`A: ${A}`)
console.log(`B: ${B}`)
console.log(`C: ${C}`)
console.log('')
console.log(`A vs B 相似度: ${cosineSimilarity(vecA, vecB).toFixed(4)}  （A 和 B 都在讲 Vue，应该高）`)
console.log(`A vs C 相似度: ${cosineSimilarity(vecA, vecC).toFixed(4)}  （A 讲 Vue，C 讲健身，应该低）`)
