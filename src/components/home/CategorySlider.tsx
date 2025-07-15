import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper core styles
import 'swiper/css';
import 'swiper/css/autoplay'; // Import autoplay styles

import { Autoplay } from 'swiper/modules'; // Import Autoplay module

import {
  FaUtensils,
  FaHeartbeat,
  FaCogs,
  FaGraduationCap,
  FaHeadset,
  FaLayerGroup,
} from 'react-icons/fa';

// KEY FIX: Increased icon size directly in the data array
const categories = [
  { icon: <FaUtensils size={32} />, label: 'Food Service' }, // Increased size
  { icon: <FaHeartbeat size={32} />, label: 'Health and Care' }, // Increased size
  { icon: <FaCogs size={32} />, label: 'Automotive' }, // Increased size
  { icon: <FaLayerGroup size={32} />, label: 'Designer' }, // Increased size
  { icon: <FaHeadset size={32} />, label: 'Customer Service' }, // Increased size
  { icon: <FaGraduationCap size={32} />, label: 'Education' }, // Increased size
  { icon: <FaUtensils size={32} />, label: 'Logistics' }, // Increased size
  { icon: <FaHeartbeat size={32} />, label: 'Finance' }, // Increased size
  { icon: <FaCogs size={32} />, label: 'IT Support' }, // Increased size
  { icon: <FaGraduationCap size={32} />, label: 'Marketing' }, // Increased size
];

export default function CategorySlider() {
  return (
    <div className="mt-10 w-full max-w-2xl mx-auto">
      <Swiper
        modules={[Autoplay]} // Add Autoplay module
        autoplay={{
          delay: 3000, // Slide every 3 seconds
          disableOnInteraction: false, // Keep autoplaying even if user interacts
        }}
        spaceBetween={0}
        slidesPerView={3}
        breakpoints={{
          320: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 0,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 0,
          },
        }}
        className="mySwiper !p-0 !m-0"
      >
        {categories.map((cat, idx) => (
          <SwiperSlide key={idx} className="!m-0 !p-0">
            <div className="flex flex-col items-center justify-center text-center h-full w-full">
              <div
                className="bg-white/10 hover:bg-white/20 transition rounded-md p-1 backdrop-blur-sm shadow-sm
                           flex items-center justify-center
                           w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] lg:w-[90px] lg:h-[90px]"
              >
                {/* KEY FIX: Removed text-6xl here, as size is controlled by icon prop */}
                <div className="text-white">{cat.icon}</div>
              </div>
              <p className="mt-0.5 text-xs font-medium text-white whitespace-nowrap font-body">
                {cat.label}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}