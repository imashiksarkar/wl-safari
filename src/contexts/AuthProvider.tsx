import auth from '@/lib/firebase'
import {
  type User,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'

type AuthProviderState = {
  loading: boolean
  user: User | null
  loginWithGoogle: () => void
  signUp: (
    fullName: string,
    photoUrl: string,
    email: string,
    password: string
  ) => ReturnType<typeof createUserWithEmailAndPassword>
  logIn: (
    email: string,
    password: string
  ) => ReturnType<typeof signInWithEmailAndPassword>
  logOut: () => void
  resetPassword: (email: string) => void
}

const provider = new GoogleAuthProvider()

const AuthProviderContext = createContext({} as AuthProviderState)

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<null | User>(null)
  const [profileUpdate, setProfileUpdate] = useState(false)

  const loginWithGoogle = () => {
    setLoading(true)
    signInWithPopup(auth, provider)
  }
  const signUp: AuthProviderState['signUp'] = (
    fullName,
    photoUrl,
    email,
    password
  ) =>
    createUserWithEmailAndPassword(auth, email, password).then((cred) => {
      updateProfile(cred.user, {
        displayName: fullName,
        photoURL: photoUrl,
      }).then(() => setProfileUpdate(true))
      return cred
    })

  const logIn: AuthProviderState['logIn'] = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

  const logOut = () => {
    signOut(auth)
  }

  const resetPassword = (email: string) => {
    sendPasswordResetEmail(auth, email, { url: 'http://localhost:5173' })
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user = null) => {
      setUser(user)
      setLoading(false)
    })

    return unSubscribe
  }, [profileUpdate])

  const value: AuthProviderState = {
    loading,
    user,
    loginWithGoogle,
    signUp,
    logIn,
    logOut,
    resetPassword,
  }

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  )
}

export const useAuth = () => useContext(AuthProviderContext)

export default AuthProvider
