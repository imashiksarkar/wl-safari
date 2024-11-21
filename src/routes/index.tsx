import NotFound from '@/components/NotFound'
import AuthProvider from '@/contexts/AuthProvider'
import Root from '@/layouts/Root'
import Home, { loader as homeLoader } from '@/pages/Home'
import Login from '@/pages/Login'
import ResetPassword from '@/pages/ResetPassword'
import Signup from '@/pages/Signup'
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
          element: 'Blogs List Page.',
        },
        {
          path: '/blogs/:blogId',
          element: 'Blogs Details.',
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
          element: 'My Profile Layout.',
          children: [
            {
              path: '/profile/',
              element: 'My Profile Layout.',
            },
            {
              path: '/profile/edit',
              element: 'Update My Profile.',
            },
          ],
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
