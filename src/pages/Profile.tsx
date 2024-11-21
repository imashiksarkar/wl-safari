import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthProvider'
import { msToRelativeTime } from '@/lib/utils'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const Profile = () => {
  const { user } = useAuth()

  //@ts-ignore
  const createdAt = user?.metadata.createdAt

  return (
    <section className='profile-page'>
      <div className='con py-8'>
        <h4 className='text-3xl'>
          Welcome, <span className='text-red-400'>{user?.displayName}</span>
        </h4>
        <div className='profile-card mt-8 flex flex-col sm:flex-row p-4 gap-8 justify-center items-start'>
          <figure className='dp h-44 aspect-square'>
            <img
              src={user?.photoURL || ''}
              alt='display picture'
              className='h-full w-full object-cover'
            />
          </figure>

          <div className='details flex flex-col gap-2'>
            <p>Email: {user?.email}</p>
            <p>Email Verified: {user?.emailVerified ? 'Yes' : 'No'}</p>
            <p>Logged In Using: {user?.providerData[0].providerId}</p>
            <p>Joined: {msToRelativeTime(createdAt)}</p>
            <Button asChild className='w-max'>
              <Link to='/profile/edit'>Update Profile</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile
