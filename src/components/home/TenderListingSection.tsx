// src/components/home/TenderListingSection.tsx
import React, { useEffect, useMemo } from "react";
import { useTenderStore } from "../../stores/useTenderStore";
import Button from "../shared/Button";
import { Link, useNavigate } from "react-router-dom";
import { type Tender } from "../../services/tenderService";
import { useAuthStore } from "../../stores/authStore";

const TenderListingSection: React.FC = () => {
  // 🟢 Make sure to destructure resetFilters from the store
  const { list, loading, fetchPage, counts, resetFilters } = useTenderStore();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuthStore();
  const canViewSensitiveFields = isLoggedIn && (user?.status === "active" || user?.status === "pending");

  // Fetch all tenders on first mount.
  useEffect(() => {
    if (typeof fetchPage === "function") {
      // 🟢 This is the fix to automatically reset filters on the home page.
      resetFilters();
      fetchPage(1, true);
    } else {
      console.error(
        "useTenderStore.fetchPage is not a function. Check useTenderStore.ts definition."
      );
    }
  }, [fetchPage, resetFilters]);

  // Derived list for limited display on home page: strictly latest 5, no filtering based on tabs.
  const latestTendersForHomePage = useMemo(() => {
    if (!Array.isArray(list)) {
      return [];
    }

    const sortedTenders = [...list].sort((a: Tender, b: Tender) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (isNaN(dateA) || isNaN(dateB)) {
        console.warn(
          "Invalid date found in tender data during sorting:",
          a.date,
          b.date
        );
        return 0;
      }
      return dateB - dateA;
    });

    return sortedTenders.slice(0, 5);
  }, [list]);

  // Helper to determine closing color
  const closingColor = (due: string) => {
    const diff = Math.ceil((new Date(due).getTime() - Date.now()) / 86_400_000);
    if (diff <= 2) return "text-[var(--color-accent-red)]";
    if (diff <= 10) return "text-[var(--color-accent-orange-dark)]";
    return "text-gray-700";
  };

  // --- Handle navigation to Tender Detail page ---
  const handleViewNoticeClick = (tenderId: number) => {
    navigate(`/tenders/${tenderId}`);
  };

  return (
    <section className="bg-gray-50 py-8 sm:py-10 lg:py-12 wide-container">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 bg-white rounded-lg shadow-md mb-8 border border-gray-100 overflow-hidden">
          {(["all", "today", "live", "closed"] as const).map((key) => {
            const count =
              key === "all"
                ? counts?.all ?? list.length
                : key === "today"
                ? counts?.today ?? 0
                : key === "live"
                ? counts?.live ?? 0
                : counts?.closed ?? 0;

            const label =
              key === "all"
                ? "All Tenders"
                : key === "today"
                ? "Today's Tenders"
                : key === "live"
                ? "Live Tenders"
                : "Closed Tenders";

            return (
              <div
                key={key}
                className="flex flex-col items-center p-4 transition-all duration-200 border-r border-gray-100 last:border-r-0 bg-white text-gray-700"
              >
                <span className="text-2xl font-bold font-heading mb-1 text-[var(--color-dark)]">
                  {count}
                </span>
                <span className="text-sm font-body text-gray-600">{label}</span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-[var(--color-dark)] text-white p-6 rounded-lg text-center shadow-md">
              <p className="text-lg font-semibold font-body mb-3">
                To be connected with Buyers & Suppliers
              </p>
              <h3 className="text-2xl font-bold font-heading mb-4">
                Upload Your Tenders&nbsp;FREE
              </h3>
              <Button
                label="Upload Tenders Now"
                className="w-full bg-[var(--color-primary)] text-center hover:bg-[var(--color-primary)]/80"
                onClick={() => (window.location.href = "/free-tender-upload")}
              />
            </div>
          </aside>

          <main className="lg:col-span-2 space-y-6">
            {loading && (
              <p className="text-center text-gray-600">
                Loading latest tenders…
              </p>
            )}

            {!loading && latestTendersForHomePage.length === 0 && (
              <p className="text-center text-gray-500">
                No latest tenders found.
              </p>
            )}

            {!loading && latestTendersForHomePage.length > 0 && (
              <>
                {latestTendersForHomePage.map((t: Tender) => (
                  <article
                    key={t.id}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all"
                  >
                    {/* 🟢 NEW: Conditional Type Tag - Added here */}
                    {t.type === 'Amendment' && (
                      <span className="inline-block bg-green-500 text-white text-xs font-bold px-2 py-1 rounded mb-2">
                        Amendment
                      </span>
                    )}
                    {t.type === 'Cancellation' && (
                      <span className="inline-block bg-red-500 text-white text-xs font-bold px-2 py-1 rounded mb-2">
                        Cancellation
                      </span>
                    )}
                    <h2 className="text-xl font-bold font-heading text-[var(--color-dark)] mb-3 leading-tight">
                      {t.title}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-700 mb-4 font-body">
                      <div>
                        <span className="font-semibold text-[var(--color-dark)]">
                          Code:
                        </span>{" "}
                        {t.code}
                      </div>
                      <div>
                        <span className="font-semibold">
                          Province&nbsp;/&nbsp;District:
                        </span>{" "}
                        {t.province || "—"} / {t.district || "—"}
                      </div>
                      <div>
                        <span className="font-semibold">Published:</span>{" "}
                        {canViewSensitiveFields ? (
                          new Date(t.date).toLocaleDateString()
                        ) : (
                          <Link
                            to="/login"
                            className="text-[var(--color-primary)] underline hover:opacity-80"
                          >
                            Login to view
                          </Link>
                        )}
                      </div>

                      <div>
                        <span className="font-semibold">Closing:</span>{" "}
                        {new Date(t.due_date).toLocaleDateString()}
                      </div>
                      <div>
                        <span className="font-semibold">Source:</span>{" "}
                        {canViewSensitiveFields ? (
                          (t.papers ?? []).length > 0 ? (
                            (t.papers ?? []).map((paper, idx, arr) => (
                              <span key={paper.id || idx}>
                                {paper.name}
                                {idx < arr.length - 1 && (
                                  <span className="mx-1 text-gray-400">|</span>
                                )}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500">—</span>
                          )
                        ) : (
                          <Link
                            to="/login"
                            className="text-[var(--color-primary)] underline hover:opacity-80"
                          >
                            Login to view
                          </Link>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap justify-between items-center mt-4 pt-4 border-t border-gray-100">
                      <span
                        className={`text-sm font-semibold font-body ${closingColor(
                          t.due_date
                        )}`}
                      >
                        Closing in&nbsp;
                        {Math.max(
                          0,
                          Math.ceil(
                            (new Date(t.due_date).getTime() - Date.now()) /
                              86_400_000
                          )
                        )}
                        &nbsp;days
                      </span>
                      <Button
                        label="View Notice"
                        className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 shadow-md text-sm text-white px-4 py-2 rounded-lg transition-colors"
                        onClick={() => handleViewNoticeClick(t.id)}
                      />
                    </div>
                  </article>
                ))}
              </>
            )}
          </main>
        </div>

        <div className="text-center mt-8">
          <Link to="/tenders">
            <Button
              label="View All Tenders"
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 text-white px-8 py-3 rounded-lg shadow-md font-semibold"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TenderListingSection;