"use client"

import { useState, useEffect } from "react"

export default function MobilePage() {
  const [text, setText] = useState("")
  const [ideaText, setIdeaText] = useState("")
  const [taskText, setTaskText] = useState("")

  const [logs, setLogs] = useState<any[]>([])
  const [ideas, setIdeas] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])

  const [tab, setTab] = useState("record")

  const fetchLogs = async () => {
    const res = await fetch("http://127.0.0.1:8000/raw-logs")
    const data = await res.json()
    setLogs(data.reverse())
  }

  const fetchIdeas = async () => {
    const res = await fetch("http://127.0.0.1:8000/ideas")
    const data = await res.json()
    setIdeas(data.reverse())
  }

  const fetchTasks = async () => {
    const res = await fetch("http://127.0.0.1:8000/tasks")
    const data = await res.json()
    setTasks(data.reverse())
  }

  useEffect(() => {
    fetchLogs()
    fetchIdeas()
    fetchTasks()
  }, [])

  const saveLog = async () => {
    await fetch(
      `http://127.0.0.1:8000/raw-log?content=${text}&category=手入力`,
      {
        method: "POST"
      }
    )

    setText("")
    fetchLogs()
  }

  const saveTemplate = async (value: string) => {
    await fetch(
      `http://127.0.0.1:8000/raw-log?content=${value}&category=テンプレ`,
      {
        method: "POST"
      }
    )

    fetchLogs()
  }

  const saveIdea = async () => {
    await fetch(
      `http://127.0.0.1:8000/ideas?content=${ideaText}`,
      {
        method: "POST"
      }
    )

    setIdeaText("")
    fetchIdeas()
  }

  const saveTask = async () => {
    await fetch(
      `http://127.0.0.1:8000/tasks?content=${taskText}`,
      {
        method: "POST"
      }
    )

    setTaskText("")
    fetchTasks()
  }

  return (
    <main className="min-h-screen bg-black text-white flex flex-col">

      <div className="p-4 border-b border-cyan-500">
        <h1 className="text-xl font-bold text-cyan-400">
          LifeOS
        </h1>
      </div>

      {tab === "record" && (
        <>
          <div className="p-4 flex gap-2 overflow-x-auto">
            <button onClick={() => saveTemplate("出勤")} className="bg-cyan-500 px-3 py-2 rounded-xl">
              出勤
            </button>

            <button onClick={() => saveTemplate("帰宅")} className="bg-cyan-500 px-3 py-2 rounded-xl">
              帰宅
            </button>

            <button onClick={() => saveTemplate("胸トレ")} className="bg-cyan-500 px-3 py-2 rounded-xl">
              胸トレ
            </button>

            <button onClick={() => saveTemplate("PIL")} className="bg-cyan-500 px-3 py-2 rounded-xl">
              PIL
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className="bg-gray-900 p-3 rounded-xl mb-2"
              >
                {log.content}
              </div>
            ))}
          </div>

          <div className="p-4">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-gray-900 p-3 rounded-xl"
              placeholder="何した？"
            />

            <button
              onClick={saveLog}
              className="w-full bg-cyan-500 p-3 rounded-xl mt-2"
            >
              保存
            </button>
          </div>
        </>
      )}

      {tab === "idea" && (
        <>
          <div className="flex-1 overflow-y-auto p-4">
            {ideas.map((idea) => (
              <div
                key={idea.id}
                className="bg-gray-900 p-3 rounded-xl mb-2"
              >
                {idea.content}
              </div>
            ))}
          </div>

          <div className="p-4">
            <textarea
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              className="w-full bg-gray-900 p-3 rounded-xl"
              placeholder="アイデア"
            />

            <button
              onClick={saveIdea}
              className="w-full bg-cyan-500 p-3 rounded-xl mt-2"
            >
              保存
            </button>
          </div>
        </>
      )}

      {tab === "todo" && (
        <>
          <div className="flex-1 overflow-y-auto p-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-900 p-3 rounded-xl mb-2"
              >
                {task.content}
              </div>
            ))}
          </div>

          <div className="p-4">
            <input
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              className="w-full bg-gray-900 p-3 rounded-xl"
              placeholder="タスク追加"
            />

            <button
              onClick={saveTask}
              className="w-full bg-cyan-500 p-3 rounded-xl mt-2"
            >
              保存
            </button>
          </div>
        </>
      )}

      {tab === "calendar" && (
        <div className="flex-1 p-4">
          カレンダー（次で実装）
        </div>
      )}

      <div className="grid grid-cols-4 border-t border-cyan-500">
        <button onClick={() => setTab("record")} className="p-3">
          記録
        </button>

        <button onClick={() => setTab("calendar")} className="p-3">
          予定
        </button>

        <button onClick={() => setTab("todo")} className="p-3">
          ToDo
        </button>

        <button onClick={() => setTab("idea")} className="p-3">
          Ideas
        </button>
      </div>

    </main>
  )
}