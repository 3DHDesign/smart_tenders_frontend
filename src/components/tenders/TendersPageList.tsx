import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronRight,
  FaThList,
  FaTimes,
} from "react-icons/fa";
import Button from "../shared/Button";
import { useTenderStore } from "../../stores/useTenderStore";
import { useTaxonomyStore } from "../../stores/useTaxonomyStore";
import { useAuthStore } from "../../stores/authStore";

/* ---------- tiny helpers ---------- */
const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
const closingColor = (due: string) => {
  const d = Math.ceil((new Date(due).getTime() - Date.now()) / 86_400_000);
  if (d <= 2) return "text-[var(--color-accent-red)]";
  if (d <= 10) return "text-[var(--color-accent-orange-dark)]";
  return "text-gray-700";
};

const shortenProvinceName = (
  fullName: string | null | undefined
): string | undefined => {
  if (typeof fullName !== "string") return undefined;
  return fullName.trim().replace(/ Province$/i, "") || undefined;
};

/* ---------- shimmer loader for tender list ---------- */
const TenderItemShimmer: React.FC = () => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
    <div className="grid sm:grid-cols-2 gap-y-2 gap-x-4 text-sm mb-4">
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      <div className="h-8 w-24 bg-gray-200 rounded"></div>
    </div>
  </div>
);

const TenderPageList: React.FC = () => {
  const { isLoggedIn, user } = useAuthStore();
  const canViewSensitiveFields = isLoggedIn && user?.status === "active";

  /* store hooks */
  const {
    list,
    counts,
    loading,
    fetchPage,
    setFilters,
    filters,
    page,
    lastPage,
  } = useTenderStore();
  const { byProvince, byCategory, load: loadTax } = useTaxonomyStore();

  /* react-router */
  const location = useLocation();
  const navigate = useNavigate();

  /* UI state */
  const [openProv, setOpenProv] = useState<Record<string, boolean>>({});

  /* ✅ on mount & on URL change: check ?search= param */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchTerm = params.get("search");

    const categoryId = params.get("category");
    if (categoryId) {
      console.log("📂 Found category ID in URL:", categoryId);
      setFilters({ "categories[0]": Number(categoryId) });
      fetchPage(1, true);
    }

    if (searchTerm) {
      console.log("🔍 Found search term in URL:", searchTerm);
      setFilters({ searchParam: searchTerm }); // pass search term to store
      fetchPage(1, true);
    } else {
      fetchPage(1, true);
    }
    loadTax();
  }, [location.search, setFilters, fetchPage, loadTax]);

  /* helper: set filters & refresh page */
  const setAndRefresh = (partial: Record<string, unknown>) => {
    const newFilters = {
      ...filters,
      searchParam: undefined,
      ...partial,
      page: 1,
    };
    setFilters(newFilters);
    fetchPage(1, true);

    // ✅ remove ?search= when user clicks filters
    const url = new URL(window.location.href);
    url.searchParams.delete("search");
    window.history.replaceState({}, "", url.toString());

    scrollTop();
  };

  /* apply province filter */
  const applyProvince = (prov: string) => {
    const apiProvName = shortenProvinceName(prov);
    if (filters.province === apiProvName && !filters.district) {
      setAndRefresh({ province: undefined, district: undefined });
    } else {
      setAndRefresh({ province: apiProvName, district: undefined });
    }
  };

  /* apply district filter */
  const applyDistrict = (prov: string, dist: string) => {
    const apiProvName = shortenProvinceName(prov);
    const trimmedDist = dist.trim();
    if (filters.province === apiProvName && filters.district === trimmedDist) {
      setAndRefresh({ province: undefined, district: undefined });
    } else {
      setAndRefresh({ province: apiProvName, district: trimmedDist });
    }
  };

  /* pagination numbers (max 8 visible) */
  const visiblePages = useMemo(() => {
    const max = 8;
    if (lastPage <= max)
      return Array.from({ length: lastPage }, (_, i) => i + 1);
    const half = Math.floor(max / 2);
    let start = Math.max(1, page - half);
    let end = start + max - 1;
    if (end > lastPage) {
      end = lastPage;
      start = end - max + 1;
    }
    return Array.from({ length: max }, (_, i) => start + i);
  }, [page, lastPage]);

  /* active keys */
  const activeCatId =
    filters["categories[0]"] != null && !isNaN(Number(filters["categories[0]"]))
      ? Number(filters["categories[0]"])
      : undefined;
  const activeProv = (filters.province as string)?.trim();
  const activeDistrict = (filters.district as string)?.trim();
  const activeStatus = filters.status ?? "all";

  /* ---------- render ---------- */
  return (
    <section className="bg-gray-50 py-8 sm:py-10 lg:py-12 wide-container">
      <div className="container mx-auto">
        {/* ===== counts bar ===== */}
        <div className="grid grid-cols-2 sm:grid-cols-4 bg-white rounded-lg shadow-md mb-8 border border-gray-100 overflow-hidden">
          {(["all", "today", "live", "closed"] as const).map((k) => (
            <div
              key={k}
              className={`flex flex-col items-center p-4 cursor-pointer border-r last:border-r-0 ${
                activeStatus === k
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setAndRefresh({ status: k })}
            >
              <span className="text-2xl font-bold font-heading mb-1">
                {counts[k]}
              </span>
              <span className="text-sm font-body">
                {k === "all"
                  ? "All Tenders"
                  : `${k[0].toUpperCase()}${k.slice(1)} Tenders`}
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ========== LEFT : sidebar ========== */}
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
              <div className="p-4 border-b border-gray-200 flex items-center gap-2 font-heading text-lg font-semibold">
                <FaThList className="text-[var(--color-primary)]" />
                <span>Tenders By Categories</span>
              </div>

              {/* Active Category Tag */}
              {activeCatId && (
                <div className="px-3 py-2 text-sm flex items-center gap-2 bg-gray-100 border-b border-gray-200">
                  <span className="font-medium text-[var(--color-primary)]">
                    {byCategory.find((c) => c.id === activeCatId)?.name}
                  </span>
                  <FaTimes
                    className="cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() =>
                      setAndRefresh({ "categories[0]": undefined })
                    }
                    title="Clear category filter"
                  />
                </div>
              )}

              <ul className="divide-y divide-gray-100">
                {byCategory.map((cat, index) => (
                  <li
                    key={cat.id ?? `category-${index}`}
                    className={`flex justify-between p-3 cursor-pointer ${
                      activeCatId === cat.id
                        ? "bg-gray-100 font-semibold text-[var(--color-primary)]"
                        : "hover:bg-gray-50 text-gray-800"
                    }`}
                    onClick={() => {
                      if (typeof cat.id === "number" && !isNaN(cat.id)) {
                        setAndRefresh({
                          "categories[0]":
                            activeCatId === cat.id ? undefined : cat.id,
                        });
                      }
                    }}
                  >
                    <span>{cat.name}</span>
                    <span className="text-gray-600 font-medium">
                      {cat.tender_count.toLocaleString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-4 border-b border-gray-200 flex items-center gap-2 font-heading text-lg font-semibold">
                <FaMapMarkerAlt className="text-[var(--color-primary)]" />
                <span>Tenders By Locations</span>
              </div>

              {(activeProv || activeDistrict) && (
                <div className="px-3 py-2 text-sm flex items-center gap-2 bg-gray-100 border-b border-gray-200">
                  <span className="font-medium text-[var(--color-primary)]">
                    {byProvince.find(
                      (p) => shortenProvinceName(p.province) === activeProv
                    )?.province || activeProv}
                    {activeDistrict && ` / ${activeDistrict}`}
                  </span>
                  <FaTimes
                    className="cursor-pointer text-gray-500 hover:text-gray-700"
                    onClick={() =>
                      setAndRefresh({
                        province: undefined,
                        district: undefined,
                      })
                    }
                    title="Clear location filter"
                  />
                </div>
              )}

              <ul className="divide-y divide-gray-100">
                {byProvince.map((p) => (
                  <li key={p.province}>
                    <div
                      className={`flex justify-between p-3 cursor-pointer ${
                        activeProv === shortenProvinceName(p.province) &&
                        !activeDistrict
                          ? "bg-gray-100 font-semibold text-[var(--color-primary)]"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => {
                        applyProvince(p.province);
                        if (p.districts.length > 0) {
                          setOpenProv((s) => ({
                            ...s,
                            [p.province]: !s[p.province],
                          }));
                        }
                      }}
                    >
                      <span>
                        {p.province?.trim()} ({p.total})
                      </span>
                      {p.districts.length > 0 &&
                        (openProv[p.province] ? (
                          <FaChevronDown className="text-gray-500" />
                        ) : (
                          <FaChevronRight className="text-gray-500" />
                        ))}
                    </div>

                    {openProv[p.province] && p.districts.length > 0 && (
                      <ul className="bg-gray-50 border-t border-gray-100">
                        {p.districts.map((d) => (
                          <li
                            key={d.district}
                            className={`flex justify-between pl-8 p-2 cursor-pointer text-sm ${
                              activeProv === shortenProvinceName(p.province) &&
                              activeDistrict === d.district?.trim()
                                ? "bg-gray-100 font-semibold text-[var(--color-primary)]"
                                : "hover:bg-gray-100"
                            }`}
                            onClick={() =>
                              applyDistrict(p.province, d.district)
                            }
                          >
                            <span>
                              {d.district?.trim()} ({d.total})
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

          {/* ========== RIGHT : list ========== */}
          <main className="lg:col-span-2 space-y-6">
            {/* loading shimmer */}
            {loading && (
              <div className="grid gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <TenderItemShimmer key={i} />
                ))}
              </div>
            )}

            {/* no tenders */}
            {!loading && list.length === 0 && (
              <p className="text-center text-gray-500">
                No tenders found matching your criteria.
              </p>
            )}

            {/* tender list */}
            {!loading &&
              list.map((t, index) => (
                <article
                  key={t.id ?? `tender-${index}`}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <h2
                    className="text-xl font-bold mb-3 cursor-pointer hover:underline text-[var(--color-dark)]"
                    onClick={() => {
                      if (t.id) {
                        navigate(`/tenders/${t.id}`);
                      }
                    }}
                  >
                    {t.title}
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-700 mb-4">
                    <div>
                      <strong>Code:</strong> {t.code}
                    </div>
                    <div>
                      <strong>Province / District:</strong> {t.province} /{" "}
                      {t.district || "—"}
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
                      <strong>Closing:</strong>{" "}
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

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span
                      className={`text-sm font-semibold ${closingColor(
                        t.due_date
                      )}`}
                    >
                      Closing in{" "}
                      {Math.max(
                        0,
                        Math.ceil(
                          (new Date(t.due_date).getTime() - Date.now()) /
                            86_400_000
                        )
                      )}{" "}
                      days
                    </span>
                    <Button
                      label="View Notice"
                      className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 text-sm"
                      onClick={() => {
                        if (t.id) {
                          navigate(`/tenders/${t.id}`);
                        }
                      }}
                    />
                  </div>
                </article>
              ))}

            {/* pagination */}
            {lastPage > 1 && (
              <nav className="flex justify-center gap-1 flex-wrap pt-4">
                <Button
                  label="Prev"
                  disabled={page === 1 || loading}
                  className="px-3 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
                  onClick={() => {
                    fetchPage(page - 1, true);
                    scrollTop();
                  }}
                />

                {visiblePages.map((n) => (
                  <Button
                    key={n}
                    label={n.toString()}
                    className={`px-3 py-1 rounded ${
                      n === page
                        ? "bg-[var(--color-primary)] text-white"
                        : "bg-white text-gray-800 hover:bg-gray-100"
                    }`}
                    onClick={() => {
                      fetchPage(n, true);
                      scrollTop();
                    }}
                    disabled={loading}
                  />
                ))}

                <Button
                  label="Next"
                  disabled={page === lastPage || loading}
                  className="px-3 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300"
                  onClick={() => {
                    fetchPage(page + 1, true);
                    scrollTop();
                  }}
                />
              </nav>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default TenderPageList;
