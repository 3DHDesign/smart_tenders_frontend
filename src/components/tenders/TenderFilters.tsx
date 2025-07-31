import React, { useEffect, useState } from "react";
import Button from "../shared/Button";
import axiosInstance from "../../services/axiosInstance"; 
import { useTenderStore } from "../../stores/useTenderStore";

interface Newspaper {
  id: number;
  name: string;
}

const TenderFilters: React.FC = () => {
  // store hooks
  const { setFilters, fetchPage, resetFilters } = useTenderStore();

  // form states
  const [code, setCode] = useState("");
  const [keyword, setKeyword] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [selectedPaper, setSelectedPaper] = useState<number | "">("");
  const [papers, setPapers] = useState<Newspaper[]>([]);

  // 🟠 FETCH NEWSPAPER LIST ON LOAD
  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const res = await axiosInstance.get("/tenders");
        const papersArray = res.data?.data?.papers?.[0] || [];
        setPapers(papersArray);
      } catch (error) {
        console.error("Error loading newspapers:", error);
      }
    };
    fetchPapers();
  }, []);

  // 🟠 HANDLE FILTER SUBMIT
  const handleFilter = () => {
    const filters: Record<string, any> = {};
    if (code) filters.code = code;
    if (keyword) filters.searchParam = keyword;
    if (publishedDate) filters.publishedDate = publishedDate;
    if (month) filters.month = month;
    if (year) filters.year = year;
    if (selectedPaper) filters["papers[]"] = selectedPaper;

    console.log("📤 Filters sent to store:", filters);
    setFilters(filters);
    fetchPage(1, true); // force refresh tender list
  };

  // 🟠 HANDLE RESET – clean everything in one go
  const handleReset = () => {
    // 1️⃣ Clear all UI fields instantly
    setCode("");
    setKeyword("");
    setPublishedDate("");
    setMonth("");
    setYear("");
    setSelectedPaper("");

    // 2️⃣ Reset Zustand store & clear localStorage
    resetFilters();

    // 3️⃣ Wait a tick for UI state to clear, then fetch fresh data
    setTimeout(() => {
      fetchPage(1, true);
    }, 0);
  };

  return (
    <div className="bg-white wide-container mx-auto shadow-lg p-6 mb-8 border border-gray-100">
      <div className="container mx-auto">
        <h3 className="text-xl font-bold font-heading text-[var(--color-dark)] mb-6 text-left">
          Advanced Tender Search
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* 🔹 Tender Code */}
          <input
            type="text"
            placeholder="Tender Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body"
          />

          {/* 🔹 Keyword */}
          <input
            type="text"
            placeholder="Tender Title/Keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body"
          />

          {/* 🔹 Newspaper Dropdown */}
          <select
            value={selectedPaper}
            onChange={(e) =>
              setSelectedPaper(e.target.value ? Number(e.target.value) : "")
            }
            className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body appearance-none"
          >
            <option value="">Select Newspaper</option>
            {papers.map((paper) => (
              <option key={paper.id} value={paper.id}>
                {paper.name}
              </option>
            ))}
          </select>

          {/* 🔹 Published Date */}
          <input
            type="date"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-gray-500"
          />

          {/* 🔹 Month Dropdown */}
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body appearance-none"
          >
            <option value="">Select Month</option>
            {Array.from({ length: 12 }, (_, i) => {
              const m = (i + 1).toString().padStart(2, "0");
              return (
                <option key={m} value={m}>
                  {m}
                </option>
              );
            })}
          </select>

          {/* 🔹 Year Dropdown */}
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body appearance-none"
          >
            <option value="">Select Year</option>
            {["2025", "2024", "2023", "2022"].map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          {/* 🔹 Filter Button */}
          <Button
            label="Filter"
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg font-semibold"
            onClick={handleFilter}
          />

          {/* 🔹 Reset Button */}
          <Button
            label="Reset"
            className="bg-gray-400 hover:bg-gray-500 text-white px-8 py-3 text-lg font-semibold"
            onClick={handleReset}
          />
        </div>
      </div>
    </div>
  );
};

export default TenderFilters;
