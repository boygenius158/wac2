    import React from "react";
    import useSWRInfinite from "swr/infinite";

    const fetcher = (url) => fetch(url).then((res) => res.json());
    const PAGE_SIZE = 10;

    export default function Posts() {
    const {
        data,
        size,
        setSize,
        isLoadingMore,
        isReachingEnd,
    } = useSWRInfinite(
        (pageIndex) =>
        `https://jsonplaceholder.typicode.com/posts?_page=${pageIndex+1}&_limit=${PAGE_SIZE}`,
        fetcher,
        { revalidateFirstPage: false } 
    );

    const posts = data ? [].concat(...data) : [];

    const handleLoadMore = () => {
        if (!isLoadingMore && !isReachingEnd) {
        setSize(s => s + 1); 
        }
    };

    return (
        <div>
        <button
            disabled={isLoadingMore || isReachingEnd}
            onClick={handleLoadMore}
        >
            {isLoadingMore
            ? (
                <div ref={ref}>
                    "Loading more posts..."
                </div>
            )
            : isReachingEnd
            ? "No more posts"
            : "Load more posts"}
        </button>

        {posts.map((post) => (
            <p key={post.id}>{post.title}</p>
        ))}
        </div>
    );
    }
