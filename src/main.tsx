import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Header from './common/header.tsx'
import Sidebar from './common/sidebar.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <body className='w-dvw h-dvh flex'>
      <Sidebar />
      <main className='flex flex-col w-full h-full'>
        <Header />
        <div className="p-3 bg-neutral-100 h-full">
          <App />
        </div>
      </main>
    </body>
  </StrictMode>,
)
