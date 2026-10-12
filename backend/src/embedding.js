// 调用硅基流动 Embedding API，把文字转成向量
export async function embedText(text) {
  const response = await fetch('https://api.siliconflow.cn/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.EMBEDDING_API_KEY}`
    },
    body: JSON.stringify({
      model: 'BAAI/bge-m3',
      input: text
    })
  })

  const data = await response.json()
  return data.data[0].embedding
}
