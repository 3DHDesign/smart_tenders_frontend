// src/pages/Tenders/TenderDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getTenderById, type Tender } from "../../services/tenderService";
import { useAuthStore } from "../../stores/authStore";
import { toast } from "react-toastify";

// Importing all the necessary icons from react-icons
import {
  FaExternalLinkAlt,
  FaTimesCircle,
  FaSmile, 
  FaImage,
} from "react-icons/fa";

// Reusable component for displaying a document or image

// Reusable component to display the image preview
const TenderImagePreview: React.FC<{ label: string; url: string }> = ({
  label,
  url,
}) => (
  <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden p-2">
    <h4 className="text-sm font-medium text-gray-600 mb-2">{label}</h4>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block relative group w-full h-full"
    >
      <img
        src={url}
        alt={label}
        className="w-full h-auto rounded-lg object-contain transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-lg">
        <span className="text-white text-xl font-bold flex items-center gap-2">
          View Image <FaExternalLinkAlt className="text-base" />
        </span>
      </div>
    </a>
  </div>
);

const TenderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    isLoggedIn,
    isPackageActive,
    isLoading: authLoading,
  } = useAuthStore();

  const [tender, setTender] = useState<Tender | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('isLoggedIn:', isLoggedIn);
    console.log('isPackageActive:', isPackageActive);
    console.log('authLoading:', authLoading);
    if (authLoading) {
      setLoading(true);
      return;
    }

    if (!isLoggedIn) {
      toast.warn("Please log in to view tender details.");
      navigate("/login");
      return;
    }

    if (!isPackageActive) {
      toast.info("Please activate your package to view tender details.");
      navigate("/dashboard");
      return;
    }

    const fetchTender = async () => {
      if (!id) {
        setError("Tender ID is missing in the URL.");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const tenderData = await getTenderById(Number(id));
        setTender(tenderData);
      } catch (err: unknown) {
        console.error("Failed to fetch tender details:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to load tender details. Please try again.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchTender();
  }, [id, isLoggedIn, isPackageActive, authLoading, navigate]);

  const closingColor = (due: string) => {
    const d = Math.ceil((new Date(due).getTime() - Date.now()) / 86_400_000);
    if (d <= 2) return "bg-red-100 text-red-800";
    if (d <= 10) return "bg-orange-100 text-orange-800";
    return "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <>
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
      </>
     
    );
  }

  if (!isLoggedIn || !isPackageActive) {
    return null;
  }

  if (error) {
    return (

      
      <section className="py-12 wide-container">
        <div className="container mx-auto max-w-5xl text-center bg-white p-8 rounded-2xl shadow-sm">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            <FaTimesCircle />
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
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
            <FaSmile />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Tender Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The tender you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate("/tenders")}
            className="bg-[var(--color-primary)] text-white px-6 py-2 rounded-lg hover:bg-[var(--color-primary)]/90 transition"
          >
            Browse Other Tenders
          </button>
        </div>
      </section>
    );
  }

  return (
   <>

<title>{tender.title} - {tender.code} | SmartTenders.lk</title>

{/* 2. Dynamic Meta Description */}
<meta
  name="description"
  content={`Official tender notice: "${tender.title}" from ${tender.papers && tender.papers.length > 0
    ? tender.papers.map((paper) => paper.name).join(", ")
    : "N/A"}. Published on ${new Date(tender.date).toLocaleDateString()}, closes on ${new Date(tender.due_date).toLocaleDateString()}. Location: ${tender.district}, ${tender.province}.`}
/>

{/* 3. Dynamic Keywords */}
<meta
  name="keywords"
  content={`${tender.title}, ${tender.code}, ${tender.papers && tender.papers.length > 0
    ? tender.papers.map((paper) => paper.name).join(", ")
    : "N/A"}, tender notice, Sri Lanka tenders, ${tender.district}, ${tender.province}, ${tender.categories?.map(c => c.name).join(', ')}`}
/>

{/* 4. Canonical Link Tag (Important for SEO) */}
<link rel="canonical" href={`https://smarttenders.lk/tenders/${id}`} />

{/* 5. Open Graph Tags for Social Sharing */}
<meta property="og:title" content={tender.title} />
<meta property="og:description" content={`Official tender notice: "${tender.title}" from ${tender.papers && tender.papers.length > 0
                      ? tender.papers.map((paper) => paper.name).join(", ")
                      : "N/A"}. Published on ${new Date(tender.date).toLocaleDateString()}.`} />
<meta property="og:url" content={`https://smarttenders.lk/tenders/${id}`} />
<meta property="og:type" content="article" /> {/* Use 'article' for a single page of content */}
<meta property="og:image" content={tender.english_tender_url || tender.sinhala_tender_url || 'https://smarttenders.lk/images/default-og-image.jpg'} />

    <section className="bg-gray-100 min-h-screen">
      {/* Header background div for a specific UX effect */}
      <div className="bg-black/50 h-[60px] sm:h-[100px]"></div>

      <div className="py-8 wide-container">
        <div className="container p-0 mx-auto max-w-5xl overflow-hidden">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Header with status */}
            <div className="bg-[var(--color-primary)] p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    {tender.title}
                  </h1>
                  {/* The key details in a single line as requested */}
                  <p className="text-sm opacity-90">
                    <span className="font-semibold">Code:</span> {tender.code} |{" "}
                    <span className="font-semibold">Location:</span>{" "}
                    {[tender.province, tender.district]
                      .filter(Boolean)
                      .join(", ") || "N/A"}{" "}
                    | <span className="font-semibold">Categories:</span>{" "}
                    {tender.categories && tender.categories.length > 0
                      ? tender.categories.map((cat) => cat.name).join(", ")
                      : "N/A"}{" "}
                    | <span className="font-semibold">Published In:</span>{" "}
                    {tender.papers && tender.papers.length > 0
                      ? tender.papers.map((paper) => paper.name).join(", ")
                      : "N/A"} {" "}
                      | <span className="font-semibold">Publish:</span> {new Date(tender.date).toLocaleDateString()} {" "} 
                      | <span className="font-semibold">Closing:</span> {new Date(tender.due_date).toLocaleDateString()}{" "} 
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-bold ${closingColor(
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
              

              {/* Image Preview Section */}
              {tender.english_tender_url || tender.sinhala_tender_url ? (
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <FaImage className="text-[var(--color-primary)]" />
                    Tender Notice
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    {tender.english_tender_url && (
                      <TenderImagePreview
                        label="English Tender Notice"
                        url={tender.english_tender_url}
                      />
                    )}
                    {tender.sinhala_tender_url && (
                      <TenderImagePreview
                        label="Sinhala Tender Notice"
                        url={tender.sinhala_tender_url}
                      />
                    )}
                  </div>
                </div>
              ) : null}

              {/* Overview */}
            </div>
          </div>
        </div>
      </div>
    </section>
   </>
  );
};

export default TenderDetail;

