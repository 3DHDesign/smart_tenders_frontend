// src/pages/Auth/Register.tsx
import React, { useState } from 'react';
import MultiStepRegisterForm from '../../components/auth/MultiStepRegisterForm';
import VerifyOTP from '../../components/auth/VerifyOTP';
 // Ensure this path is correct for your VerifyOTP component

const Register: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState(false); // State to control which component to show
  const [userEmail, setUserEmail] = useState(''); // State to pass email to VerifyOTP

  // This function is called from MultiStepRegisterForm after successful API registration
  const handleRegistrationSuccess = (email: string) => {
    setUserEmail(email);      // Store the email for OTP verification
    setIsRegistered(true);    // Switch to showing the VerifyOTP component
  };

  // This function is called from VerifyOTP after successful OTP verification
  const handleOtpVerified = () => {
    alert('Email verified successfully! You can now log in.'); // Inform the user
    // In a real application, you would likely redirect the user here:
    // navigate('/login'); // If you are using react-router-dom, for example
    // For now, we'll reset state to go back to the registration form (or you can show a success message)
    setIsRegistered(false);
    setUserEmail('');
  };

  // Allows user to go back to registration from OTP screen if needed
  const handleBackToRegister = () => {
    setIsRegistered(false);
    setUserEmail('');
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-16"> {/* Add pt-16 to offset Navbar */}
      <div className="container mx-auto py-8">
        {!isRegistered ? (
          // Render the multi-step registration form if not yet registered
          // --- CRITICAL FIX HERE: Pass the onRegistrationSuccess prop ---
          <MultiStepRegisterForm onRegistrationSuccess={handleRegistrationSuccess} />
        ) : (
          // Render the OTP verification component if registration was successful
          <VerifyOTP
            email={userEmail}
            onVerified={handleOtpVerified}
            onBackToRegister={handleBackToRegister}
          />
        )}
      </div>
    </div>
  );
};

export default Register;