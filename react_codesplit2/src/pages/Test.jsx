import React from "react"
import useSWRInfinite from "swr/infinite"
import { useInView } from "react-intersection-observer"

const fetcher = (url) => fetch(url).then((res) => res.json())
const PAGE_SIZE = 10

export default function Posts() {
    const {
        data,
        size,
        setSize,
        isValidating,
    } = useSWRInfinite(
        (pageIndex) =>
            `https://jsonplaceholder.typicode.com/posts?_page=${pageIndex + 1
            }&_limit=${PAGE_SIZE}`,
        fetcher,
        { revalidateFirstPage: false, dedupingInterval: 1000 }
    )

    const posts = data ? [].concat(...data) : []
    const isLoadingMore = isValidating
    const isReachingEnd = data && data[data.length - 1]?.length < PAGE_SIZE

    // Using useInView's callback to fetch more data when in view
    const { ref: lastPostRef } = useInView({
        threshold: 0.5,
        onChange: (inView) => {
            if (inView && !isLoadingMore && !isReachingEnd) {
                setSize((size) => size + 1)
            }
        },
    })

    return (
        <div>
            <div>Pages Loaded: {size}</div>
            {posts.map((post, index) => {
                if (posts.length === index + 1) {
                    return (
                        <p key={post.id} ref={lastPostRef}>
                            {post.title}
                        </p>
                    )
                }
                return <p key={post.id}>{post.title}</p>
            })}
            {isLoadingMore && <div>Loading more posts...</div>}
            {isReachingEnd && <div>No more posts</div>}
        </div>
    )
}
