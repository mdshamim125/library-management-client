// components/Banner.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";

const bannerImages = [
  {
    src: "https://images.unsplash.com/photo-1512820790803-83ca734da794", // books stacked
    alt: "Classic Books",
    caption: "Explore timeless classics",
  },
  // {
  //   src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f", // modern bookshelf
  //   alt: "Modern Literature",
  //   caption: "Dive into modern literature",
  // },
  // {
  //   src: "https://images.unsplash.com/photo-1519681393784-d120267933ba", // study desk with books
  //   alt: "Study Corner",
  //   caption: "Your personal reading space",
  // },
];

const Banner = () => {
  return (
    <div className="relative w-full  mx-auto   overflow-hidden shadow-lg">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="h-[300px] md:h-[550px]"
      >
        {bannerImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 pt-24 md:pt-48">
                <h2 className="text-white text-xl md:text-3xl font-bold text-center px-4">
                  {image.caption}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
