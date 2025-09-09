// src/components/Hero.tsx
import { useState, useEffect, useMemo, useRef } from "react"; // 🟢 ADDED: useRef
import { FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CategorySlider from "./CategorySlider";
import { slideService, type Slide } from "../../services/slide";
import {
  filterService,
  type TenderSearchResult,
} from "../../services/filterService";

export default function Hero() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TenderSearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const searchContainerRef = useRef<HTMLDivElement>(null); // 🟢 ADDED: Ref for the search container

  useEffect(() => {
    const fetchSlides = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedSlides = await slideService.getSlides();
        setSlides(fetchedSlides);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "Failed to load hero slides."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slides, activeIndex]);

  const activeSlide = slides[activeIndex];

  const headlineHtml = useMemo(() => {
    // ⚠️ IMPORTANT: Please ensure your API titles don't contain raw HTML.
    // If they do, consider sanitizing them to prevent XSS attacks.
    return activeSlide?.title || "";
  }, [activeSlide?.title]);

  const introHtml = useMemo(() => {
    return activeSlide?.intro || "";
  }, [activeSlide?.intro]);

  useEffect(() => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const results = await filterService.searchTenders(query);
        setSearchResults(results);
        setShowDropdown(true);
      } catch (err) {
        console.error("Error searching tenders:", err);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 🟢 FIXED: Check if the click is outside the search container
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchContainerRef]);

  // 🟢 NEW: Unified function to handle search and navigation
  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/tenders?searchParam=${encodeURIComponent(query)}`);
      setShowDropdown(false);
    }
  };

  const handleSearchOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // 🟢 NEW: Function to handle a click on a dropdown item
  const handleSuggestionClick = (tenderId: number) => {
    navigate(`/tenders/${tenderId}`);
    setShowDropdown(false);
    setQuery("");
  };

  return (
    <section className="wide-container relative min-h-[90vh] text-white flex items-center overflow-hidden px-4 sm:px-0">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white z-20">
          Loading slides...
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-800 text-white z-20">
          Error: {error}
        </div>
      )}
      {!isLoading && !error && slides.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 text-white z-20">
          No slides available.
        </div>
      )}

      {!isLoading && !error && slides.length > 0 && activeSlide && (
        <>
          <AnimatePresence>
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0, transition: { duration: 1 } }}
              animate={{ opacity: 1, transition: { duration: 1 } }}
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.5), rgba(0,0,0,0.1)), url(${activeSlide.image_url})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></motion.div>
          </AnimatePresence>

          {/* ⬇️ Content */}
          <div className="relative z-10 text-left max-w-full sm:max-w-2xl bg-black/60 sm:bg-transparent px-4 py-6 sm:p-0 rounded-md w-full">
            <motion.h1
              key={`h1-${activeSlide.id}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-snug sm:leading-tight mb-4 font-heading break-words "
              dangerouslySetInnerHTML={{ __html: headlineHtml }}
            ></motion.h1>

            <motion.p
              key={`p-${activeSlide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-sm sm:text-lg text-white/90 mb-6 sm:mb-8 font-body leading-snug"
              dangerouslySetInnerHTML={{ __html: introHtml }}
            ></motion.p>

            {/* 🔍 Search Bar */}
            <div className="relative w-full max-w-2xl" ref={searchContainerRef}> {/* 🟢 ADDED: ref */}
              <div className="bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 sm:py-2.5 flex items-center">
                <input
                  type="text"
                  placeholder="Search tenders..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleSearchOnKeyDown}
                  className="flex-grow bg-transparent text-white placeholder-white/70 outline-none text-sm px-2 font-body"
                  onFocus={() => setShowDropdown(true)}
                />
                <div
                  className="text-white ml-2 cursor-pointer"
                  onClick={handleSearch}  
                >
                  <FaSearch size={20} />
                </div>
              </div>

              {/* 🔽 Dropdown */}
              {showDropdown && searchResults.length > 0 && (
                <div className="absolute mt-2 bg-white text-black rounded-lg shadow-lg w-full max-h-64 overflow-auto z-50">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 border-b last:border-none hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleSuggestionClick(item.id)}  
                    >
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-xs text-gray-600">
                        {item.code} • {item.province}/{item.district}
                      </p>
                      {item.papers?.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {item.papers.map((p, idx) => (
                            <span
                              key={idx}
                              className="bg-blue-100 text-blue-700 text-[10px] px-2 py-1 rounded-full"
                            >
                              📰 {p.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* 📦 Category Slider */}
            <div className="mt-8 sm:mt-10">
              <CategorySlider />
            </div>
          </div>
        </>
      )}
    </section>
  );
}