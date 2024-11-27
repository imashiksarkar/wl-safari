import auth from '@/lib/firebase'
import {
  type User,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  UserCredential,
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
  loginWithGoogle: () => Promise<UserCredential>
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
  editProfile: (data: {
    displayName?: string | null
    photoURL?: string | null
  }) => void
}

const provider = new GoogleAuthProvider()

const AuthProviderContext = createContext({} as AuthProviderState)

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<null | User>(null)
  const [isProfileUpdate, setIsProfileUpdate] = useState(0)

  const loginWithGoogle = () => {
    setLoading(true)
    return signInWithPopup(auth, provider)
  }
  const signUp: AuthProviderState['signUp'] = (
    fullName,
    photoUrl,
    email,
    password
  ) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      (cred) => {
        updateProfile(cred.user, {
          displayName: fullName,
          photoURL: photoUrl,
        }).then(() => setIsProfileUpdate(Math.random()))

        return cred
      }
    )
  }

  const logIn: AuthProviderState['logIn'] = (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

  const logOut = () => {
    signOut(auth)
  }

  const resetPassword = (email: string) => {
    sendPasswordResetEmail(auth, email, { url: 'http://localhost:5173' })
  }

  const editProfile: AuthProviderState['editProfile'] = (payload) => {
    if (user) {
      updateProfile(user, payload).then(() => {
        setIsProfileUpdate(Math.random())
      })
    }
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user = null) => {
      setUser(user)
      setLoading(false)
    })

    return unSubscribe
  }, [isProfileUpdate])

  const value: AuthProviderState = {
    loading,
    user,
    loginWithGoogle,
    signUp,
    logIn,
    logOut,
    resetPassword,
    editProfile,
  }

  return (
    <AuthProviderContext.Provider value={value}>
      {children}
    </AuthProviderContext.Provider>
  )
}

export const useAuth = () => useContext(AuthProviderContext)

export default AuthProvider
