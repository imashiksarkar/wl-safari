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
import { FormEventHandler, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, Navigate } from 'react-router-dom'

const Signup = () => {
  const [isLoadingSignUp, setIsLoadingSignUp] = useState(false)

  const { toast } = useToast()
  const { signUp, user, loading } = useAuth()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const { email, password, fullName, photoUrl } = Object.fromEntries(
      new FormData(event.target as HTMLFormElement)
    ) as {
      fullName: string
      photoUrl: string
      email: string
      password: string
    }

    const isValidFullName = fullName.trim().length > 2
    const isValidPhotoUrl = photoUrl.trim().length > 2

    const isValidEmail = RegExp(
      '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$'
    ).test(email)

    const isValidPassword = RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\\d!@#$%^&*(),.?":{}|<>]{6,}$'
    ).test(password)

    if (
      !isValidEmail ||
      !isValidPassword ||
      !isValidFullName ||
      !isValidPhotoUrl
    ) {
      return toast({
        title: 'Invalid Credentials!',
        description: 'You provided invalid data.',
      })
    }

    setIsLoadingSignUp(true)
    signUp(fullName, photoUrl, email, password)
      .catch((error) => {
        return toast({
          title: 'Login signing up!',
          description: error.message,
        })
      })
      .finally(() => setIsLoadingSignUp(false))
  }

  if (!loading && user) return <Navigate to='/' />

  return (
    <section className='signup-page'>
      <Helmet>
        <title>WL| Sign Up </title>
      </Helmet>
      <div className='con mt-12'>
        <form onSubmit={handleSubmit}>
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
                    name='fullName'
                    placeholder='Alex Smith'
                    required
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='photoUrl'>Photo Url</Label>
                  <Input
                    id='photoUrl'
                    type='text'
                    name='photoUrl'
                    placeholder='https://photo.com/z.png'
                    required
                  />
                </div>
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
                  <Label htmlFor='password'>Password</Label>

                  <Input
                    id='password'
                    type='password'
                    required
                    name='password'
                    placeholder='Type your password.'
                    autoComplete='current-password'
                  />
                </div>
                <Button type='submit' className='w-full'>
                  {isLoadingSignUp ? 'Loading...' : 'Signup'}
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
