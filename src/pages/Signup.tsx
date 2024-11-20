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

const Signup = () => {
  return (
    <section className='signup-page'>
      <div className='con mt-12'>
        <form>
          <Card className='mx-auto max-w-sm'>
            <CardHeader>
              <CardTitle className='text-2xl'>Signup</CardTitle>
              <CardDescription>
                Enter your email below to signup to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid gap-4'>
                <div className='grid gap-2'>
                  <Label htmlFor='fullName'>Full Name</Label>
                  <Input
                    id='fullName'
                    type='text'
                    placeholder='Alex Smith'
                    required
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='photoUrl'>Photo Url</Label>
                  <Input
                    id='photoUrl'
                    type='text'
                    placeholder='https://photo.com/z.png'
                    required
                  />
                </div>
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
                  <Label htmlFor='password'>Password</Label>

                  <Input
                    id='password'
                    type='password'
                    required
                    placeholder='Type your password.'
                    autoComplete='current-password'
                  />
                </div>
                <Button type='submit' className='w-full'>
                  Signup
                </Button>
              </div>
              <div className='mt-4 text-center text-sm'>
                Don&apos;t have an account?
                <Link to='/auth/login' className='underline'>
                  Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </section>
  )
}

export default Signup
