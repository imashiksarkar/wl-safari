import Navbar from '@/components/Navbar'
import { Toaster } from '@/components/ui/toaster'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div className='app-body font-poppins flex flex-col h-dvh w-full relative'>
      <header className='bg-secondary'>
        <Navbar />
      </header>
      <main className='grow'>
        <Outlet />
      </main>
      <Toaster  />
      <footer className='bg-secondary'>
        <div className='con text-center py-2'>
          <p>Footer</p>
        </div>
      </footer>
    </div>
  )
}

export default Root
