import React from 'react';
import PageBanner from '../components/shared/PageBanner'; // Import PageBanner 
import ContactFormSection from '../components/contact/ContactFormSection';

const ContactUs: React.FC = () => {
  return (
    <>
    <title>Contact Us | Get In Touch with SmartTenders.lk</title>
   <meta 
    name="description" 
    content="Have a question about tenders or our services? Contact the SmartTenders.lk team in Sri Lanka via our contact form, email, or phone. We are here to help you." 
   />
   <meta 
    name="keywords" 
    content="contact SmartTenders.lk, get in touch, contact form, email, phone number, Sri Lanka contact, tender support" 
   />

   {/* Open Graph Tags for Social Media */}
   <meta property="og:title" content="Get in Touch with SmartTenders.lk" />
   <meta property="og:description" content="Reach out to the SmartTenders.lk team with any questions or inquiries about our tender services." />
   <meta property="og:url" content="https://smarttenders.lk/contact-us" />
   <meta property="og:type" content="website" />
   <meta property="og:image" content="https://smarttenders.lk/images/contact-us-og.jpg" /> {/* Use a relevant image URL */}
   <link rel="canonical" href="https://smarttenders.lk/contact-us" />
     <div className="bg-gray-50 min-h-screen">
      {/* Page Banner for Contact Us */}
      <PageBanner
        title="Get In Touch With Us"
        backgroundImage="/images/download.png" // You'll need to place an image here
      />

      {/* Contact Form Section */}
      <ContactFormSection />

      {/* You can add other sections like FAQs, Map, etc. here later */}
    </div></>
   
  );
};

export default ContactUs;