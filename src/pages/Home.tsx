import BlogCarousel from '@/components/BlogCarousel'

const Home = () => {
  return (
    <section className='home-page h-full'>
      <div className='max-w-[1600px] mx-auto'>
        <BlogCarousel />
      </div>
      {/* <div className='h-96 w-full bg-red-400'></div>
      <div className='h-96 w-full bg-red-400'></div>
      <div className='h-96 w-full bg-red-400'></div>
      <div className='h-96 w-full bg-purple-400' id='contact'></div> */}
    </section>
  )
}

export default Home
