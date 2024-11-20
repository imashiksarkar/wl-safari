import BlogCarousel from '@/components/BlogCarousel'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useId } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Link, useLoaderData } from 'react-router-dom'

const Home = () => {
  const blogs = useLoaderData() as Awaited<ReturnType<typeof loader>>

  return (
    <section className='home-page h-full'>
      <div className='max-w-[1600px] mx-auto'>
        <BlogCarousel />
      </div>

      {/* Adventure Experiences */}
      <div className='con my-12'>
        <header className='text-center py-4 flex justify-center'>
          <h1 className={`text-2xl font-semibold w-max`}>
            Adventure Experiences
          </h1>
        </header>

        <div className='cards grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-5 justify-items-center mt-4'>
          {blogs.map(
            ({
              id,
              adventureTitle,
              image,
              shortDescription,
              ecoFriendlyFeatures,
            }) => (
              <Card key={id} className='max-w-[350px] flex flex-col'>
                <CardHeader>
                  <img
                    src={image}
                    alt={adventureTitle}
                    className='rounded aspect-[5/3] object-cover w-full'
                  />
                  <CardTitle className='pt-4'>{adventureTitle}</CardTitle>
                </CardHeader>
                <CardContent className='grow'>
                  <p>{shortDescription}</p>

                  <div className='mt-4'>
                    <p>Eco Friendly Features</p>
                    <ul className='ms-8 list-disc'>
                      {ecoFriendlyFeatures.map((feature) => (
                        <li key={`${id}${useId()}`}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className='group'>
                    <Link to={`/blogs/${id}`}>
                      <span>Explore Now</span>
                      <FaArrowRight className='ms-2 -translate-x-2 group-hover:translate-x-0 transition' />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          )}
        </div>
      </div>
    </section>
  )
}

interface Blog {
  id: number
  adventureTitle: string
  image: string
  categoryName: string
  shortDescription: string
  adventureCost: number
  bookingAvailability: boolean
  location: string
  duration: string
  adventureLevel: string
  includedItems: string[]
  ecoFriendlyFeatures: string[]
  maxGroupSize: number
  specialInstructions: string[]
}

export const loader = async () => {
  const res = await fetch('/data/blogs.json')

  return (await res.json()) as Blog[]
}

export default Home
