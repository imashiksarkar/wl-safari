import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthProvider'
import { Label } from '@radix-ui/react-label'
import { FormEventHandler } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'

const UpdateProfile = () => {
  const { editProfile } = useAuth()
  const navigate = useNavigate()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()

    const formData = Object.fromEntries(
      new FormData(event.target as HTMLFormElement)
    ) as {
      fullName: string
      photoUrl: string
    }

    const payload: {
      displayName?: string | null
      photoURL?: string | null
    } = {}

    if (formData.fullName.trim().length > 2)
      payload.displayName = formData.fullName
    if (formData.photoUrl.trim().length > 4)
      payload.photoURL = formData.photoUrl

    editProfile(payload)

    navigate('/profile')
  }

  return (
    <section className='update-profile-page'>
      <Helmet>
        <title>WL| Update Profile </title>
      </Helmet>
      <div className='con mt-12'>
        <form onSubmit={handleSubmit}>
          <Card className='mx-auto max-w-sm'>
            <CardHeader>
              <CardTitle className='text-2xl'>Update Profile</CardTitle>
              <CardDescription>Change your profile data.</CardDescription>
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
                    autoComplete='name'
                  />
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='photoUrl'>Photo Url</Label>
                  <Input
                    id='photoUrl'
                    type='text'
                    name='photoUrl'
                    placeholder='https://photos.com/bird.png'
                  />
                </div>

                <Button type='submit' className='w-full'>
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </section>
  )
}

export default UpdateProfile
