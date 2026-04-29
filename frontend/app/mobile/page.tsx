"use client"

import { useEffect, useState } from "react"

type Log = {
  id: number
  content: string
  category: string
}

export default function MobilePage() {
  const API_URL = "https://lifeos-u2t0.onrender.com"

  const [text, setText] = useState("")
  const [logs, setLogs] = useState<Log[]>([])

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
      `${API_URL}/raw-log?content=${encodeURIComponent(value)}&category=テンプレ`,
      { method: "POST" }
    )
    fetchLogs()
  }

  const saveLog = async () => {
    if (!text.trim()) return

    await fetch(
      `${API_URL}/raw-log?content=${encodeURIComponent(text)}&category=手入力`,
      { method: "POST" }
    )

    setText("")
    fetchLogs()
  }

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold text-cyan-400 mb-2">
        LifeOS
      </h1>

      <p className="text-gray-400 mb-6">
        今日の行動をすぐ記録する画面
      </p>

      <section className="mb-6">
        <h2 className="text-lg font-bold mb-3">よく使う記録</h2>

        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => saveTemplate("出勤")} className="bg-cyan-500 p-4 rounded-xl">
            出勤
          </button>

          <button onClick={() => saveTemplate("退勤")} className="bg-cyan-500 p-4 rounded-xl">
            退勤
          </button>

          <button onClick={() => saveTemplate("帰宅")} className="bg-cyan-500 p-4 rounded-xl">
            帰宅
          </button>

          <button onClick={() => saveTemplate("就寝")} className="bg-cyan-500 p-4 rounded-xl">
            就寝
          </button>

          <button onClick={() => saveTemplate("起床")} className="bg-cyan-500 p-4 rounded-xl">
            起床
          </button>

          <button onClick={() => saveTemplate("PIL作業")} className="bg-cyan-500 p-4 rounded-xl">
            PIL作業
          </button>

          <button onClick={() => saveTemplate("筋トレ")} className="bg-cyan-500 p-4 rounded-xl">
            筋トレ
          </button>

          <button onClick={() => saveTemplate("買い物")} className="bg-cyan-500 p-4 rounded-xl">
            買い物
          </button>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-bold mb-3">自由入力</h2>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="例：コンビニでプロテイン 250円"
          className="w-full p-4 rounded-xl text-black mb-3"
        />

        <button
          onClick={saveLog}
          className="w-full bg-green-500 p-4 rounded-xl font-bold"
        >
          保存
        </button>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-3">最近の記録</h2>

        {logs.length === 0 ? (
          <p className="text-gray-400">まだ記録なし</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="border border-cyan-500 rounded-xl p-3 mb-2">
              <p>{log.content}</p>
              <p className="text-sm text-gray-400">{log.category}</p>
            </div>
          ))
        )}
      </section>
    </main>
  )
}