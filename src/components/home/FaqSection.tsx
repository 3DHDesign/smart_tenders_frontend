// src/components/home/FaqSection.tsx
import React, { useEffect, useState } from "react";
import { getDetails, type DetailItem } from "../../services/detailsService";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface ParsedFAQ {
  question: string;
  answer: string;
}

const FaqSection: React.FC = () => {
  const [faqItems, setFaqItems] = useState<ParsedFAQ[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDetails();
        const faqItem = data.details.find((d: DetailItem) => d.type === "FAQ");

        if (faqItem) {
          // ✅ Parse the FAQ description HTML into Q&A
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = faqItem.description;

          const headings = tempDiv.querySelectorAll("h4");
          const answers = tempDiv.querySelectorAll("blockquote");

          const parsedFaqs: ParsedFAQ[] = [];

          headings.forEach((h, i) => {
            parsedFaqs.push({
              question: h.innerText.trim(),
              answer: answers[i] ? answers[i].innerHTML.trim() : "",
            });
          });

          setFaqItems(parsedFaqs);
        }
      } catch (err) {
        console.error("❌ Error loading FAQ:", err);
      }
    };
    fetchData();
  }, []);

  if (!faqItems.length) return null;

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="wide-container mx-auto py-12">
      <h2 className="text-3xl font-bold mb-8 text-[var(--color-dark)] text-center">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg shadow-sm bg-white"
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex justify-between items-center p-4 text-left font-semibold text-lg text-[var(--color-dark)] hover:bg-gray-50 transition"
            >
              {item.question}
              {openIndex === index ? (
                <FaChevronUp className="text-[var(--color-primary)]" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </button>

            {/* Accordion Body */}
            {openIndex === index && (
              <div
                className="px-4 pb-4 text-gray-700 prose max-w-none border-t border-gray-100"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
