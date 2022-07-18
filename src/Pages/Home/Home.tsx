import "./Home.scss"
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import 'swiper/css/pagination'
import 'swiper/css/scrollbar';
import "swiper/css/effect-creative";
import { EffectCreative, Navigation } from "swiper";
import {A11y, Pagination, Autoplay, } from 'swiper';
import { Link } from "react-router-dom";
import Slider from "../../Components/Slider/Slider";

const Home:React.FC = ()=> {

  return (
    <main className="main-page">
      <Slider />
      <div className="container">
        <div className="main-title">
          <h1>Сарансккабель</h1>
          <div className="or-line"></div>
          <p>Кабель и провод от завода изготовителя в России </p>
        </div>
        <div className="intro">
          <div className="intro__title">
            <h2>Кто мы?</h2>
            <div className="or-line"></div>
            <p className="intro__text">Организация с ограниченной ответственностью, мы являемся одной из ведущих предприятий кабельной промышленности и постоянно обновляем номенклатуру выпускаемой продукции, которая используется во многих отраслях индустрии.</p>
          </div>
          <div className="intro-img">
            <img width="300" src="/img/intro/pexels-photo-257736.jpeg" alt="" />
          </div>
        </div>
      </div>
      <div className="intro-second">
        <div className="container">
          <div className="intro-second__title">
            <h2>Производим кабельную продукциию с 1955 года</h2>
            <div className="or-line"></div>
          </div>
        </div>
        <div className="pictures-box">

          {window.screen.width < 768 ?
            <div className="swiper-box">
              <Swiper
                modules={[ A11y, Autoplay, EffectCreative]}
                spaceBetween={0}
                slidesPerView={1}
                speed={300}
                autoplay={true}
                loop={true}
                effect={"creative"}
                creativeEffect={{
                  prev: {
                    shadow: true,
                    translate: [0, 0, -200],
                  },
                  next: {
                    translate: ["100%", 0, 0],
                  },
                }}
                className="slider-box"
              >
                <SwiperSlide>
                  <img className="pictures" width={300} height={200} src="/img/intro/1.jpg" alt="" />
                </SwiperSlide>

                <SwiperSlide>
                  <img className="pictures" width={300} height={200} src="/img/intro/2.jpg" alt="" />
                </SwiperSlide>

                <SwiperSlide>
                  <img className="pictures" width={300} height={200} src="/img/intro/3.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img className="pictures" width={300} height={200} src="/img/intro/4.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                  <img className="pictures" width={300} height={200} src="/img/intro/5.jpg" alt="" />
                </SwiperSlide>
              </Swiper>
            </div>
            :
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={0}
              slidesPerView={"auto"}
              speed={300}
              mousewheel={true}
              autoplay={true}
              loop={true}
              navigation
              pagination={{ clickable: true }}
              className="slider-box"
            >
              <SwiperSlide>
                <img className="pictures" width={500} height={300} src="/img/intro/1.jpg" alt="" />
              </SwiperSlide>

              <SwiperSlide>
                <img className="pictures" width={500} height={300} src="/img/intro/2.jpg" alt="" />
              </SwiperSlide>

              <SwiperSlide>
                <img className="pictures" width={500} height={300} src="/img/intro/3.jpg" alt="" />
              </SwiperSlide>

              <SwiperSlide>
                <img className="pictures" width={500} height={300} src="/img/intro/4.jpg" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                <img className="pictures" width={500} height={300} src="/img/intro/5.jpg" alt="" />
              </SwiperSlide>
            </Swiper>
          }
        </div>
      </div>
      <div className="container">
        <div className="intro">
          <div className="intro-img">
            <img width="300" src="/img/intro/pexels-photo-230518.jpeg" alt="" />
          </div>
          <div className="intro__title third">
            <h2>Кто наш потребитель?</h2>
            <div className="or-line"></div>
            <p className="intro__text">Среди потребителей нашей продукции крупнейшие предприятия энергетической, строительной, транспортной отраслей, предприятия машиностроения и связи.</p>
            <Link className="product-link" to={"/products"}>Наша продукция</Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home