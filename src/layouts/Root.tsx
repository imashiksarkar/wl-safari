import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <div className='app-body font-poppins'>
      <header>
        <h1>Header</h1>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  )
}

export default Root
