import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function useSWRScroll() {
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 50% of the element is visible
    rootMargin: '0px', // No margin
  });

  useEffect(() => {
    if (inView) {
      console.log('Element is in view');
    } else {
      console.log('Element is not in view');
    }
  }, [inView]);
  console.log("useSwrSColl re rednered");
  
  return {
    ref,
    inView, 
  };
}
