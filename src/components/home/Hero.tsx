// src/components/Hero.tsx
import { useState, useEffect, useMemo } from "react";
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

  // 🔍 Search state
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TenderSearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // 🖼 Fetch slides
  useEffect(() => {
    const fetchSlides = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedSlides = await slideService.getSlides();
        console.log("Fetched Hero Slides:", fetchedSlides);
        setSlides(fetchedSlides);
      } catch (err: unknown) {
        console.error("Error fetching hero slides:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load hero slides."
        );
      } finally {
        setIsLoading(false);
      }
    };
    fetchSlides();
  }, []);

  // 🎞 Auto-play interval for slides
  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slides, activeIndex]);

  const activeSlide = slides[activeIndex];

  // 📝 Title splitting (last word highlighted)
  const { headline, highlight } = useMemo(() => {
    if (!activeSlide?.title) {
      return { headline: "", highlight: "" };
    }
    const words = activeSlide.title.split(" ");
    if (words.length > 1) {
      const lastWord = words[words.length - 1];
      const remainingWords = words.slice(0, -1).join(" ");
      return { headline: remainingWords, highlight: lastWord };
    }
    return { headline: "", highlight: activeSlide.title };
  }, [activeSlide?.title]);

  // 🔍 Search tenders (debounced)
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
    }, 400); // debounce 400ms

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <section className="wide-container relative min-h-[90vh] text-white flex items-center overflow-hidden">
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

          {/* Content */}
          <div className="relative z-10 text-left max-w-2xl">
            <motion.h1
              key={`h1-${activeSlide.id}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 font-heading"
            >
              <span className="text-white">{headline}</span>{" "}
              <span className="text-[var(--color-primary)]">{highlight}</span>
            </motion.h1>

            <motion.p
              key={`p-${activeSlide.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-lg text-white/90 mb-8 font-body"
            >
              {activeSlide.intro}
            </motion.p>

            {/* 🔍 Search Box */}
            <div className="relative w-full max-w-2xl">
              <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 flex items-center">
                <input
                  type="text"
                  placeholder="Search tenders..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-grow bg-transparent text-white placeholder-white/70 outline-none text-sm px-2 font-body"
                  onFocus={() => setShowDropdown(true)}
                />
                <div
                  className="text-white ml-2 cursor-pointer"
                  onClick={() => {
                    if (query.trim()) {
                      navigate(`/tenders?search=${encodeURIComponent(query)}`);
                      setShowDropdown(false);
                    }
                  }}
                >
                  <FaSearch size={20} />
                </div>
              </div>

              {/* 🔽 Dropdown results */}
              {showDropdown && searchResults.length > 0 && (
                <div className="absolute mt-2 bg-white text-black rounded-lg shadow-lg w-full max-h-64 overflow-auto z-50">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 border-b last:border-none hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        navigate(`/tenders/${item.id}`);
                        setShowDropdown(false);
                        setQuery("");
                      }}
                    >
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-xs text-gray-600">
                        {item.code} • {item.province}/{item.district}
                      </p>

                      {/* 📄 Papers as badges */}
                      {item.papers && item.papers.length > 0 && (
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

            {/* Category Slider */}
            <CategorySlider />
          </div>
        </>
      )}
    </section>
  );
}
