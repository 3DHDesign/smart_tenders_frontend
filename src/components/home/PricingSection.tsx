// src/components/PricingSection.tsx
import React, { useEffect, useState } from "react";
import Button from "../shared/Button";
import { packageService, type Package } from "../../services/packageService"; // Import packageService and Package type

// --- REMOVED: getFeaturesForPackage function is no longer needed ---

const PricingSection: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPackages = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedPackages = await packageService.getPackages();
        setPackages(fetchedPackages);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Failed to load pricing plans.");
          console.error("Error fetching pricing plans:", err);
        } else {
          setError("Failed to load pricing plans.");
          console.error("Error fetching pricing plans:", err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <section className="bg-[var(--color-light)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-[var(--color-dark)] mb-4">
          Our Flexible Tender Plans
        </h2>
        <p className="text-gray-500 font-body max-w-2xl mx-auto mb-10 sm:mb-12 text-sm sm:text-base">
          Unlock more opportunities with SmartTenders. Pick the plan that fits
          your tender discovery and bidding needs.
        </p>

        {isLoading && (
          <div className="text-center text-gray-600 font-body mb-4">
            Loading pricing plans...
          </div>
        )}

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {!isLoading && !error && packages.length === 0 && (
          <div className="text-center text-gray-600 font-body mb-4">
            No pricing plans available.
          </div>
        )}

        {/* Render packages if not loading, no error, and packages array is not empty */}
        {!isLoading && !error && packages.length > 0 && (
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => {
              const highlight = pkg.name.toLowerCase().includes("elite"); // Still highlight 'Elite'

              let buttonLabel = "Choose Plan";
              if (pkg.name.toLowerCase().includes("trial"))
                buttonLabel = "Start Free";
              else if (pkg.name.toLowerCase().includes("enterprise"))
                buttonLabel = "Contact Sales";

              return (
                <article
                  key={pkg.id}
                  className={`relative flex flex-col h-full rounded-2xl border bg-white shadow-md transition-all duration-300
                    ${
                      highlight
                        ? "border-[var(--color-primary)] scale-[1.02] shadow-xl"
                        : "border-gray-200 hover:shadow-lg hover:-translate-y-1"
                    }
                  `}
                >
                  {highlight && (
                    <span className="absolute -top-3 right-3 bg-[var(--color-primary)] text-white text-xs px-3 py-1 rounded-full font-medium shadow">
                      Recommended
                    </span>
                  )}

                  <div className="p-6 text-center">
                    <h3 className="text-xl sm:text-2xl font-bold font-heading text-[var(--color-dark)] mb-2">
                      {pkg.name} {/* Display name from API */}
                    </h3>
                    <p className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)]">
                      {pkg.price} {/* Display price from API */}
                      {pkg.duration && (
                        <span className="text-base font-normal text-gray-500">
                          {" "}
                          / {pkg.duration} Days
                        </span>
                      )}{" "}
                      {/* Display duration */}
                    </p>
                  </div>

                  {/* --- CRITICAL FIX: Removed the entire features <ul> block --- */}
                  {/* <ul className="flex-grow p-6 space-y-3 text-left">
                    {features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        {feature.included ? (
                          <svg ... />
                        ) : (
                          <svg ... />
                        )}
                        <span className={`...`}>{feature.text}</span>
                      </li>
                    ))}
                  </ul> */}

                  <div className="p-6 border-t">
                    <Button
                      label={buttonLabel}
                      className={`w-full py-3 text-base sm:text-lg font-semibold rounded-lg transition-all duration-300
                        ${
                          highlight
                            ? "bg-[var(--color-primary)] text-white hover:bg-[var(--color-dark)]"
                            : "bg-[var(--color-dark)] text-white hover:bg-[var(--color-primary)]"
                        }
                      `}
                      // You might add an onClick handler here to select the package or navigate
                      // onClick={() => handleChoosePlan(pkg.id)}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingSection;
