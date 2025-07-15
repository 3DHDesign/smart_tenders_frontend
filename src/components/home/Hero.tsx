 
import CategorySlider from "./CategorySlider";
import { FaSearch } from "react-icons/fa"; // Import FaSearch for the search button icon

export default function Hero() {
  return (
    <section
      // Applying wide-container for overall section padding.
      // min-h-[90vh] ensures it takes most of the viewport height.
      // text-white for default text color.
      // flex items-center to vertically center content within the section.
      className="wide-container relative bg-cover bg-center min-h-[90vh] text-white flex items-center"
      style={{
        // Gradient overlay and background image, ensuring pure black for the gradient parts.
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.5), rgba(0,0,0,0.1)), url('/images/hero4.jpg')`,
      }}
    >
      {/*
        The inner content div. It is positioned relative to the section.
        Removed px-4 as wide-container already provides padding.
        text-left aligns content to the left as per the image.
        Added max-w-2xl to constrain the content width.
      */}
      <div className="z-10 text-left max-w-2xl">
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 font-heading">
          <span className="text-white">Find The Best</span>{" "}
          <span className="text-[var(--color-primary)]">Tender</span> {/* Uses --color-primary variable */}
        </h1>
        <p className="text-lg text-white/90 mb-8 font-body"> {/* text-white/90 and font-body */}
          Search from 1000+ Active Government & Private Tenders
        </p>

        {/* Search box - Re-integrated the search icon inside the input for modern look */}
        <div className="relative w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-full px-4 py-2 flex items-center mb-10">
          <input
            type="text"
            placeholder="Search tenders..."
            className="flex-grow bg-transparent text-white placeholder-white/70 outline-none text-sm px-2 font-body" // text-white, placeholder-white/70, font-body
          />
          {/* Replaced button with FaSearch icon inside the input field */}
          <div className="text-white ml-2 cursor-pointer"> {/* text-white for icon */}
            <FaSearch size={20} />
          </div>
        </div>

        {/* Category Slider Component */}
        <CategorySlider/>
      </div>
    </section>
  );
}