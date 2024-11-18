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
      <Button onClick={handleThemeToggle}>Toggle Theme</Button>
    </div>
  )
}

export default Home
