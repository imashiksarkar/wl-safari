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
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <section className='login-page'>
      <div className='con mt-12'>
        <form>
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
                    required
                    placeholder='Type your password.'
                    autoComplete='current-password'
                  />
                </div>
                <Button type='submit' className='w-full'>
                  Login
                </Button>
                <Button variant='outline' className='w-full'>
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
