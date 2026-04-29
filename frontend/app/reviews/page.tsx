"use client"

import { useState, useEffect } from "react"

export default function ReviewsPage() {
  const [text, setText] = useState("")
  const [reviews, setReviews] = useState<any[]>([])

  const fetchReviews = async () => {
    const res = await fetch("http://127.0.0.1:8000/reviews")
    const data = await res.json()
    setReviews(data.reverse())
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  const saveReview = async () => {
    await fetch(
      `http://127.0.0.1:8000/reviews?period=weekly&content=${text}`,
      { method: "POST" }
    )

    setText("")
    fetchReviews()
  }

  return (
    <main className="min-h-screen bg-black text-white p-4">
      <h1 className="text-cyan-400 text-2xl mb-4">Reviews</h1>

      {reviews.map((review) => (
        <div key={review.id} className="bg-gray-900 p-3 rounded-xl mb-2">
          {review.content}
        </div>
      ))}

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-gray-900 p-3 rounded-xl"
      />

      <button
        onClick={saveReview}
        className="w-full bg-cyan-500 p-3 rounded-xl mt-2"
      >
        保存
      </button>
    </main>
  )
}