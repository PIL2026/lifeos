"use client"

import { useState, useEffect } from "react"

export default function GoalsPage() {
  const [text, setText] = useState("")
  const [progress, setProgress] = useState("")
  const [goals, setGoals] = useState<any[]>([])

  const fetchGoals = async () => {
    const res = await fetch("http://127.0.0.1:8000/goals")
    const data = await res.json()
    setGoals(data.reverse())
  }

  useEffect(() => {
    fetchGoals()
  }, [])

  const saveGoal = async () => {
    await fetch(
      `http://127.0.0.1:8000/goals?content=${text}&progress=${progress}`,
      { method: "POST" }
    )

    setText("")
    setProgress("")
    fetchGoals()
  }

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <h1 className="text-cyan-400 text-2xl mb-4">Goals</h1>

      {goals.map((goal) => (
        <div key={goal.id} className="bg-gray-900 p-3 rounded-xl mb-2">
          {goal.content} ({goal.progress}%)
        </div>
      ))}

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="目標"
        className="w-full bg-gray-900 p-3 rounded-xl mt-4"
      />

      <input
        value={progress}
        onChange={(e) => setProgress(e.target.value)}
        placeholder="進捗%"
        className="w-full bg-gray-900 p-3 rounded-xl mt-2"
      />

      <button
        onClick={saveGoal}
        className="w-full bg-cyan-500 p-3 rounded-xl mt-2"
      >
        保存
      </button>
    </main>
  )
}