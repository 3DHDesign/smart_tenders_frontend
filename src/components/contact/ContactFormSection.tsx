import React, { useState } from 'react';
import Button from '../shared/Button';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import emailjs from '@emailjs/browser';

const ContactFormSection: React.FC = () => {
  // === UPDATED: State keys now match EmailJS template placeholders ===
  const [formData, setFormData] = useState({
   name: '',
    email: '',
    company: '',
   mobile: '',
   message: '',
    file: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    // The name of the input/textarea is used to update the correct state key
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // ⚠️ IMPORTANT: Replace these with your actual IDs from EmailJS
    const serviceID = 'service_lk949ib';
    const templateID = 'template_tdmltm4';
    const publicKey = 'SWIr8kPWu_zl8rU96';

    // Since the formData keys now match the template, we can send it directly.
    emailjs.send(serviceID, templateID, formData, publicKey)
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          setSubmitMessage('Thank you for your message! We will get back to you soon.');
          setFormData({ name: '', email: '', company: '', mobile: '', message: '', file: null });
        },
        (error) => {
          console.error('FAILED...', error);
          setSubmitMessage('Something went wrong. Please try again later.');
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <section className="bg-gray-50 py-16 md:py-20 lg:py-24">
      <div className="wide-container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: "What will be next step?" */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 h-full">
            <h2 className="text-3xl font-bold font-heading text-[var(--color-dark)] mb-6">
              Our Process
            </h2>
            <p className="text-lg font-body text-gray-600 mb-8">
              You are one step closer to revolutionizing your tender acquisition. Here's how we work:
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-base shadow-md">1</span>
                <div>
                  <h4 className="text-xl font-semibold font-heading text-[var(--color-dark)] mb-1">Define Your Tender Needs</h4>
                  <p className="text-base font-body text-gray-700">Tell us about your specific tender requirements, industry, and target regions. We'll listen carefully.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-base shadow-md">2</span>
                <div>
                  <h4 className="text-xl font-semibold font-heading text-[var(--color-dark)] mb-1">Receive Tailored Opportunities</h4>
                  <p className="text-base font-body text-gray-700">Based on your profile, we'll provide a curated list of relevant tenders matching your exact criteria.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-base shadow-md">3</span>
                <div>
                  <h4 className="text-xl font-semibold font-heading text-[var(--color-dark)] mb-1">Streamline Your Bidding</h4>
                  <p className="text-base font-body text-gray-700">Access advanced tools and expert support to prepare and submit winning bids efficiently and effectively.</p>
                </div>
              </div>
            </div>
          </div>
          {/* Right Column: Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-xl font-bold font-heading text-[var(--color-dark)]">
                Send us your inquiry and we'll connect with you within <span className="text-[var(--color-primary)]">24 hours</span>.
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  // === UPDATED: name attribute to match template ===
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-gray-700 transition-colors duration-200"
                  required
                />
                <input
                  type="email"
                  // === UPDATED: name attribute to match template ===
                  name="email"
                  placeholder="Your E-mail"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-gray-700 transition-colors duration-200"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  // === UPDATED: name attribute to match template ===
                  name="company"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-gray-700 transition-colors duration-200"
                  required
                />
                <input
                  type="tel"
                  // === UPDATED: name attribute to match template ===
                  name="mobile"
                  placeholder="Mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-gray-700 transition-colors duration-200"
                  required
                />
              </div>
              <textarea
                // === UPDATED: name attribute to match template ===
                name="message"
                placeholder="Describe your tender needs or project details..."
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body resize-y text-gray-700 transition-colors duration-200"
                required
              ></textarea>
              <Button
                label={isSubmitting ? "Sending..." : "Send Inquiry"}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md flex items-center justify-center gap-2"
              >
                <FaEnvelopeOpenText className={isSubmitting ? 'animate-pulse' : ''} />
              </Button>
            </form>
            {submitMessage && (
              <p className="mt-4 text-center text-green-600 font-semibold">{submitMessage}</p>
            )}
            <p className="text-center text-gray-600 font-body text-sm mt-6">
              For immediate assistance, contact us directly at <a href="mailto:info@smarttenders.lk" className="text-[var(--color-primary)] hover:underline">info@smarttenders.lk</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
