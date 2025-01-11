import React from "react";
import useScroll from "../hooks/Scroll/useScroll";

const InfiniteScroll = () => {
  const { posts, loading, hasMore, ref } = useScroll();

  return (
    <div>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))}
      </div>

      {hasMore && <p>No more posts</p>}

      <div ref={ref}>
        {loading && <p>Loading more posts...</p>}
      </div>
    </div>
  );
};

export default InfiniteScroll