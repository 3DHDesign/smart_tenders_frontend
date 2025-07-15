import React from 'react';
import MultiStepRegisterForm from '../../components/auth/MultiStepRegisterForm'; // NEW: Import the multi-step form

const Register: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen pt-16"> {/* Add pt-16 to offset Navbar */}
      <div className="container mx-auto py-8">
        <MultiStepRegisterForm />
      </div>
    </div>
  );
};

export default Register;