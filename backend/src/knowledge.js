import { readFile, writeFile } from 'fs/promises'
import path from 'path'
import { embedText } from './embedding.js'

// knowledge 目录在 backend 的上一级
const KNOWLEDGE_DIR = path.join(process.cwd(), '..', 'knowledge')

export async function loadDocument(filename) {
  const filePath = path.join(KNOWLEDGE_DIR, filename)
  const content = await readFile(filePath, 'utf-8')
  return content
}

// 把长文本切成多个 chunk
// chunkSize: 每个 chunk 多少字
// overlap: 相邻 chunk 重叠多少字
export function splitText(text, source, chunkSize = 200, overlap = 50) {
  const chunks = []
  let start = 0
  let index = 0

  while (start < text.length) {
    // 从 start 开始取 chunkSize 个字（不够就取到结尾）
    const end = Math.min(start + chunkSize, text.length)
    const content = text.slice(start, end)

    chunks.push({
      id: index + 1,
      source: source,
      content: content,
      index: index,
      size: content.length
    })

    // 步长 = chunkSize - overlap，往后跳
    start += (chunkSize - overlap)
    index++
  }

  return chunks
}

// 批量处理：读文档 → Chunk → Embedding → 保存 embeddings.json
const files = ['javascript.md', 'vue3.md', 'rag.md']
const allChunks = []

for (const file of files) {
  const text = await loadDocument(file)
  const chunks = splitText(text, file, 200, 50)

  console.log(`处理 ${file}：${chunks.length} 个 chunk`)

  for (const c of chunks) {
    c.embedding = await embedText(c.content)
    allChunks.push(c)
    console.log(`  chunk ${c.index} 完成，向量维度 ${c.embedding.length}`)
  }
}

// 保存到 knowledge/embeddings.json
const outputPath = path.join(KNOWLEDGE_DIR, 'embeddings.json')
await writeFile(outputPath, JSON.stringify(allChunks, null, 2), 'utf-8')

console.log(`\n完成！共 ${allChunks.length} 个 chunk，已保存到 embeddings.json`)
