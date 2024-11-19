import logo from '@/assets/logo.png'
import { Link, NavLink } from 'react-router-dom'
import { Switch } from '@/components/ui/switch'
import { useTheme } from '@/contexts/ThemeProvider'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { GiHamburgerMenu } from 'react-icons/gi'

const Navbar = () => {
  const { theme, setTheme } = useTheme()

  const handleThemeToggle = () => setTheme(theme !== 'dark' ? 'dark' : 'light')

  return (
    <section className='navbar'>
      <div className='con'>
        <nav className='py-4 flex items-center justify-between'>
          <figure className='logo'>
            <Link to='/'>
              <img src={logo} alt='logo' className='h-10' />
            </Link>
          </figure>

          <ul className='items-center gap-8 hidden sm:flex'>
            <li>
              <NavLink to='/' className='hover:underline'>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to='/blogs' className='hover:underline'>
                Blogs
              </NavLink>
            </li>
            <li>
              <NavLink to='/#contact' className='hover:underline'>
                Contact
              </NavLink>
            </li>
          </ul>

          <div className='theme-toggle flex items-center gap-4'>
            <HoverCard>
              <HoverCardTrigger className='cursor-pointer'>
                <Avatar>
                  <AvatarImage src='https://github.com/shadcn.png' />
                  <AvatarFallback>User</AvatarFallback>
                </Avatar>
              </HoverCardTrigger>
              <HoverCardContent className='me-0'>
                <ul className='flex flex-col gap-2'>
                  <li>
                    <Link to='/auth/login' className='hover:underline'>
                      Login/Register
                    </Link>
                  </li>
                  <li>
                    <Link to='/profile' className='hover:underline'>
                      Profile
                    </Link>
                  </li>
                </ul>

                <div className='flex items-center gap-8 mt-2'>
                  <span>Switch Theme</span>
                  <Switch
                    checked={theme === 'dark'}
                    onCheckedChange={handleThemeToggle}
                  />
                </div>
              </HoverCardContent>
            </HoverCard>

            <Sheet>
              <SheetTrigger className='sm:hidden'>
                <GiHamburgerMenu className='w-10 h-10 dark:hover:bg-slate-100/10 rounded-md transition-all hover:bg-slate-900/10 p-1 text-slate-700 dark:text-slate-400' />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader className='hidden'>
                  <SheetTitle>Phone Navigation Menu.</SheetTitle>
                  <SheetDescription>
                    Here's the navigation menu for small devices.
                  </SheetDescription>
                </SheetHeader>

                {/* Links Here. */}
                <ul className='flex flex-col items-center gap-2 mt-8'>
                  <li>
                    <NavLink to='/' className='hover:underline'>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/blogs' className='hover:underline'>
                      Blogs
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/#contact' className='hover:underline'>
                      Contact
                    </NavLink>
                  </li>
                </ul>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </section>
  )
}

export default Navbar