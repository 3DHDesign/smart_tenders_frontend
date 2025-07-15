import React, { useState } from 'react';
import Button from '../shared/Button'; // Your shared Button component
import { FiMail, FiPhone, FiMapPin, FiPaperclip, FiZap } from 'react-icons/fi'; // Icons for contact info and file upload

const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    projectDetails: '',
    file: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, file: null });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Simulate API call
    setTimeout(() => {
      alert('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', company: '', budget: '', projectDetails: '', file: null }); // Reset form
    }, 1500);
  };

  return (
    // Section with a light background for modernity
    <section className="bg-gray-50 py-16 md:py-20 lg:py-24">
      <div className="wide-container mx-auto">
        {/* Top Section: Contact Us Intro (Dark background for contrast) */}
        <div className="bg-[var(--color-dark)] text-white rounded-2xl p-8 md:p-12 lg:p-16 mb-12 md:mb-16 shadow-xl">
          <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-3">
            Get In Touch With SmartTenders
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-body max-w-3xl mx-auto">
            We're here to help you streamline your tender acquisition process. Reach out to our team with your questions or requirements.
          </p>
        </div>

        {/* Main Content Grid: "What will be next step?" and Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: "What will be next step?" */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h2 className="text-3xl font-bold font-heading text-[var(--color-dark)] mb-6">
              Our Process
            </h2>
            <p className="text-lg font-body text-gray-600 mb-8">
              You are one step closer to revolutionizing your tender acquisition. Here's how we work:
            </p>

            {/* Numbered Steps */}
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
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Form Header */}
            <div className="flex items-center gap-3 mb-6">
              <FiZap className="text-[var(--color-primary)] text-3xl" />
              <h3 className="text-xl font-bold font-heading text-[var(--color-dark)]">
                Send us your inquiry and we'll connect with you within <span className="text-[var(--color-primary)]">24 hours</span>.
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name and Email - Two Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-gray-700 transition-colors duration-200"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your E-mail"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-gray-700 transition-colors duration-200"
                    required
                  />
                </div>
              </div>

              {/* Company and Budget - Two Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-gray-700 transition-colors duration-200"
                    required
                  />
                </div>
                <div>
                  <input
                    type="text"
                    name="budget"
                    placeholder="Approx. Project Budget (Optional)"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body text-gray-700 transition-colors duration-200"
                  />
                </div>
              </div>

              {/* Project Details */}
              <div>
                <textarea
                  name="projectDetails"
                  placeholder="Describe your tender needs or project details..."
                  rows={6}
                  value={formData.projectDetails}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] font-body resize-y text-gray-700 transition-colors duration-200"
                  required
                ></textarea>
              </div>

              {/* File Upload Area */}
              <div>
                <label className="flex items-center justify-center p-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                  <FiPaperclip className="text-xl text-gray-500 mr-2" />
                  <span className="text-gray-700 font-body text-sm">
                    {formData.file ? formData.file.name : 'Upload Documents (e.g., RFP, project brief) - Optional'}
                  </span>
                  <input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Submit Button */}
              <Button
                label="Send Inquiry"
                type="submit"
                className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md"
              />
            </form>

            {/* Bottom Contact Email */}
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