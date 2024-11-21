import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className='not-found'>
      <Helmet>
        <title>404| Not Found </title>
      </Helmet>
      <div className='con flex items-center justify-center h-dvh'>
        <h1>404 Page Not Found!</h1>
        <Link to='/'>Go To Home</Link>
      </div>
    </section>
  )
}

export default NotFound
