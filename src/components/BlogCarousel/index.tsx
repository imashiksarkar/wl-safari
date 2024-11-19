import { useRef } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const BlogCarousel = () => {
  const swiperRef = useRef(null as any)

  const handleSwipe = (direction: 'next' | 'prev') => {
    if (direction === 'prev') swiperRef?.current?.slidePrev()
    else if (direction === 'next') swiperRef?.current?.slideNext()
  }

  return (
    <div className='swiper-container relative w-full'>
      <button
        onClick={() => handleSwipe('prev')}
        className='absolute top-1/2 left-0 z-10 -translate-y-1/2 bg-slate-950/15 h-full hover:bg-slate-950/20 transition-all'
      >
        <IoIosArrowBack className='text-4xl' />
      </button>
      <Swiper
        loop
        navigation
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        className='cursor-pointer w-full aspect-[10/5] sm:aspect-[10/4] md:aspect-[10/3]'
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <img
            className='w-full h-full object-cover'
            src='https://images.pexels.com/photos/16066/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            alt=''
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className='w-full h-full object-cover'
            src='https://images.pexels.com/photos/704320/pexels-photo-704320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            alt=''
          />
        </SwiperSlide>
      </Swiper>
      <button
        onClick={() => handleSwipe('next')}
        className='absolute top-1/2 right-0 z-10 -translate-y-1/2 bg-slate-950/15 h-full hover:bg-slate-950/20 transition-all'
      >
        <IoIosArrowForward className='text-4xl' />
      </button>
    </div>
  )
}

export default BlogCarousel
