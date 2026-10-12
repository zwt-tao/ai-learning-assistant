# AI 学习助手

一个基于 Vue3 + Node.js + Express + LLM API 的 AI 对话应用，支持流式输出、多轮对话上下文和 RAG 知识库检索基础能力。

> 本项目为个人学习项目，从零搭建，逐步实现 AI 应用开发的核心链路。

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | Vue3 + Vite + 原生 fetch（流式接收） |
| 后端 | Node.js + Express |
| 大模型 | DeepSeek API（对话生成） |
| 向量模型 | 硅基流动 BAAI/bge-m3（Embedding） |
| 数据存储 | JSON 文件（知识库向量，暂未接入向量数据库） |

## 已实现功能

- ✅ **AI 对话**：Vue 前端 → Express → DeepSeek LLM → 流式返回
- ✅ **Streaming 流式输出**：SSE + ReadableStream，逐字显示 AI 回复
- ✅ **多轮对话 Context**：后端维护对话历史，LLM 可基于上下文回答
- ✅ **清空对话**：重置上下文
- ✅ **RAG 基础**：Markdown 文档读取 → Chunk 切分 → Embedding 向量化 → 余弦相似度检索
- ✅ **API Key 安全**：环境变量管理，不暴露到前端

## 项目结构

```
ai-learning-assistant/
├── backend/
│   ├── src/
│   │   ├── index.js          # 服务器入口，监听端口
│   │   ├── app.js            # Express 应用组装
│   │   ├── llm.js            # DeepSeek LLM 流式调用
│   │   ├── embedding.js      # 硅基流动 Embedding 调用
│   │   ├── knowledge.js      # 文档读取 + Chunk 切分 + 批量向量化
│   │   ├── similarity.js     # 余弦相似度实验
│   │   ├── config/
│   │   └── routes/
│   │       ├── chat.js       # POST /api/chat（流式对话）
│   │       └── health.js     # GET /api/health（健康检查）
│   ├── .env                  # API Key（不提交）
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── main.js
│   │   └── App.vue           # 聊天页面（输入 + 流式显示）
│   └── package.json
└── knowledge/
    ├── javascript.md         # 知识库文档
    ├── vue3.md
    ├── rag.md
    └── embeddings.json       # 文档向量（18 个 chunk）
```

## 核心链路

### 普通对话

```
用户输入 → Vue(App.vue) → fetch POST /api/chat
→ Express(chat.js) → streamLLM(llm.js) → DeepSeek API
→ SSE 流式返回 → 前端 ReadableStream 逐段接收 → 页面实时显示
```

### 多轮对话

```
第 1 轮：user message → history.push(user) → LLM(history) → 流式接收 → history.push(assistant)
第 2 轮：新 user message → history.push(user) → 把完整 history 发给 LLM → ...
```

### RAG（已完成离线部分）

```
文档 → 读取 → Chunk 切分(chunkSize=200, overlap=50)
→ Embedding(bge-m3, 1024维) → 保存 embeddings.json
→ 用户提问 → 问题转向量 → 余弦相似度 → 取最相关 chunk
```

> 检索接入对话、向量数据库替换 JSON 为后续规划。

## 本地运行

### 后端

```bash
cd backend
npm install
# 配置 .env：
# PORT=3000
# DEEPSEEK_API_KEY=sk-xxx
# EMBEDDING_API_KEY=sk-xxx
npm start
```

### 前端

```bash
cd frontend
npm install
npm run dev
```

访问 `http://localhost:5173`

## 学习路径

本项目按天逐步搭建，每天一个主题：

| 阶段 | 内容 |
|------|------|
| Day 1-5 | JavaScript / Vue3 / TypeScript / HTTP+Axios / Node+Express |
| Day 6-8 | LLM API / RAG 概念 / Agent 概念 |
| Day 9-10 | 后端 LLM 调用 + Vue 前端接入 |
| Day 11 | Streaming 流式输出（SSE + ReadableStream） |
| Day 12 | 多轮对话 Context |
| Day 13 | RAG 第一步：文档读取 + Chunk 切分 |
| Day 14 | RAG 第二步：Embedding 向量化 + 余弦相似度 |

## 后续规划

- [ ] RAG 检索接入 /api/chat，让 AI 基于知识库回答
- [ ] 向量数据库替换 JSON（Chroma / Milvus）
- [ ] 多用户 Session
- [ ] 前端 UI 优化
