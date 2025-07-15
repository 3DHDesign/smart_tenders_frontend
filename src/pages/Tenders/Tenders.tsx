import React from 'react'; 
import PageBanner from '../../components/shared/PageBanner';
import TenderFilters from '../../components/tenders/TenderFilters';
import TenderListingSection from '../../components/home/TenderListingSection';

const Tenders: React.FC = () => {
  return (
    <div className=" "> {/* Removed pt-20 from here, as PageBanner will handle top spacing */}
      {/* Page Banner for Tenders page */}
      <PageBanner
        title="All Tenders" // Title for the Tenders page banner
        backgroundImage="/images/download.png" // You can use the same image or a different one
      />

      <div className="container mx-auto py-8"> {/* This container will now hold the filters and listing */}
        <TenderFilters /> {/* Render the new filter section first */}
        <TenderListingSection /> {/* Then render the main listing section */}
      </div>
    </div>
  );
};

export default Tenders;