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
    try {
      const res = await fetch(`${API_URL}/raw-logs`)
      const data = await res.json()
      setLogs(data.reverse())
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  const saveTemplate = async (value: string) => {
    try {
      await fetch(
        `${API_URL}/raw-log?content=${encodeURIComponent(
          value
        )}&category=テンプレ`,
        {
          method: "POST",
        }
      )
      fetchLogs()
    } catch (err) {
      console.log(err)
    }
  }

  const saveLog = async () => {
    if (!text) return

    try {
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
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <h1 className="text-2xl font-bold text-cyan-400 mb-6">
        LifeOS Mobile
      </h1>

      {/* テンプレボタン */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => saveTemplate("出勤")}
          className="bg-cyan-500 p-3 rounded-xl"
        >
          出勤
        </button>

        <button
          onClick={() => saveTemplate("帰宅")}
          className="bg-cyan-500 p-3 rounded-xl"
        >
          帰宅
        </button>

        <button
          onClick={() => saveTemplate("胸トレ")}
          className="bg-cyan-500 p-3 rounded-xl"
        >
          胸トレ
        </button>

        <button
          onClick={() => saveTemplate("PIL作業")}
          className="bg-cyan-500 p-3 rounded-xl"
        >
          PIL作業
        </button>
      </div>

      {/* 手入力 */}
      <div className="mb-6">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="何した？"
          className="w-full p-3 rounded text-black mb-3"
        />

        <button
          onClick={saveLog}
          className="w-full bg-green-500 p-3 rounded-xl"
        >
          保存
        </button>
      </div>

      {/* 履歴 */}
      <div>
        <h2 className="text-xl mb-3 text-cyan-400">
          今日の履歴
        </h2>

        {logs.length === 0 ? (
          <p className="text-gray-400">まだ記録なし</p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="border border-cyan-500 rounded p-3 mb-2"
            >
              <p>{log.content}</p>
              <p className="text-sm text-gray-400">
                {log.category}
              </p>
            </div>
          ))
        )}
      </div>
    </main>
  )
}