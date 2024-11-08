import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

import { Autoplay, Navigation } from "swiper/modules";

const CarouselItems = [
  {
    source:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    title:
      "The Beauty of Nature,The Beauty of Nature,The Beauty of Nature,The Beauty of Nature",
  },
  {
    source:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    title: "The Beauty of Nature",
  },
  {
    source:
      "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
    title: "The Beauty of Nature",
  },
  {
    source:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    title:
      "The Beauty of Nature,The Beauty of Nature,The Beauty of Nature,The Beauty of Nature",
  },
  {
    source:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    title: "The Beauty of Nature",
  },
  {
    source:
      "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
    title: "The Beauty of Nature",
  },
  {
    source:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    title:
      "The Beauty of Nature,The Beauty of Nature,The Beauty of Nature,The Beauty of Nature",
  },
  {
    source:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    title: "The Beauty of Nature",
  },
  {
    source:
      "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
    title: "The Beauty of Nature",
  },
  {
    source:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80",
    title:
      "The Beauty of Nature,The Beauty of Nature,The Beauty of Nature,The Beauty of Nature",
  },
  {
    source:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80",
    title: "The Beauty of Nature",
  },
  {
    source:
      "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80",
    title: "The Beauty of Nature",
  },
];

const HomeCarousel = () => {
  return (
    <Swiper
      slidesPerView={"auto"}
      navigation
      modules={[Autoplay,Navigation]}
      spaceBetween={10}
      className="w-full h-full select-none carousel-wrapper"
      loop
      autoplay={{
        delay: 2000,
      }}
    >
      {CarouselItems.map(({ source, title }, index) => (
        <SwiperSlide
          key={index}
          className="rounded-sm relative h-carousel_card_height w-carousel_card_width"
        >
          <img
            src={source}
            alt="Carousel image"
            className="object-cover h-full w-full"
            loading="lazy"
            draggable="false"
          />
          <div className="absolute inset-0 h-full w-full flex justify-center items-end bg-black/10 transition-all ease-in-out hover:bg-black/0">
            <div className="w-full text-center">
              <h3 className="truncate-text text-base">{title}</h3>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HomeCarousel;
