import React from 'react';

const MissionSection: React.FC = () => {
  return (
    <section className="wide-container bg-white py-12 md:py-16 lg:py-20">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold font-heading text-[var(--color-dark)] mb-6 text-center">
          Our Mission at SmartTenders
        </h2>
        <p className="mb-4 leading-relaxed text-[var(--color-dark)] font-body"> {/* KEY FIX: Using var(--color-dark) for body text */}
          SmartTenders is dedicated to revolutionizing the tender and procurement process across Sri Lanka. Our platform serves as a vital bridge, connecting businesses with relevant public and private sector opportunities, fostering transparency, efficiency, and sustainable growth within the bidding ecosystem.
        </p>
        <p className="mb-4 leading-relaxed text-[var(--color-dark)] font-body"> {/* KEY FIX: Using var(--color-dark) for body text */}
          Founded on the principles of innovation, integrity, and user-centric design, we strive to provide an intuitive and robust solution for both tender issuers and bidders. We understand the complexities of the local procurement landscape and have built SmartTenders to simplify every step, from tender discovery and analysis to secure bid submission and successful award management.
        </p>
        <p className="leading-relaxed text-[var(--color-dark)] font-body"> {/* KEY FIX: Using var(--color-dark) for body text */}
          Our team is composed of passionate professionals committed to delivering a superior experience. We continuously work to enhance our features, ensure data security, and provide exceptional support to our community, empowering every user to navigate the world of tenders with confidence. Join SmartTenders today and be part of the future of procurement in Sri Lanka.
        </p>
      </div>
    </section>
  );
};

export default MissionSection;