import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const msToRelativeTime = (timestamp: number) => {
  const now = Date.now() // Current timestamp in milliseconds
  const diff = now - timestamp // Difference in milliseconds

  // Define time intervals in milliseconds
  const intervals = {
    year: 365 * 24 * 60 * 60 * 1000, // Approximate year
    month: (365 / 12) * 24 * 60 * 60 * 1000, // Approximate month
    week: 7 * 24 * 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  }

  // Iterate through intervals to find the largest fitting unit
  for (const [unit, value] of Object.entries(intervals)) {
    const time = Math.floor(diff / value)
    if (time > 0) {
      return `${time} ${unit}${time > 1 ? 's' : ''} ago`
    }
  }

  return 'just now' // If no time has passed
}
