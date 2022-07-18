import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import "./Slider.scss"
import 'swiper/css/navigation';
import 'swiper/css/pagination'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, } from 'swiper';
import { Link } from 'react-router-dom';
function Slider() {
  return (
    <div className='main-slider'>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        speed={1000}
        autoplay={true}
        navigation
        pagination={{ clickable: true, dynamicBullets: true }}

        className="slider-box"
      >
        <SwiperSlide>
          <img src="/img/slider/ss_02.jpg" alt="ss" />
          <Link to={"/products/kabeli-silovie/PvBVng(A)"} className='more-info'>Подробнее</Link>
        </SwiperSlide>
        <SwiperSlide>
          <img src="/img/slider/ss_02.jpg" alt="ss" />
          <Link to={"/products/kabeli-silovie/PvBVng(A)"} className='more-info'>Подробнее</Link>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}
export default Slider