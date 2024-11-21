import { useAuth } from '@/contexts/AuthProvider'
import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { user, loading } = useAuth()

  if (!loading && !user) return <Navigate to='/' />

  return children
}

export default PrivateRoute
