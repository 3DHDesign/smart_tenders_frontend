import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTenderById, type Tender } from "../../services/tenderService";

const TenderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tender, setTender] = useState<Tender | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTender = async () => {
      if (!id) {
        setError("Tender ID is missing.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const tenderData = await getTenderById(Number(id));
        setTender(tenderData);
      } catch (err) {
        console.error("Failed to fetch tender details:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load tender details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTender();
  }, [id]);

  const closingColor = (due: string) => {
    const d = Math.ceil((new Date(due).getTime() - Date.now()) / 86_400_000);
    if (d <= 2) return "bg-red-100 text-red-800";
    if (d <= 10) return "bg-orange-100 text-orange-800";
    return "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <section className="py-12 wide-container">
        <div className="container mx-auto max-w-5xl bg-white rounded-2xl shadow-sm p-8 animate-pulse">
          <div className="h-8 bg-gray-200 rounded-full w-3/4 mb-6"></div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="h-4 bg-gray-200 rounded-full w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded-full w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded-full w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded-full w-full"></div>
          </div>
          <div className="h-32 bg-gray-200 rounded-xl mb-8"></div>
          <div className="h-64 bg-gray-200 rounded-xl"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 wide-container">
        <div className="container mx-auto max-w-5xl text-center bg-white p-8 rounded-2xl shadow-sm">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Error Loading Tender
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg hover:bg-[var(--color-primary)]/90 transition"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (!tender) {
    return (
      <section className="py-12 wide-container">
        <div className="container mx-auto max-w-5xl text-center bg-white p-8 rounded-2xl shadow-sm">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Tender Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The tender you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => (window.location.href = "/tenders")}
            className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg hover:bg-[var(--color-primary)]/90 transition"
          >
            Browse Other Tenders
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 wide-container">
      <div className="container mx-auto max-w-5xl bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Header with status */}
        <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {tender.title}
              </h1>
              <p className="text-sm opacity-90">Tender Code: {tender.code}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${closingColor(
                tender.due_date
              )}`}
            >
              {Math.max(
                0,
                Math.ceil(
                  (new Date(tender.due_date).getTime() - Date.now()) /
                    86_400_000
                )
              )}{" "}
              days left
            </span>
          </div>
        </div>

        {/* Main content */}
        <div className="p-6 md:p-8">
          {/* Key details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-500 mb-1">
                Published Date
              </h3>
              <p className="text-gray-800">
                {new Date(tender.date).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-500 mb-1">
                Closing Date
              </h3>
              <p className="text-gray-800">
                {new Date(tender.due_date).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-500 mb-1">
                Location
              </h3>
              <p className="text-gray-800">
                {[tender.province, tender.district]
                  .filter(Boolean)
                  .join(", ") || "Not specified"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-500 mb-1">
                Status
              </h3>
              <p className="text-gray-800 capitalize">
                {tender.status || "N/A"}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-[var(--color-primary)]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                  clipRule="evenodd"
                />
              </svg>
              Overview
            </h2>
            <div className="prose max-w-none text-gray-700">
              {tender.intro && <p className="mb-4">{tender.intro}</p>}
              {tender.description && <p>{tender.description}</p>}
              {!tender.intro && !tender.description && (
                <p className="text-gray-500 italic">
                  No detailed description available.
                </p>
              )}
            </div>
          </div>

          {/* Categories */}
          {tender.categories && tender.categories.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-[var(--color-primary)]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                Categories
              </h2>
              <div className="flex flex-wrap gap-2">
                {tender.categories.map((cat) => (
                  <span
                    key={cat.id}
                    className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {cat.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Published In */}
          {tender.papers && tender.papers.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-[var(--color-primary)]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clipRule="evenodd"
                  />
                </svg>
                Published In
              </h2>
              <div className="flex flex-wrap gap-2">
                {tender.papers.map((paper) => (
                  <span
                    key={paper.id}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {paper.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Documents Section */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-[var(--color-primary)]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
                  clipRule="evenodd"
                />
              </svg>
              Documents
            </h2>

            {/* Document List - Simple Display */}
            <div className="space-y-4">
              {tender.english_tender_url && (
                <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                  <div className="bg-[var(--color-primary)] text-white p-2 rounded-lg mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">
                      English Tender Notice
                    </h3>
                    <p className="text-sm text-gray-500">PDF Document</p>
                  </div>
                  <a
                    href={tender.english_tender_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 flex items-center"
                  >
                    Open
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              )}

              {tender.sinhala_tender_url && (
                <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                  <div className="bg-[var(--color-secondary)] text-white p-2 rounded-lg mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">
                      Sinhala Tender Notice
                    </h3>
                    <p className="text-sm text-gray-500">PDF Document</p>
                  </div>
                  <a
                    href={tender.sinhala_tender_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 flex items-center"
                  >
                    Open
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              )}

              {tender.document_url && (
                <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                  <div className="bg-gray-600 text-white p-2 rounded-lg mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">
                      Main Tender Document
                    </h3>
                    <p className="text-sm text-gray-500">PDF Document</p>
                  </div>
                  <a
                    href={tender.document_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 flex items-center"
                  >
                    Open
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              )}

              {tender.files &&
                tender.files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="bg-gray-500 text-white p-2 rounded-lg mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">
                        {file.title || file.type}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {file.file.split(".").pop()?.toUpperCase()} File
                      </p>
                    </div>
                    <a
                      href={`http://apitenders.3dhdesign.info/storage/${file.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 flex items-center"
                    >
                      Open
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TenderDetail;
