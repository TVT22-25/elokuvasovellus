import React from 'react';
import './movieSwiper.css';

// import swiper react components
import { Swiper, SwiperSlide } from 'swiper/react';

// import swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import modules
import SwiperCore, { Autoplay, EffectCoverflow } from 'swiper';

// install Swiper modules
SwiperCore.use([Autoplay, EffectCoverflow]);

function MovieSwiper({ slides, slideChange }) {
    console.log(slides);
    return (
        <Swiper
        spaceBetween={50}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        >
            {slides.map(slide=>(
                    <SwiperSlide key={slide.id}>
                        <img src={`https://image.tmdb.org/t/p/w500${slide.poster_path}`} alt="Preview Image" onClick={()=>slideChange(slide.id)} />
                    </SwiperSlide>
            ))}
        </Swiper>    
    ); 
}

export default MovieSwiper;