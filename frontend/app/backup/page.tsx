"use client"

export default function BackupPage() {
  const backup = async () => {
    await fetch(
      "http://127.0.0.1:8000/backup",
      {
        method: "POST"
      }
    )

    alert("backup complete")
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <button
        onClick={backup}
        className="bg-cyan-500 p-6 rounded-2xl"
      >
        Backup
      </button>
    </main>
  )
}