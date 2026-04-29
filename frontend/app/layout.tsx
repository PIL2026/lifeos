import "./globals.css"

export const metadata = {
  title: "LifeOS",
  description: "Personal Life Operating System",
  manifest: "/manifest.json"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}