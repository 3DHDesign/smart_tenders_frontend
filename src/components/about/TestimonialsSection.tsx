import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow'; // Keep coverflow effect styles
import 'swiper/css/pagination';
import 'swiper/css/navigation'; // Keep navigation styles

// Import Swiper modules
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

// Data for testimonials (same as before)
const testimonials = [
  {
    quote: "SmartTenders has revolutionized how we discover and bid on projects. The platform is incredibly intuitive, and the detailed tender insights have significantly improved our success rate. Highly recommended for any business in Sri Lanka!",
    author: "Kamal Perera",
    title: "CEO, Perera & Sons Construction",
    avatar: "https://placehold.co/80x80/00A3DF/FFFFFF?text=KP", // Placeholder avatar
  },
  {
    quote: "Navigating government tenders used to be a nightmare. SmartTenders simplified the entire process, from finding relevant opportunities to managing deadlines. It's an essential tool for our procurement team.",
    author: "Nisha Fernando",
    title: "Procurement Manager, Lanka Tech Solutions",
    avatar: "https://placehold.co/80x80/273E47/FFFFFF?text=NF", // Placeholder avatar
  },
  {
    quote: "The personalized email alerts are a game-changer. We no longer miss out on critical tenders. SmartTenders has truly empowered our small business to compete effectively.",
    author: "Ravi Kumar",
    title: "Founder, Rapid Logistics",
    avatar: "https://placehold.co/80x80/00A3DF/FFFFFF?text=RK", // Placeholder avatar
  },
  {
    quote: "An excellent platform for both buyers and suppliers. The interface is clean, the information is comprehensive, and the support team is very responsive. A must-have for the Sri Lankan tender market.",
    author: "Dilani Rajapakse",
    title: "Business Development Head, Global Supplies Ltd.",
    avatar: "https://placehold.co/80x80/273E47/FFFFFF?text=DR", // Placeholder avatar
  },
  {
    quote: "The tender analysis tools are incredibly insightful. They help us make informed decisions and focus our resources on the most promising opportunities. SmartTenders is a vital strategic partner.",
    author: "Saman Wijesinghe",
    title: "Director, Green Energy Solutions",
    avatar: "https://placehold.co/80x80/00A3DF/FFFFFF?text=SW", // Placeholder avatar
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="wide-container bg-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto text-center relative">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-[var(--color-dark)] mb-4">
          What Our Clients Say
        </h2>
        <p className="text-gray-600 font-body max-w-2xl mx-auto mb-10">
          Hear directly from businesses and individuals who have transformed their tender journey with SmartTenders.
        </p>

        {/* Testimonials Slider with Coverflow Effect */}
        {/* Removed max-w-7xl from Swiper, let it stretch within its parent context */}
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true} // Crucial for the "peek" effect and centering the active slide
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation={true} // Enable default navigation arrows
          modules={[EffectCoverflow, Pagination, Navigation, Autoplay]} // Ensure all modules are included

          // KEY CHANGES FOR SLIDE WIDTH AND SPACING:
          // Default for smallest screens
          slidesPerView={1.2} // Show 1 main slide + peek of next
          spaceBetween={10} // Small space between slides

          breakpoints={{
            // Adjusted breakpoints for wider cards and precise counts in coverflow
            640: { // sm
              slidesPerView: 1.8, // Show 1.8 slides
              spaceBetween: 15,
            },
            1024: { // lg
              slidesPerView: 2.5, // Show 2.5 slides
              spaceBetween: 20,
            },
            1280: { // xl - Aim for 3.5 to 3.8 slides visible for the "4 + peek" effect
              slidesPerView: 3.8, // Shows 3 full cards + a significant peek of the 4th
              spaceBetween: 25, // Increased space for better visual separation
            },
            1536: { // 2xl (if your wide-container allows for more width)
              slidesPerView: 4.2, // Aim for 4 full cards + peek of 5th on very large screens
              spaceBetween: 25,
            }
          }}
          className="myTestimonialsSwiper !pb-10" // !pb-10 for pagination dots
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              {/* Testimonial Card - Designed for consistent height and text flow */}
              {/* Removed w-full from here, width will be controlled by .swiper-slide CSS */}
              <div className="bg-white rounded-3xl shadow-lg p-6 h-full text-left border border-gray-100 flex flex-col justify-between transition-all duration-300 hover:shadow-xl min-h-[320px]">
                {/* Quote Text - Left aligned */}
                <p className="text-gray-700 text-base font-body italic mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                {/* Author Info - Aligned to bottom-left */}
                <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
                  <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 mr-3" />
                  <div>
                    <p className="font-semibold text-[var(--color-dark)] font-heading">{testimonial.author}</p>
                    <p className="text-sm text-gray-500 font-body">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom styles for Swiper pagination and navigation arrows */}
        <style jsx>{`
          /* Swiper navigation arrows (default elements) */
          .swiper-button-next,
          .swiper-button-prev {
            color: var(--color-primary) !important; /* Use your primary color for arrows */
            top: 50% !important; /* Center vertically */
            transform: translateY(-50%) !important;
            width: 30px !important; /* Smaller arrow size */
            height: 30px !important;
            margin-top: 0 !important; /* Remove default margin */
            background-image: none !important; /* Crucial: Remove default arrow image */
          }

          /* Position arrows correctly, almost flush with the edge of the cards */
          /* Adjusted left/right values to be relative to the Swiper container's padding/margin */
          .swiper-button-prev {
            left: 0px !important; /* Position at the very left edge of the Swiper container */
          }
          .swiper-button-next {
            right: 0px !important; /* Position at the very right edge of the Swiper container */
          }

          /* Custom SVG for arrows (if default Swiper arrows don't look like chevrons) */
          /* Swiper uses ::after for arrow content. We can override it with a custom SVG. */
          .swiper-button-prev::after {
            content: ''; /* Clear default content */
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='%2300A3DF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M15 19l-7-7 7-7'/%3E%3C/svg%3E") !important;
            background-size: 100% 100%;
            width: 24px; /* Size of the SVG */
            height: 24px;
            display: block;
          }
          .swiper-button-next::after {
            content: ''; /* Clear default content */
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='2' stroke='%2300A3DF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M9 5l7 7-7 7'/%3E%3C/svg%3E") !important;
            background-size: 100% 100%;
            width: 24px;
            height: 24px;
            display: block;
          }

          /* Hide arrows on smaller screens if they clutter the layout */
          @media (max-width: 767px) {
            .swiper-button-next,
            .swiper-button-prev {
              display: none !important;
            }
          }

          /* Swiper pagination dots */
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

          /* Custom styles for coverflow slides to control width */
          /* KEY CHANGE: Ensure slides take up a significant portion of the available width */
          .myTestimonialsSwiper .swiper-slide {
            /* This width is what Swiper's 'slidesPerView' auto-calculates against */
            /* Adjusted percentages to make cards wider and fill space better */
            width: 80% !important; /* Default for smallest screens, adjust as needed */
            height: auto; /* Allow height to adjust based on content */
            display: flex; /* Ensure content is centered if needed */
            justify-content: center;
            align-items: center;
          }

          /* Adjust slide width for larger screens */
          @media (min-width: 640px) {
            .myTestimonialsSwiper .swiper-slide {
              width: 48% !important; /* Wider on small tablets */
            }
          }
          @media (min-width: 1024px) {
            .myTestimonialsSwiper .swiper-slide {
              width: 32% !important; /* Wider on desktops (3 slides visible) */
            }
          }
          @media (min-width: 1280px) {
            .myTestimonialsSwiper .swiper-slide {
              width: 24% !important; /* For 4.2 slides, roughly 100% / 4.2 = 23.8% - adjusted for spacing */
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default TestimonialsSection;