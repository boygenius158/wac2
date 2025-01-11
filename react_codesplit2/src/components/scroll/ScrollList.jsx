import React, { useState, useEffect } from "react";

const InfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // To control when to stop fetching

  const fetchData = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    // Use JSONPlaceholder API as the example
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${data.length / 10 + 1}&_limit=10`
    ); 
    const newData = await response.json();
    
    setData((prevData) => [...prevData, ...newData]);
    setLoading(false);
    
    // If no more data is available, set hasMore to false
    if (newData.length === 0) {
      setHasMore(false);
    }
  };

  // Set up an event listener for scrolling
  const handleScroll = () => {
    const bottom =
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight;
    if (bottom) {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData(); // Initial data load
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more items to load.</p>}
    </div>
  );
};

export default InfiniteScroll;
