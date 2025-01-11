import React from 'react';
import ScrollList from '../scroll/ScrollList'
import useScroll from '../../hooks/Scroll/useScroll'


export default function ScrollHome() {
  const{targetRef,posts}= useScroll()
  return (
    <div>
      <ScrollList targetRef={targetRef} posts={posts} />
    </div>
  )
}
