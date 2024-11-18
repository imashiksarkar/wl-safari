import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/ThemeProvider'

const Home = () => {
  const { theme, setTheme } = useTheme()

  const handleThemeToggle = () => {
    console.log('toggle theme')

    setTheme(theme !== 'dark' ? 'dark' : 'light')
  }

  return (
    <div>
      <h1>Vite + React</h1>
      <div className='card'>
        <Button onClick={handleThemeToggle}>Toggle Theme</Button>
      </div>
    </div>
  )
}

export default Home
