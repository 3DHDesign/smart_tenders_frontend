// src/components/CategorySlider.tsx
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper core styles
import "swiper/css";
import "swiper/css/autoplay";

// Import apiService and Category type
// Adjust this path if your api.ts file is in a different location relative to this component
import { apiService, type Category } from "../../services/api";

export default function CategorySlider() {
  // State to hold fetched categories
  const [categories, setCategories] = useState<Category[]>([]);
  // Loading state for API call
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Error state for API call
  const [error, setError] = useState<string | null>(null);

  // useEffect to fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true); // Start loading
      setError(null); // Clear previous errors
      try {
        // Call apiService.getUserCategories() to get user-specific categories for the slider
        const fetchedCategories = await apiService.getUserCategories();
        console.log("Fetched User Categories for Slider:", fetchedCategories); // Debugging log
        setCategories(fetchedCategories); // Set the fetched categories
      } catch (err: unknown) {
        let errorMessage = "Failed to load user categories.";
        if (
          err &&
          typeof err === "object" &&
          "message" in err &&
          typeof (err as { message: string }).message === "string"
        ) {
          errorMessage = (err as { message: string }).message;
        }
        setError(errorMessage); // Set error message
        console.error("Error fetching user categories for slider:", err);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchCategories();
  }, []); // Empty dependency array means this runs once on mount

  // Conditional rendering for loading, error, and no data states
  if (isLoading) {
    return (
      <div className="text-center text-white py-10">Loading categories...</div>
    );
  }

  if (error) {
    return <div className="text-center text-red-400 py-10">Error: {error}</div>;
  }

  if (categories.length === 0) {
    return (
      <div className="text-center text-white py-10">
        No categories to display.
      </div>
    );
  }

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
          320: { slidesPerView: 3, spaceBetween: 0 },
          640: { slidesPerView: 4, spaceBetween: 0 },
          768: { slidesPerView: 5, spaceBetween: 0 },
          1024: { slidesPerView: 5, spaceBetween: 0 },
          1280: { slidesPerView: 5, spaceBetween: 0 },
        }}
        className="mySwiper !p-0 !m-0"
      >
        {categories.map(
          (
            cat // Map over fetched categories
          ) => (
            <SwiperSlide key={cat.id} className="!m-0 !p-0">
              {" "}
              {/* Use cat.id as key */}
              <div className="flex flex-col items-center justify-center text-center h-full w-full">
                <div
                  className="bg-white/10 hover:bg-white/20 transition rounded-md p-1 backdrop-blur-sm shadow-sm
                           flex items-center justify-center
                           w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] md:w-[80px] md:h-[80px] lg:w-[90px] lg:h-[90px]"
                >
                  {/* Use img tag for icon_url, with onError fallback */}
                  {cat.icon_url ? (
                    <img
                      src={cat.icon_url}
                      alt={cat.name}
                      className="w-full h-full object-contain"
                      style={{ width: "36px", height: "36px" }} // Match original icon size from FaIcons
                      onError={(e) => {
                        // Fallback for broken images: replace with a placeholder or hide
                        e.currentTarget.src = `https://placehold.co/36x36/cccccc/000000?text=${cat.name
                          .substring(0, 2)
                          .toUpperCase()}`;
                        e.currentTarget.onerror = null; // Prevent infinite loop
                      }}
                    />
                  ) : (
                    // Fallback if icon_url is missing
                    <div className="text-white text-xl flex items-center justify-center w-[36px] h-[36px]">
                      {cat.name.substring(0, 2).toUpperCase()}{" "}
                      {/* Display initials */}
                    </div>
                  )}
                </div>
                <p className="mt-0.5 text-xs font-medium text-white whitespace-nowrap font-body">
                  {cat.name} {/* Display category name */}
                </p>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
}
