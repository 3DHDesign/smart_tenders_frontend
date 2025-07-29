import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import CategorySlider from "./CategorySlider";

const slides = [
  {
    image: "/images/hero4.jpg",
    headline: "Find The Best",
    highlight: "Tender",
    subtitle: "Search from 1000+ Active Government & Private Tenders",
  },
  {
    image: "/images/01.jpg",
    headline: "Explore Premium",
    highlight: "Opportunities",
    subtitle: "Unlock government and private projects at your fingertips.",
  },
  {
    image: "/images/02.jpg",
    headline: "Stay Ahead with",
    highlight: "SmartTenders",
    subtitle: "Daily updates on the latest tenders across all industries.",
  },
  {
    image: "/images/03.jpg",
    headline: "Your Gateway to",
    highlight: "Success",
    subtitle: "Find, bid, and win tenders with confidence.",
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const activeSlide = slides[activeIndex];

  return (
    <section className="wide-container relative min-h-[90vh] text-white flex items-center overflow-hidden">
      {/* AnimatePresence for shattering */}
      <AnimatePresence>
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
          animate={{ opacity: 1, transition: { duration: 1 } }}
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.5), rgba(0,0,0,0.1)), url(${activeSlide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 text-left max-w-2xl">
        <motion.h1
          key={activeSlide.headline}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 font-heading"
        >
          <span className="text-white">{activeSlide.headline}</span>{" "}
          <span className="text-[var(--color-primary)]">
            {activeSlide.highlight}
          </span>
        </motion.h1>

        <motion.p
          key={activeSlide.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-lg text-white/90 mb-8 font-body"
        >
          {activeSlide.subtitle}
        </motion.p>

        {/* Search Box */}
        <div className="relative w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-full px-4 py-2 flex items-center mb-6">
          <input
            type="text"
            placeholder="Search tenders..."
            className="flex-grow bg-transparent text-white placeholder-white/70 outline-none text-sm px-2 font-body"
          />
          <div className="text-white ml-2 cursor-pointer">
            <FaSearch size={20} />
          </div>
        </div>

        {/* Category Slider */}
        <CategorySlider />
      </div>
    </section>
  );
}
