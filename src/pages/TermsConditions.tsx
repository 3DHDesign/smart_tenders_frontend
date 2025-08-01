// src/pages/TermsConditions.tsx
import React, { useEffect, useState } from "react";
import { getDetails,type  DetailItem } from "../services/detailsService";

const TermsConditions: React.FC = () => {
  const [content, setContent] = useState<DetailItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDetails();

        // ✅ match the correct type from API
        const terms = data.details.find((d: DetailItem) => d.type === "Terms and Conditions");
        setContent(terms);
      } catch (err) {
        console.error("❌ Error loading Terms & Conditions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!content) return <div className="p-8 text-center">Terms & Conditions not found.</div>;

  return (
    <div className="wide-container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">{content.title}</h1>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content.description }}
      />
    </div>
  );
};

export default TermsConditions;
