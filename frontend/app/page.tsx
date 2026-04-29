import Link from "next/link"

export default function Home() {
  const pages = [
    { name: "Mobile", path: "/mobile" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "History", path: "/history" },
    { name: "Goals", path: "/goals" },
    { name: "Reviews", path: "/reviews" },
    { name: "KPI", path: "/kpi" },
    { name: "Backup", path: "/backup" },
  ]

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-4xl text-cyan-400 font-bold mb-8">
        LifeOS Core
      </h1>

      <div className="grid grid-cols-2 gap-4">
        {pages.map((page) => (
          <Link
            key={page.path}
            href={page.path}
            className="bg-gray-900 p-6 rounded-2xl border border-cyan-500 hover:bg-gray-800"
          >
            {page.name}
          </Link>
        ))}
      </div>
    </main>
  )
}