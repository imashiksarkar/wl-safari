import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'

const BlogDetails = () => {
  const { blog } = useLoaderData() as Awaited<ReturnType<typeof loader>>

  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const hours = new Date().getHours()
  const withinMeetingTime = hours >= 10 && hours <= 19

  const handleOpenChange = (isOpen: boolean) => {
    setIsDialogOpen(isOpen)
  }

  const {
    image,
    adventureTitle,
    adventureCost,
    adventureLevel,
    bookingAvailability,
    categoryName,
    duration,
    ecoFriendlyFeatures,
    includedItems,
    location,
    maxGroupSize,
    shortDescription,
    specialInstructions,
  } = blog!

  return (
    <section>
      <div className='con mt-12'>
        <div className='blog-card flex flex-col'>
          <h1 className='text-4xl'>{adventureTitle}</h1>
          <figure className='banner w-full aspect-[4/1] overflow-hidden mt-4'>
            <img
              src={image}
              alt='banner'
              className='w-full h-full object-cover'
            />
          </figure>
          <div className='content mt-8'>
            <ul className='flex flex-col gap-4 [&>li>span]:text-slate-700 dark:[&>li>span]:text-slate-400'>
              <li>
                Short Description: <br /> <span>{shortDescription}</span>
              </li>
              <li>
                Adventure Level: <span>{adventureLevel}</span>
              </li>
              <li>
                Booking Availability:{' '}
                <span>{bookingAvailability ? 'Yes' : 'No'}</span>
              </li>
              <li>
                Adventure Cost: <span>${adventureCost}</span>
              </li>
              <li>
                Category Name: <span>{categoryName}</span>
              </li>
              <li>
                Duration: <span>{duration}</span>
              </li>
              <li>
                Eco-Friendly Features: <br />
                <span>
                  <ul className='list-disc ms-5'>
                    {ecoFriendlyFeatures.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </span>
              </li>
              <li>
                Included Items: <br />{' '}
                <span>
                  <ul className='list-disc ms-5'>
                    {includedItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </span>
              </li>
              <li>
                Location: <span>{location}</span>
              </li>
              <li>
                Max Group Size: <span>{maxGroupSize}</span>
              </li>
              <li>
                Special Instructions: <br />
                <span>
                  <ul className='list-disc ms-5'>
                    {specialInstructions.map((instruction) => (
                      <li key={instruction}>{instruction}</li>
                    ))}
                  </ul>
                </span>
              </li>
              <li>
                {withinMeetingTime ? (
                  <Button asChild>
                    <Link to='https://meet.google.com' target='_blank'>
                      Talk With Expert
                    </Link>
                  </Button>
                ) : (
                  <Button onClick={() => handleOpenChange(true)}>
                    Talk With Expert
                  </Button>
                )}
              </li>
            </ul>
          </div>
        </div>

        <AlertDialog open={isDialogOpen} onOpenChange={handleOpenChange}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Want to join meeting?</AlertDialogTitle>
              <AlertDialogDescription>
                Meeting time is between 10am to 8pm
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Close</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
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

export const loader = async ({ params }: any) => {
  const blogId = parseInt(params.blogId)

  const blogs = (await (await fetch('/data/blogs.json')).json()) as Blog[]
  const blog = blogs.find((b) => b.id === blogId) || null

  return {
    blog,
  }
}

export default BlogDetails
