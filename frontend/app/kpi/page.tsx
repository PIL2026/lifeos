"use client"

import { useState, useEffect } from "react"

export default function KPIPage() {
  const [category, setCategory] = useState("")
  const [value, setValue] = useState("")
  const [kpis, setKpis] = useState<any[]>([])

  const fetchKpis = async () => {
    const res = await fetch("http://127.0.0.1:8000/kpis")
    const data = await res.json()
    setKpis(data.reverse())
  }

  useEffect(() => {
    fetchKpis()
  }, [])

  const saveKpi = async () => {
    await fetch(
      `http://127.0.0.1:8000/kpis?category=${category}&value=${value}`,
      { method: "POST" }
    )

    setCategory("")
    setValue("")
    fetchKpis()
  }

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <h1 className="text-cyan-400 text-2xl mb-4">KPI</h1>

      {kpis.map((kpi) => (
        <div key={kpi.id} className="bg-gray-900 p-3 rounded-xl mb-2">
          {kpi.category}: {kpi.value}
        </div>
      ))}

      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="カテゴリ"
        className="w-full bg-gray-900 p-3 rounded-xl"
      />

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="数値"
        className="w-full bg-gray-900 p-3 rounded-xl mt-2"
      />

      <button
        onClick={saveKpi}
        className="w-full bg-cyan-500 p-3 rounded-xl mt-2"
      >
        保存
      </button>
    </main>
  )
}