"use client"

import { useEffect, useState } from "react"

export default function HistoryPage() {
  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => {
    fetchLogs()
  }, [])

  const fetchLogs = async () => {
    const res = await fetch("http://127.0.0.1:8000/structured-logs")
    const data = await res.json()
    setLogs(data.reverse())
  }

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <h1 className="text-cyan-400 text-2xl mb-4">
        Calendar History
      </h1>

      {logs.map((log) => (
        <div key={log.id} className="bg-gray-900 p-4 rounded-xl mb-3">
          <p className="text-cyan-400">{log.final_category}</p>
          <p>{log.raw_content}</p>
          <p className="text-sm text-gray-400">{log.memo}</p>
          <p className="text-xs text-gray-500 mt-2">
            {log.created_at}
          </p>
        </div>
      ))}
    </main>
  )
}