import NotFound from '@/components/NotFound'
import Root from '@/layouts/Root'
import Home, { loader as homeLoader } from '@/pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

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
          element: 'Auth Page Layout.',
          children: [
            {
              path: '/auth/login',
              element: 'Login Page.',
            },
            {
              path: '/auth/register',
              element: 'Register Page.',
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
  return <RouterProvider router={rootRouter} />
}

export default Routes
