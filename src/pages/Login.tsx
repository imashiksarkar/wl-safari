import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthProvider'
import { useToast } from '@/hooks/use-toast'
import { FormEventHandler } from 'react'
import { Link, Navigate } from 'react-router-dom'

const Login = () => {
  const { loginWithGoogle, user, loading, logIn } = useAuth()
  const { toast } = useToast()

  if (!loading && user) return <Navigate to={'/'} />

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const { email, password } = Object.fromEntries(
      new FormData(event.target as HTMLFormElement)
    ) as {
      email: string
      password: string
    }

    const isValidEmail = RegExp(
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'
    ).test(email)

    const isValidPassword = RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\\d!@#$%^&*(),.?":{}|<>]{6,}$'
    ).test(password)

    if (!isValidEmail || !isValidPassword)
      return toast({
        title: 'Invalid Credentials!',
        description: 'Email or Password is invalid.',
      })

    logIn(email, password).catch((error) => {
      return toast({
        title: 'Login Error!',
        description: error.message,
      })
    })
  }

  return (
    <section className={`login-page`}>
      <div className='con mt-12'>
        <form onSubmit={handleSubmit}>
          <Card className='mx-auto max-w-sm'>
            <CardHeader>
              <CardTitle className='text-2xl'>Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    name='email'
                    placeholder='m@example.com'
                    required
                    autoComplete='email'
                  />
                </div>
                <div className='grid gap-2'>
                  <div className='flex items-center'>
                    <Label htmlFor='password'>Password</Label>
                    <Button
                      variant={'link'}
                      className='ml-auto inline-block text-sm underline'
                    >
                      Forgot your password?
                    </Button>
                  </div>
                  <Input
                    id='password'
                    type='password'
                    name='password'
                    required
                    placeholder='Type your password.'
                    autoComplete='current-password'
                  />
                </div>
                <Button type='submit' className='w-full'>
                  Login
                </Button>
                <Button
                  variant='outline'
                  className='w-full'
                  onClick={loginWithGoogle}
                >
                  Login with Google
                </Button>
              </div>
              <div className='mt-4 text-center text-sm'>
                Don&apos;t have an account?
                <Link to='/auth/signup' className='underline'>
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </section>
  )
}

export default Login
