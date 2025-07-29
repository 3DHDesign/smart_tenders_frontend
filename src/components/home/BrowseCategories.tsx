import React, { useEffect, useState } from "react";
import { apiService, type Category } from "../../services/api";

const BrowseCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserCategories = async () => {
      try {
        const response = await apiService.getUserCategories(); // You already created this
        setCategories(response);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || "Failed to load categories");
        } else {
          setError("Failed to load categories");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserCategories();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <section className="bg-white py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-40">
      <div className="mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-[var(--color-dark)] mb-4">
          Browse Categories
        </h2>
        <p className="text-gray-600 font-body max-w-2xl mx-auto mb-10">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-center p-4 bg-white rounded-lg shadow-md border border-gray-100
                         hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out"
            >
              <div
                className="flex-shrink-0 flex items-center justify-center
                           rounded-md p-3 text-white mr-4"
                style={{ backgroundColor: "#0798F2" }}
              >
                {cat.icon_url ? (
                  <img
                    src={cat.icon_url}
                    alt={cat.name}
                    className="w-9 h-9 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/36x36/cccccc/000000?text=${cat.name
                        .substring(0, 2)
                        .toUpperCase()}`;
                      e.currentTarget.onerror = null;
                    }}
                  />
                ) : (
                  <span className="text-white text-lg">
                    {cat.name.substring(0, 2).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold font-heading text-[var(--color-dark)]">
                  {cat.name}
                </h3>
                <p className="text-sm font-body text-gray-500">
                  {cat.tender_count} Opening{cat.tender_count !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseCategories;
