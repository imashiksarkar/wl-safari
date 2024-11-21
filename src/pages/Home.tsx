import 'animate.css'

import BlogCarousel from '@/components/BlogCarousel'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { FormEventHandler, useId } from 'react'
import { Helmet } from 'react-helmet'
import { FaArrowRight } from 'react-icons/fa'
import { Link, useLoaderData } from 'react-router-dom'

const Home = () => {
  const { blogs, popularDestinations } = useLoaderData() as Awaited<
    ReturnType<typeof loader>
  >

  const { toast } = useToast()

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const { fullName, email, message } = Object.fromEntries(
      new FormData(event.target as HTMLFormElement)
    ) as {
      fullName?: string
      email?: string
      message?: string
    }

    if (!fullName?.trim() || !email?.trim() || !message?.trim()) {
      return toast({
        title: 'Invalid Form Data!',
        description: `Fill the form correctly.`,
      })
    }

    toast({
      title: 'Scheduled: Catch up',
      description: `We will contact you via "${email}".`,
    })
  }

  return (
    <section className='home-page h-full'>
      <Helmet>
        <title>WL| Home </title>
      </Helmet>

      <div className='max-w-[1600px] mx-auto'>
        <BlogCarousel />
      </div>

      {/* Adventure Experiences */}
      <div className='con mt-12'>
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
              <Card
                key={id}
                className='max-w-[350px] flex flex-col animate__animated animate__bounce'
              >
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

      {/* Most Popular Destinations */}
      <div className='con mt-16'>
        <header>
          <h1 className='text-2xl font-semibold text-center'>
            Most Popular Destinations
          </h1>
        </header>

        <div className='destinations grid gap-4 mt-6 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] justify-items-center'>
          {popularDestinations.map(({ id, name, image, num_tours }) => (
            <DestinationCard
              key={id}
              id={id}
              name={name}
              image={image}
              num_tours={num_tours}
            />
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className='con mt-12' id='contact'>
        <header>
          <h1 className='text-center text-2xl font-semibold'>Contact Us</h1>
        </header>

        <div className='contact-wrapper grid grid-cols-1 lg:grid-cols-2 mt-6'>
          <div className='banner w-full h-full max-h-96 hidden lg:block'>
            <img
              src='https://images.pexels.com/photos/23656180/pexels-photo-23656180/free-photo-of-aerial-view-of-tourists-paddling-in-the-sea.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
              alt='banner'
              className='w-full h-full object-cover'
            />
          </div>

          <div className='form bg-slate-300 dark:bg-slate-900 p-8'>
            <form
              className='h-full grid grid-cols-1 lg:grid-cols-2 gap-4 grid-rows-[auto_1fr_auto]'
              onSubmit={handleFormSubmit}
            >
              <Input name='fullName' type='text' placeholder='Full Name' />
              <Input name='email' type='email' placeholder='Your Email' />
              <Textarea
                rows={5}
                name='message'
                className='lg:col-span-2 h-full'
                placeholder='Write your message...'
              />
              <Button type='submit' className='lg:col-span-2'>
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

const DestinationCard = ({ name, image, num_tours }: Destination) => {
  return (
    <div className='destinations__item flex flex-col items-center p-4 max-w-80 animate__animated animate__bounce'>
      <figure className='aspect-[3/5] w-full rounded-full overflow-hidden border-4'>
        <img src={image} alt={name} className='w-full h-full object-cover' />
      </figure>

      <Badge variant='secondary' className='-mt-4 text-sm'>
        {num_tours} Tour
      </Badge>

      <h2 className='text-2xl font-medium mt-4 text-slate-800 dark:text-slate-200 text-center'>
        {name}
      </h2>
    </div>
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

interface Destination {
  id: number
  name: string
  image: string
  num_tours: number
}

export const loader = async () => {
  const blogRes = await fetch('/data/blogs.json')
  const destinationsRes = await fetch('/data/popular_destinations.json')

  return {
    blogs: (await blogRes.json()) as Blog[],
    popularDestinations: (await destinationsRes.json()) as Destination[],
  }
}

export default Home
