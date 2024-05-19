import './globals.css'
import { App } from './App'

export const metadata = {
  title: 'Pindie',
  description: 'Портал инди-игр для студентов Яндекс Практикума',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <App>{children}</App>
      </body>
    </html>
  )
}