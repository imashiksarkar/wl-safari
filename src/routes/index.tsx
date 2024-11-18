import NotFound from '@/components/NotFound'
import Root from '@/layouts/Root'
import Home from '@/pages/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const rootRouter = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
])

const Routes = () => {
  return <RouterProvider router={rootRouter} />
}

export default Routes
