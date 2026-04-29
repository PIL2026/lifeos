"use client"

import { useEffect, useState } from "react"

export default function DashboardPage() {
  const [logs, setLogs] = useState<any[]>([])
  const [selectedLog, setSelectedLog] = useState<any>(null)

  const [category, setCategory] = useState("")
  const [memo, setMemo] = useState("")

  const fetchLogs = async () => {
    const res = await fetch("http://127.0.0.1:8000/raw-logs")
    const data = await res.json()
    setLogs(data.reverse())
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  const archiveLog = async () => {
    await fetch(
      `http://127.0.0.1:8000/structured-log?raw_id=${selectedLog.id}&final_category=${category}&memo=${memo}`,
      {
        method: "POST"
      }
    )

    setSelectedLog(null)
    setCategory("")
    setMemo("")
    fetchLogs()
  }

  return (
    <main className="min-h-screen bg-black text-white grid grid-cols-2">

      <div className="border-r border-cyan-500 p-4 overflow-y-auto h-screen">
        <h1 className="text-cyan-400 text-xl font-bold mb-4">
          未整理ログ
        </h1>

        {logs.map((log) => (
          <div
            key={log.id}
            onClick={() => setSelectedLog(log)}
            className="bg-gray-900 p-3 rounded-xl mb-2 cursor-pointer"
          >
            {log.content}
          </div>
        ))}
      </div>

      <div className="p-4">
        <h1 className="text-cyan-400 text-xl font-bold mb-4">
          整理
        </h1>

        {selectedLog ? (
          <>
            <div className="bg-gray-900 p-3 rounded-xl mb-4">
              {selectedLog.content}
            </div>

            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-gray-900 p-3 rounded-xl mb-3"
              placeholder="カテゴリ"
            />

            <textarea
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="w-full bg-gray-900 p-3 rounded-xl mb-3"
              placeholder="詳細"
            />

            <button
              onClick={archiveLog}
              className="w-full bg-cyan-500 p-3 rounded-xl"
            >
              整理完了
            </button>
          </>
        ) : (
          <p>左から選択</p>
        )}
      </div>

    </main>
  )
}