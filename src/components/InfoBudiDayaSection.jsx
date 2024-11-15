import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const infoBudidaya = [
  {
    title: "Bayam",
    description:
      "Bayam adalah tumbuhan yang biasa ditanam untuk dikonsumsi daunnya sebagai sayuran hijau. Tumbuhan ini berasal dari Amerika tropik namun sekarang tersebar ke seluruh dunia. Tumbuhan ini dikenal sebagai sayuran sumber zat besi yang penting bagi tubuh",
    image: "./src/assets/bayam.png",
  },
  {
    title: "Cabai",
    description:
      "Cabai adalah buah dan tumbuhan anggota genus Capsicum. Buahnya dapat digolongkan sebagai sayuran, rempah, atau bumbu, tergantung bagaimana pemanfaatannya. Buah cabai yang belum matang biasa bewarna hijau atau putih, dan disaat matang buah cabai dapat bewarna merah atau ungu",
    image: "./src/assets/cabai.png",
  },
  {
    title: "Mangga",
    description:
      "Mangga, mempelam, atau pauh adalah nama sejenis buah, demikian pula nama pohonnya. Mangga termasuk ke dalam genus Mangifera, yang terdiri dari 35-40 anggota dari famili Anacardiaceae.",
    image: "./src/assets/mangga.png",
  },
  {
    title: "Kemangi",
    description:
      "Kemangi adalah terna kecil yang daunnya biasa dimakan sebagai lalap. Aroma daunnya khas, kuat namun lembut dengan sentuhan aroma limau. Daun kemangi merupakan salah satu bumbu bagi pepes",
    image: "./src/assets/kemangi.png",
  },
];

const truncateDescription = (text, maxLength = 70) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

export default function InfoBudidayaSection() {
  const [swiper, setSwiper] = useState(null);

  return (
    <section className="bg-gradient-to-b from-white to-green-50 py-16 relative overflow-hidden">
    <div className="container mx-auto px-4 md:px-8">
      <h2 className="text-[#142e38] text-center text-4xl font-bold mb-10 font-['Poppins']">
        Info Budidaya
      </h2>
      <div className="relative">
        <Swiper
          onSwiper={setSwiper}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            clickable: true,
            bulletActiveClass: "swiper-pagination-bullet-active !bg-[#318161]",
          }}
          navigation={false}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="pb-12"
        >
          {infoBudidaya.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out text-center transform hover:-translate-y-2 group">
                <div className="overflow-hidden rounded-lg mb-4 w-full h-48 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                  />
                </div>
                <h3 className="text-[#142e38] text-2xl font-semibold mb-3 font-['Poppins']">
                  {item.title}
                </h3>
                <p className="text-[#142e38] text-base mb-6">
                  {truncateDescription(item.description)}
                </p>
                <button className="px-6 py-2 bg-[#318161] text-white font-poppins rounded-full border-2 border-[#318161] hover:bg-transparent hover:text-[#318161] transition-all duration-300 ease-in-out transform hover:scale-105">
                  Learn More
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          onClick={() => swiper?.slidePrev()}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#318161]"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-[#318161]" />
        </button>
        <button
          onClick={() => swiper?.slideNext()}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#318161]"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-[#318161]" />
        </button>
      </div>
    </div>
  </section>
  );
}
