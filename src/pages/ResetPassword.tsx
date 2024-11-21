import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Helmet } from 'react-helmet'

const ResetPassword = () => {
  return (
    <section className='resetPassword-page'>
      <Helmet>
        <title>WL| Reset Password </title>
      </Helmet>
      <div className='con mt-12'>
        <form>
          <Card className='mx-auto max-w-sm'>
            <CardHeader>
              <CardTitle className='text-2xl'>Reset Password</CardTitle>
              <CardDescription>
                Reset your password to a new one.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                id='password'
                type='password'
                required
                placeholder='Type new password.'
                autoComplete='current-password'
              />
              <Button type='submit' className='w-full mt-4'>
                Reset
              </Button>
            </CardContent>
          </Card>
        </form>
      </div>
    </section>
  )
}

export default ResetPassword
