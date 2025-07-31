import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { apiService, type Category } from "../../services/api";

export default function CategorySlider() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // ✅ for navigation

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedCategories = await apiService.getUserCategories();
        console.log("Fetched User Categories for Slider:", fetchedCategories);
        setCategories(fetchedCategories);
      } catch (err: unknown) {
        let errorMessage = "Failed to load user categories.";
        if (err && typeof err === "object" && "message" in err) {
          errorMessage = (err as { message: string }).message;
        }
        setError(errorMessage);
        console.error("Error fetching user categories for slider:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return <div className="text-center text-white py-10">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-center text-red-400 py-10">Error: {error}</div>;
  }

  if (categories.length === 0) {
    return <div className="text-center text-white py-10">No categories to display.</div>;
  }

  return (
    <div className="mt-10 w-full max-w-2xl mx-auto">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={0}
        slidesPerView={3}
        breakpoints={{
          320: { slidesPerView: 3 },
          640: { slidesPerView: 4 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 5 },
        }}
        className="mySwiper !p-0 !m-0"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat.id} className="!m-0 !p-0">
            <div
              className="flex flex-col items-center justify-center text-center h-full w-full cursor-pointer"
              onClick={() => navigate(`/tenders?category=${cat.id}`)} // ✅ navigate on click
            >
              <div className="bg-white/10 hover:bg-white/20 transition rounded-md p-1 backdrop-blur-sm shadow-sm flex items-center justify-center w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] lg:w-[90px] lg:h-[90px]">
                {cat.icon_url ? (
                  <img
                    src={cat.icon_url}
                    alt={cat.name}
                    className="w-full h-full object-contain"
                    style={{ width: "36px", height: "36px" }}
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/36x36/cccccc/000000?text=${cat.name
                        .substring(0, 2)
                        .toUpperCase()}`;
                      e.currentTarget.onerror = null;
                    }}
                  />
                ) : (
                  <div className="text-white text-xl flex items-center justify-center w-[36px] h-[36px]">
                    {cat.name.substring(0, 2).toUpperCase()}
                  </div>
                )}
              </div>
              <p className="mt-0.5 text-xs font-medium text-white whitespace-nowrap font-body">
                {cat.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
