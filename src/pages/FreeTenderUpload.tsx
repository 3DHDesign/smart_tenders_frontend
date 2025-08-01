import React, { useState } from "react";
import Button from "../components/shared/Button"; // Assuming this is your custom Button component
import { uploadFreeTender } from "../services/freeTenderService"; // Assuming this service exists

const FreeTenderUpload: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [source, setSource] = useState("");
  const [image, setImage] = useState<File | null>(null);

  // ✅ Error states for subject and image
  const [subjectError, setSubjectError] = useState("");
  const [imageError, setImageError] = useState("");

  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 [Debug] Submit button clicked. Starting validation...");

    // 🔴 Clear old errors and status messages before validating again
    setSubjectError("");
    setImageError("");
    setStatus(null);

    // 🔴 Validation logic
    let valid = true;

    // Check if the subject is empty or only contains whitespace
    if (!subject.trim()) {
      setSubjectError("⚠️ Subject is required");
      valid = false;
      console.log("❌ [Debug] Subject validation failed.");
    }

    // Check if an image file has been selected
    if (!image) {
      setImageError("⚠️ Image is required");
      valid = false;
      console.log("❌ [Debug] Image validation failed.");
    }

    // If any validation failed, stop the function and do not proceed with the submission
    if (!valid) {
      console.log("❌ [Debug] Validation failed. Submission aborted.");
      return;
    }

    // ✅ If we get here, validation passed. Proceed with submission.
    console.log("✅ [Debug] Validation passed. Preparing to upload...");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("subject", subject);
      if (phone) formData.append("phone", phone);
      if (email) formData.append("email", email);
      if (message) formData.append("message", message);
      if (source) formData.append("source", source);
      if (image) formData.append("image", image);

      // 🔵 Debug log to confirm all fields are in the FormData object
      console.log("📤 [Debug] FormData contents:");
      for (let [key, value] of formData.entries()) {
        console.log(`- Key: ${key}, Value:`, value);
      }

      // Call the API service to upload the data
      const res = await uploadFreeTender(formData);
      console.log("✅ [Debug] Server response:", res);
      setStatus(res.message || "✅ Tender uploaded successfully!");

      // ✅ Clear the form state after a successful upload
      setSubject("");
      setPhone("");
      setEmail("");
      setMessage("");
      setSource("");
      setImage(null);

      // Reset the file input field visually
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
    } catch (err) {
      console.error("❌ [Debug] Upload error:", err);
      // Display a user-friendly error message
      setStatus("❌ Failed to upload tender");
    } finally {
      // Always set loading to false, regardless of success or failure
      setLoading(false);
      console.log("✅ [Debug] Submission process finished.");
    }
  };

  return (
    <div className="wide-container mx-auto py-12">
      <h1 className="text-3xl font-bold text-[var(--color-dark)] mb-6">
        Upload Your Tender Free
      </h1>
      <p className="mb-8 text-gray-600">
        Fill out the form below to submit your tender for free.
      </p>

      {/* Display a status message for success or failure */}
      {status && (
        <div
          className={`mb-4 text-center font-semibold ${
            status.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {status}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 space-y-6 max-w-2xl mx-auto"
      >
        {/* ✅ SUBJECT (Required) */}
        <div>
          <input
            type="text"
            placeholder="Tender Subject *"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={`w-full p-3 border rounded-md ${
              subjectError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {/* Display the subject error message */}
          {subjectError && (
            <p className="text-red-500 text-sm mt-1">{subjectError}</p>
          )}
        </div>

        {/* OPTIONAL FIELDS */}
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 border rounded-md"
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-md"
        />

        <textarea
          placeholder="Tender Details / Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 border rounded-md h-28"
        />

        <input
          type="text"
          placeholder="Tender Source (Optional)"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="w-full p-3 border rounded-md"
        />

        {/* ✅ IMAGE UPLOAD (Required) */}
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files ? e.target.files[0] : null;
              setImage(file);
              console.log("📷 [Debug] File selected:", file);
            }}
            className={`w-full p-3 border rounded-md ${
              imageError ? "border-red-500" : "border-gray-300"
            }`}
          />
          {/* Display the image error message */}
          {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
        </div>

        {/* ✅ SUBMIT BUTTON */}
        <Button
          type="submit" // ❗ This is the crucial line to ensure the form submits
          label={loading ? "Uploading..." : "Submit Tender"}
          className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 text-white py-3 text-lg font-semibold"
        />
      </form>
    </div>
  );
};

export default FreeTenderUpload;