import '../styles/global.css'; // Import once globally

export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <body>{children}</body>
    </html>
  )
}
