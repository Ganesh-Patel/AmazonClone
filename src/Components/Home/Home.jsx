import React from 'react'
import Recom from '../Recommendations/Recommendations'
import Carousel from '../Carousels/CarouselHome.jsx'
import Carousel2 from '../Carousels/Carousel2.jsx'

const slides = [
  "./1.jpg",
  "./2.jpg",
  "./3.jpg",
  "./4.jpg",
]

function Home() {
  return (
    <div className="home h-auto">
      <Carousel />
      <Carousel2 autoSlide={true} >
          {[...slides.map((s) => (
            <img src={s} />
          )), <video src={""} autoPlay muted loop />]}
        </Carousel2>
     <Recom />
    </div>
  )
}

export default Home
