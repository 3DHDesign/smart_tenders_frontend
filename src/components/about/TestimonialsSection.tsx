// src/components/TestimonialsSection.tsx

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import Swiper modules
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

// Import the API service and type
import { getTestimonials, type Testimonial } from "../../services/testimonials";

const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const data = await getTestimonials();
        setTestimonials(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <section className="wide-container bg-white py-12 md:py-16 lg:py-20 text-center">
        <p className="text-xl text-gray-500">Loading testimonials...</p>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="wide-container bg-white py-12 md:py-16 lg:py-20 text-center">
        <p className="text-xl text-red-500">Error: {error}</p>
      </section>
    );
  }

  // Show message if no testimonials are available
  if (testimonials.length === 0) {
    return (
      <section className="wide-container bg-white py-12 md:py-16 lg:py-20 text-center">
        <p className="text-xl text-gray-500">No testimonials found.</p>
      </section>
    );
  }

  return (
    <section className="wide-container bg-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto text-center relative">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-[var(--color-dark)] mb-4">
          What Our Clients Say
        </h2>
        <p className="text-gray-600 font-body max-w-2xl mx-auto mb-10">
          Hear directly from businesses and individuals who have transformed
          their tender journey with SmartTenders.
        </p>

        {/* Testimonials Slider with Coverflow Effect */}
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
          slidesPerView={1.2}
          spaceBetween={10}
          breakpoints={{
            640: {
              slidesPerView: 1.8,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 3.8,
              spaceBetween: 25,
            },
            1536: {
              slidesPerView: 4.2,
              spaceBetween: 25,
            },
          }}
          className="myTestimonialsSwiper !pb-10"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white rounded-3xl shadow-lg p-6 h-full text-left border border-gray-100 flex flex-col justify-between transition-all duration-300 hover:shadow-xl min-h-[320px]">
                {/* Quote Text */}
                <p className="text-gray-700 text-base font-body italic mb-6 leading-relaxed">
                  "{testimonial.testimonial}"
                </p>

                {/* Author Info */}
                <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                  <img
                    src={testimonial.image_url}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 mr-3"
                  />
                  <div>
                    <p className="font-semibold text-[var(--color-dark)] font-heading">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 font-body">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom styles for Swiper pagination and navigation arrows */}
        <style>{`
          .swiper-button-next,
          .swiper-button-prev {
            color: var(--color-primary) !important;
            top: 50% !important;
            transform: translateY(-50%) !important;
            width: 30px !important;
            height: 30px !important;
            margin-top: 0 !important;
            background-image: none !important;
          }
          .swiper-button-prev {
            left: 0px !important;
          }
          .swiper-button-next {
            right: 0px !important;
          }
          .swiper-button-prev::after {
            content: '';
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='%2300A3DF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M15 19l-7-7 7-7'/%3E%3C/svg%3E") !important;
            background-size: 100% 100%;
            width: 24px;
            height: 24px;
            display: block;
          }
          .swiper-button-next::after {
            content: '';
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='%2300A3DF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 5l7 7-7 7'/%3E%3C/svg%3E") !important;
            background-size: 100% 100%;
            width: 24px;
            height: 24px;
            display: block;
          }
          @media (max-width: 767px) {
            .swiper-button-next,
            .swiper-button-prev {
              display: none !important;
            }
          }
          .swiper-pagination-bullet {
            background: rgba(0, 0, 0, 0.2) !important;
            opacity: 1 !important;
            width: 8px !important;
            height: 8px !important;
          }
          .swiper-pagination-bullet-active {
            background: var(--color-primary) !important;
            width: 10px !important;
            height: 10px !important;
          }
          .myTestimonialsSwiper .swiper-slide {
            width: 80% !important;
            height: auto;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          @media (min-width: 640px) {
            .myTestimonialsSwiper .swiper-slide {
              width: 48% !important;
            }
          }
          @media (min-width: 1024px) {
            .myTestimonialsSwiper .swiper-slide {
              width: 32% !important;
            }
          }
          @media (min-width: 1280px) {
            .myTestimonialsSwiper .swiper-slide {
              width: 24% !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default TestimonialsSection;
