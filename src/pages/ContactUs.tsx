import React from 'react';
import PageBanner from '../components/shared/PageBanner'; // Import PageBanner 
import ContactFormSection from '../components/contact/ContactFormSection';

const ContactUs: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Banner for Contact Us */}
      <PageBanner
        title="Get In Touch With Us"
        backgroundImage="/images/download.png" // You'll need to place an image here
      />

      {/* Contact Form Section */}
      <ContactFormSection />

      {/* You can add other sections like FAQs, Map, etc. here later */}
    </div>
  );
};

export default ContactUs;