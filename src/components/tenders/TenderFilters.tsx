import React, { useEffect, useState } from "react";
import Button from "../shared/Button";
import axiosInstance from "../../services/axiosInstance";
import { useTenderStore } from "../../stores/useTenderStore";
import { FaSearch, FaSyncAlt } from "react-icons/fa"; // Using icons for a modern feel

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
    const filters: Record<string, string | number | undefined> = {};
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
    <div className="bg-white wide-container mx-auto rounded-xl shadow-2xl p-8 mb-8 border border-gray-100">
      <div className="container mx-auto">
        <h3 className="text-2xl font-bold font-heading text-[var(--color-dark)] mb-6 text-left border-b-2 pb-2 border-[var(--color-primary)]">
          Advanced Tender Search
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* 🔹 Tender Code */}
          <div className="flex flex-col">
            <label htmlFor="code" className="text-sm text-gray-600 mb-1">Tender Code</label>
            <input
              id="code"
              type="text"
              placeholder="e.g., TND-12345"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition duration-200"
            />
          </div>

          {/* 🔹 Keyword */}
          <div className="flex flex-col">
            <label htmlFor="keyword" className="text-sm text-gray-600 mb-1">Keyword</label>
            <input
              id="keyword"
              type="text"
              placeholder="e.g., Construction, IT"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition duration-200"
            />
          </div>

          {/* 🔹 Newspaper Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="paper" className="text-sm text-gray-600 mb-1">Source Newspaper</label>
            <select
              id="paper"
              value={selectedPaper}
              onChange={(e) =>
                setSelectedPaper(e.target.value ? Number(e.target.value) : "")
              }
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition duration-200 appearance-none"
            >
              <option value="">All Newspapers</option>
              {papers.map((paper) => (
                <option key={paper.id} value={paper.id}>
                  {paper.name}
                </option>
              ))}
            </select>
          </div>

          {/* 🔹 Published Date */}
          <div className="flex flex-col">
            <label htmlFor="publishedDate" className="text-sm text-gray-600 mb-1">Published Date</label>
            <input
              id="publishedDate"
              type="date"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition duration-200 text-gray-500"
            />
          </div>

          {/* 🔹 Month Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="month" className="text-sm text-gray-600 mb-1">Month</label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition duration-200 appearance-none"
            >
              <option value="">All Months</option>
              {Array.from({ length: 12 }, (_, i) => {
                const m = (i + 1).toString().padStart(2, "0");
                const monthName = new Date(0, i).toLocaleString('en', { month: 'long' });
                return (
                  <option key={m} value={m}>
                    {monthName}
                  </option>
                );
              })}
            </select>
          </div>

          {/* 🔹 Year Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="year" className="text-sm text-gray-600 mb-1">Year</label>
            <select
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition duration-200 appearance-none"
            >
              <option value="">All Years</option>
              {["2025", "2024", "2023", "2022"].map((yr) => (
                <option key={yr} value={yr}>
                  {yr}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          {/* 🔹 Filter Button */}
          <Button
            label="Filter"
            className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/90 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-md"
            onClick={handleFilter}
          >
             <FaSearch className="text-white" />
          </Button>

          {/* 🔹 Reset Button */}
          <Button
            label="Reset"
            className="flex items-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-3 rounded-lg text-lg font-semibold"
            onClick={handleReset}
          >
            <FaSyncAlt className="text-gray-800" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TenderFilters;