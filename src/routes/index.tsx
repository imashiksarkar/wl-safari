import NotFound from '@/components/NotFound'
import PrivateRoute from '@/components/PrivateRoute'
import AuthProvider from '@/contexts/AuthProvider'
import Root from '@/layouts/Root'
import BlogDetails, { loader as blogDetailsLoader } from '@/pages/BlogDetails'
import Blogs, { loader as blogsLoader } from '@/pages/Blogs'
import Home, { loader as homeLoader } from '@/pages/Home'
import Login from '@/pages/Login'
import Profile from '@/pages/Profile'
import ResetPassword from '@/pages/ResetPassword'
import Signup from '@/pages/Signup'
import UpdateProfile from '@/pages/UpdateProfile'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

const rootRouter = createBrowserRouter(
  [
    {
      path: '/',
      element: <Root />,
      errorElement: <NotFound />,
      children: [
        {
          path: '/',
          element: <Home />,
          loader: homeLoader,
        },
        {
          path: '/blogs',
          element: <Blogs />,
          loader: blogsLoader,
        },
        {
          path: '/blogs/:blogId',
          loader: blogDetailsLoader,
          element: (
            <PrivateRoute>
              <BlogDetails />
            </PrivateRoute>
          ),
        },
        {
          path: '/auth',
          children: [
            {
              path: '/auth',
              element: <Navigate to={'/auth/login'} />,
            },
            {
              path: '/auth/login',
              element: <Login />,
            },
            {
              path: '/auth/signup',
              element: <Signup />,
            },
            {
              path: '/auth/reset-password',
              element: <ResetPassword />,
            },
          ],
        },
        {
          path: '/profile',
          element: (
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          ),
        },
        {
          path: '/profile/edit',
          element: (
            <PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
          ),
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    } as any, // Bypass TypeScript errors temporarily
  }
)

const Routes = () => {
  return (
    <AuthProvider>
      <RouterProvider router={rootRouter} />
    </AuthProvider>
  )
}

export default Routes
