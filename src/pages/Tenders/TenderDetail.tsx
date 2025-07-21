// src/pages/Tenders/TenderDetailPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTenderById, type Tender } from '../../services/tenderService';
import Button from '../../components/shared/Button';

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
        setError(err instanceof Error ? err.message : 'Failed to load tender details.');
      } finally {
        setLoading(false);
      }
    };

    fetchTender();
  }, [id]);

  if (loading) {
    return (
      <section className="py-12 wide-container">
        <div className="container mx-auto bg-white rounded-xl shadow-lg p-8 animate-pulse">
          <div className="h-10 bg-gray-200 rounded w-full mb-6"></div>
          <div className="grid grid-cols-2 gap-4 text-sm mb-6">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded w-full"></div>
            <div className="h-6 bg-gray-200 rounded w-3/5"></div>
            <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="h-40 bg-gray-200 rounded mb-6"></div>
          <div className="flex flex-wrap gap-4">
            <div className="h-10 w-40 bg-gray-200 rounded"></div>
            <div className="h-10 w-40 bg-gray-200 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 wide-container">
        <div className="container mx-auto text-center text-red-600 bg-red-50 p-6 rounded-lg shadow-md">
          <p className="text-xl font-semibold mb-2">Error Loading Tender</p>
          <p>{error}</p>
          <p className="mt-4">Please check your internet connection or try again later.</p>
        </div>
      </section>
    );
  }

  if (!tender) {
    return (
      <section className="py-12 wide-container">
        <div className="container mx-auto text-center text-gray-500 bg-white p-6 rounded-lg shadow-md">
          <p className="text-xl font-semibold mb-2">Tender Not Found</p>
          <p>The tender you are looking for does not exist or has been removed.</p>
        </div>
      </section>
    );
  }

  const closingColor = (due: string) => {
    const d = Math.ceil((new Date(due).getTime() - Date.now()) / 86_400_000);
    if (d <= 2) return 'text-[var(--color-accent-red)]';
    if (d <= 10) return 'text-[var(--color-accent-orange-dark)]';
    return 'text-gray-700';
  };

  return (
    <section className="bg-gray-50 py-8 sm:py-10 lg:py-12 wide-container">
      <div className="container mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* Main Tender Info */}
        <h1 className="text-3xl sm:text-4xl font-bold font-heading mb-4 text-[var(--color-primary)]">
          {tender.title}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Code: <span className="font-semibold text-gray-700">{tender.code}</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-gray-700 mb-8 pb-8 border-b border-gray-200">
          <div>
            <strong>Published Date:</strong> {new Date(tender.date).toLocaleDateString()}
          </div>
          <div>
            <strong>Closing Date:</strong> {new Date(tender.due_date).toLocaleDateString()}
          </div>
          <div>
            <strong>Province:</strong> {tender.province || 'Not specified'}
          </div>
          <div>
            <strong>District:</strong> {tender.district || 'Not specified'}
          </div>
          <div className={`font-semibold ${closingColor(tender.due_date)}`}>
            Closing in {Math.max(0, Math.ceil((new Date(tender.due_date).getTime() - Date.now()) / 86_400_000))} days
          </div>
          <div>
            <strong>Status:</strong> <span className="capitalize">{tender.status || 'N/A'}</span>
          </div>
        </div>

        {/* Description/Intro */}
        {(tender.intro || tender.description) && (
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold font-heading mb-3 text-gray-800">Overview</h2>
            {tender.intro && <p className="mb-2 text-gray-700">{tender.intro}</p>}
            {tender.description && <p className="text-gray-700">{tender.description}</p>}
            {!tender.intro && !tender.description && <p className="text-gray-500">No detailed description available.</p>}
          </div>
        )}

        {/* Categories */}
        {tender.categories && tender.categories.length > 0 && (
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold font-heading mb-3 text-gray-800">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {tender.categories.map(cat => (
                <span key={cat.id} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                  {cat.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Papers */}
        {tender.papers && tender.papers.length > 0 && (
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-bold font-heading mb-3 text-gray-800">Published In</h2>
            <div className="flex flex-wrap gap-2">
              {tender.papers.map(paper => (
                <span key={paper.id} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                  {paper.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related Files/Documents */}
        {(tender.english_tender_url || tender.sinhala_tender_url || tender.document_url || (tender.files && tender.files.length > 0)) && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold font-heading mb-3 text-gray-800">Documents</h2>
            <div className="flex flex-wrap gap-4">
              {tender.english_tender_url && (
                <Button
                  label="View English Notice"
                  className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 text-sm"
                  onClick={() => window.open(tender.english_tender_url!, '_blank')}
                />
              )}
              {tender.sinhala_tender_url && (
                <Button
                  label="View Sinhala Notice"
                  className="bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 text-sm"
                  onClick={() => window.open(tender.sinhala_tender_url!, '_blank')}
                />
              )}
              {tender.document_url && (
                <Button
                  label="View Document"
                  className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/80 text-sm"
                  onClick={() => window.open(tender.document_url!, '_blank')}
                />
              )}
              {tender.files && tender.files.map(file => (
                <Button
                  key={file.id}
                  label={`Download: ${file.title || file.type}`}
                  className="bg-gray-600 hover:bg-gray-700 text-sm"
                  onClick={() => window.open(`http://apitenders.3dhdesign.info/storage/${file.file}`, '_blank')}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TenderDetail;