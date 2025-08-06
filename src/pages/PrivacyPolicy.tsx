// src/pages/PrivacyPolicy.tsx
import React, { useEffect, useState } from "react";
import { getDetails, type DetailItem } from "../services/detailsService";

const PrivacyPolicy: React.FC = () => {
  const [content, setContent] = useState<DetailItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDetails();
        const policy = data.details.find((d: DetailItem) => d.type === "Privacy Policy");
        setContent(policy);
      } catch (err) {
        console.error("❌ Error loading Privacy Policy:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!content) return <div className="p-8 text-center">Privacy Policy not found.</div>;

  return (
    <>
    <div className="bg-black/50 h-[60px] sm:h-[100px]"></div>
      <div className="wide-container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">{content.title}</h1>
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content.description }}
      />
    </div>
    </>
  
  );
};

export default PrivacyPolicy;
