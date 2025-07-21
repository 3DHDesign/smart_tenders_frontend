/* -------- src/components/home/TenderListingSection.tsx -------- */

import React, { useEffect, useMemo, useState } from "react";
import {
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronRight,
  FaThList,
} from "react-icons/fa";
import Button from "../shared/Button";
import { useTenderStore } from "../../stores/useTenderStore";
import { useTaxonomyStore } from "../../stores/useTaxonomyStore";

const TenderListingSection: React.FC = () => {
  /* === store hooks === */
  const { list, counts, loading,   } = useTenderStore();
  const { byProvince, byCategory, load: loadTaxonomies } = useTaxonomyStore();

  /* === UI-only local state === */
  const [openProvinces, setOpenProvinces] = useState<Record<string, boolean>>(
    {}
  );
  const [activeFilter, setActiveFilter] = useState<
    "all" | "today" | "live" | "closed"
  >("all");

  /* === first mount === */
  useEffect(() => {
    fetch(true); // always refresh page-1 on entry
    loadTaxonomies(); // categories + locations
  }, [fetch, loadTaxonomies]);

  /* === derived list for Today / Live / Closed tabs === */
  const filtered = useMemo(() => {
    switch (activeFilter) {
      case "today":
        return list.filter(
          (t) => t.due_date === new Date().toISOString().slice(0, 10)
        );
      case "live":
        return list.filter((t) => new Date(t.due_date) > new Date());
      case "closed":
        return list.filter((t) => new Date(t.due_date) <= new Date());
      default:
        return list;
    }
  }, [activeFilter, list]);

  /* === helpers === */
  const closingColor = (due: string) => {
    const diff = Math.ceil((new Date(due).getTime() - Date.now()) / 86_400_000);
    if (diff <= 2) return "text-[var(--color-accent-red)]";
    if (diff <= 10) return "text-[var(--color-accent-orange-dark)]";
    return "text-gray-700";
  };

  /* === render === */
  return (
    <section className="bg-gray-50 py-8 sm:py-10 lg:py-12 wide-container">
      <div className="container mx-auto">
        {/* ----- Top counts bar ----- */}
        <div className="grid grid-cols-2 sm:grid-cols-4 bg-white rounded-lg shadow-md mb-8 border border-gray-100 overflow-hidden">
          {(["all", "today", "live", "closed"] as const).map((key) => {
            const count =
              key === "all"
                ? counts.all ||
                  list.length /* fallback so it never shows 0 on first paint */
                : key === "today"
                ? counts.today
                : key === "live"
                ? counts.live
                : counts.closed;

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
                className={`flex flex-col items-center p-4 cursor-pointer transition-all duration-200 border-r border-gray-100 last:border-r-0
                  ${
                    activeFilter === key
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                onClick={() => setActiveFilter(key)}
              >
                <span
                  className={`text-2xl font-bold font-heading mb-1 ${
                    activeFilter === key
                      ? "text-white"
                      : "text-[var(--color-dark)]"
                  }`}
                >
                  {count}
                </span>
                <span
                  className={`text-sm font-body ${
                    activeFilter === key ? "text-white" : "text-gray-600"
                  }`}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* ----- Columns ----- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* === LEFT SIDEBAR === */}
          <aside className="lg:col-span-1 space-y-6">
            {/* CTA */}
            <div className="bg-[var(--color-dark)] text-white p-6 rounded-lg text-center shadow-md">
              <p className="text-lg font-semibold font-body mb-3">
                To be connected with Buyers & Suppliers
              </p>
              <h3 className="text-2xl font-bold font-heading mb-4">
                Upload Your Tenders&nbsp;FREE
              </h3>
              <Button
                label="Upload Tenders Now"
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80"
              />
            </div>

            {/* Categories */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4 border-b border-gray-200 flex items-center space-x-2 font-heading text-lg font-semibold text-[var(--color-dark)]">
                <FaThList className="text-[var(--color-primary)]" />
                <span>Tenders By Categories</span>
              </div>
              <ul className="divide-y divide-gray-100">
                {byCategory.length === 0 && (
                  <li className="p-3 text-sm">Loading…</li>
                )}

                {byCategory.map((cat) => (
                  <li
                    key={cat.name}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer"
                  >
                    <span className="text-[var(--color-dark)]">{cat.name}</span>

                    {/* use tender_count, add separators */}
                    <span className="text-gray-600 font-medium">
                      {cat.tender_count.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4 border-b border-gray-200 flex items-center space-x-2 font-heading text-lg font-semibold text-[var(--color-dark)]">
                <FaMapMarkerAlt className="text-[var(--color-primary)]" />
                <span>Tenders By Locations</span>
              </div>
              <ul className="divide-y divide-gray-100">
                {byProvince.map((p) => (
                  <li key={p.province}>
                    <div
                      className="flex justify-between items-center p-3 hover:bg-gray-50 cursor-pointer"
                      onClick={() =>
                        p.districts.length &&
                        setOpenProvinces((s) => ({
                          ...s,
                          [p.province]: !s[p.province],
                        }))
                      }
                    >
                      <span className="font-body text-[var(--color-dark)]">
                        {p.province} ({p.total})
                      </span>
                      {p.districts.length > 0 &&
                        (openProvinces[p.province] ? (
                          <FaChevronDown className="text-gray-500" />
                        ) : (
                          <FaChevronRight className="text-gray-500" />
                        ))}
                    </div>
                    {openProvinces[p.province] && p.districts.length > 0 && (
                      <ul className="bg-gray-50 border-t border-gray-100">
                        {p.districts.map((d) => (
                          <li
                            key={d.district}
                            className="flex justify-between items-center p-2 pl-8 hover:bg-gray-100 text-sm cursor-pointer"
                          >
                            <span className="text-gray-600">
                              {d.district} ({d.total})
                            </span>
                            <FaChevronRight className="text-gray-400 text-xs" />
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* === RIGHT LIST === */}
          <main className="lg:col-span-2 space-y-6">
            {loading && <p className="text-center">Loading…</p>}

            {!loading && list.length === 0 && (
              <p className="text-center text-gray-500">No tenders found.</p>
            )}

            {!loading && list.length > 0 && (
              <p className="text-sm text-gray-600 mb-4 font-body">
                Showing 1 – {filtered.length} of {counts.all} total tenders
              </p>
            )}

            {filtered.map((t) => (
              <article
                key={t.id}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
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
                    {t.province} / {t.district || "—"}
                  </div>
                  <div>
                    <span className="font-semibold">Published:</span>{" "}
                    {new Date(t.date).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-semibold">Closing:</span>{" "}
                    {new Date(t.due_date).toLocaleDateString()}
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
                    className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 shadow-md text-sm"
                    onClick={() =>
                      window.open(
                        t.english_tender_url || t.sinhala_tender_url || "#",
                        "_blank"
                      )
                    }
                  />
                </div>
              </article>
            ))}

        
          </main>
        </div>
      </div>
    </section>
  );
};

export default TenderListingSection;
