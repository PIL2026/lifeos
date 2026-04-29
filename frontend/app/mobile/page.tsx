"use client"

import { useEffect, useState } from "react"

type Log = {
  id: number
  content: string
  category: string
}

export default function MobilePage() {
  const [text, setText] = useState("")
  const [logs, setLogs] = useState<Log[]>([])

  const API_URL = "https://lifeos-u2t0.onrender.com"

  const fetchLogs = async () => {
    const res = await fetch(`${API_URL}/raw-logs`)
    const data = await res.json()
    setLogs(data.reverse())
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  const saveTemplate = async (value: string) => {
    await fetch(
      `${API_URL}/raw-log?content=${encodeURIComponent(
        value
      )}&category=テンプレ`,
      {
        method: "POST",
      }
    )
    fetchLogs()
  }

  const saveLog = async () => {
    if (!text) return

    await fetch(
      `${API_URL}/raw-log?content=${encodeURIComponent(
        text
      )}&category=手入力`,
      {
        method: "POST",
      }
    )

    setText("")
    fetchLogs()
  }

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl text-cyan-400 font-bold mb-4">
        LifeOS Mobile
      </h1>

      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => saveTemplate("出勤")}
          className="bg-cyan-500 px-4 py-2 rounded"
        >
          出勤
        </button>

        <button
          onClick={() => saveTemplate("帰宅")}
          className="bg-cyan-500 px-4 py-2 rounded"
        >
          帰宅
        </button>

        <button
          onClick={() => saveTemplate("胸トレ")}
          className="bg-cyan-500 px-4 py-2 rounded"
        >
          胸トレ
        </button>
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="何した？"
        className="w-full p-2 text-black rounded mb-2"
      />

      <button
        onClick={saveLog}
        className="w-full bg-cyan-500 p-2 rounded mb-6"
      >
        保存
      </button>

      <div>
        <h2 className="text-xl mb-2">履歴</h2>

        {logs.map((log) => (
          <div
            key={log.id}
            className="border border-cyan-500 p-2 mb-2 rounded"
          >
            {log.content} ({log.category})
          </div>
        ))}
      </div>
    </main>
  )
}