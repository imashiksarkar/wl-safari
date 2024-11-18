import { ThemeProvider } from '@/contexts/ThemeProvider'
import './App.css'
import Routes from './routes'

function App() {
  return (
    <ThemeProvider defaultTheme='system' storageKey='ui-theme'>
      <Routes />
    </ThemeProvider>
  )
}

export default App
