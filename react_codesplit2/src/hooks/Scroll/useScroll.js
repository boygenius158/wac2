import axios from "axios"
import React, { useEffect, useState, useRef } from "react"
import { useInView } from "react-intersection-observer"

const useScroll = () => {
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.5,
  })
  const fetchPosts = async () => {
    if (loading) return
    setLoading(true)
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
    setPosts((prevPosts) => [...prevPosts, ...data])
    setHasMore(data.length > 0)
    setLoading(false)
  }


  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1)
    }
  }, [hasMore, inView, loading])

  useEffect(() => {
    fetchPosts()
  }, [page])

  return {
    posts, loading, hasMore, ref
  }
}

export default useScroll
