import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import useSWRInfinite from 'swr/infinite'
import axios from 'axios'

const fetcher = async (url) => {
  const { data } = await axios.get(url)
  if (!data) {
    throw new Error("Network error")
  }
  return data
}

export default function SWRInfiniteScroll() {
  const [finished, setFinished] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.5, // This will trigger when the bottom is 50% visible.
    rootMargin: '0px', // Ensures that when it's near the viewport, it triggers
  })

  // This function determines the URL based on the page number.
  const getKey = (pageIndex, previousPageData) => {
    // If no more data, stop fetching
    if (previousPageData && previousPageData.length === 0) {
      setFinished(true) // Mark as finished if no data received
      return null
    }
    
    // Calculate the page number correctly. 
    // pageIndex is 0-based, but we want page 1, 2, 3, etc.
    const page = pageIndex + 1;
    return `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`
  }

  const { data, error, size, setSize, isValidating } = useSWRInfinite(getKey, fetcher)

  // Check when the element comes into view and trigger fetching more data
  useEffect(() => {
    if (inView && !isValidating && !finished) {
      setSize((prevSize) => prevSize + 1)
    }
  }, [inView, isValidating, finished, setSize])

  const posts = data?.flat()

  if (error) return <div>Failed to load posts</div>

  return (
    <div>
      <ul>
        {posts?.map((ele, index) => (
          <li key={index}>{ele.title}</li>
        ))}
      </ul>
      
      {isValidating && !finished && <div>Loading...</div>} {/* Loading spinner */}
      {finished && <div>No more posts</div>} {/* No more posts */}
      {/* Scroll trigger element at the bottom */}
      {!finished && <div ref={ref}></div>} 
    </div>
  )
}
