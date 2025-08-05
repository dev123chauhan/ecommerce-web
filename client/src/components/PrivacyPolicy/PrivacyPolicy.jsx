import { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp } from 'lucide-react';

const PolicySection = ({ 
  title, 
  children, 
  sectionKey, 
  openSections, 
  toggleSection,
  className 
}) => (
  <div className={`mb-6 border-b dark:border-b-gray-700 pb-4 ${className}`}>
    <button 
      onClick={() => toggleSection(sectionKey)} 
      className="w-full flex justify-between items-center text-left font-bold text-lg transition-colors"
    >
      <span>{title}</span>
      {openSections[sectionKey] ? <ChevronUp /> : <ChevronDown />}
    </button>
    <div 
      className={`
        overflow-hidden transition-all duration-300 ease-in-out
        ${openSections[sectionKey] 
          ? 'max-h-screen opacity-100 mt-4' 
          : 'max-h-0 opacity-0 mt-0'
        }
      `}
    >
      <div className="leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);


PolicySection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  sectionKey: PropTypes.string.isRequired,
  openSections: PropTypes.objectOf(PropTypes.bool).isRequired,
  toggleSection: PropTypes.func.isRequired,
  className: PropTypes.string
};



const PrivacyPolicy = ({ 
  companyName = 'Example Company', 
  contactEmail = 'privacy@example.com',
  lastUpdated = 'November 26, 2024'
}) => {
  const [openSections, setOpenSections] = useState({
    dataCollection: false,
    dataUse: false,
    dataSharing: false,
    userRights: false,
    security: false,
    cookiesTracking: false,
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className='dark:bg-gray-900 dark:text-white transition-colors duration-300 pt-20'>
    <div className="container mx-auto  max-w-7xl px-4  sm:px-6 lg:px-0">
      <h1 className="text-3xl font-bold mb-8">
        Privacy Policy
      </h1>
      
      <div className="shadow-md rounded-lg p-6">
        <p className="mb-6">
          Last Updated: {lastUpdated}
        </p>

        <PolicySection 
          title="Data Collection" 
          sectionKey="dataCollection"
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <p>
            {companyName} collects information you provide directly to us, such as when you create an account, 
            use our services, or contact our support team. This may include:
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>Personal identification information</li>
            <li>Contact details</li>
            <li>Usage data and analytics</li>
            <li>Device and browser information</li>
          </ul>
        </PolicySection>

        <PolicySection 
          title="How We Use Your Data" 
          sectionKey="dataUse"
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <p>
            We use the collected data to:
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>Provide and improve our services</li>
            <li>Communicate with you</li>
            <li>Process transactions</li>
            <li>Personalize user experience</li>
            <li>Ensure platform security</li>
          </ul>
        </PolicySection>

        <PolicySection 
          title="Data Sharing" 
          sectionKey="dataSharing"
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <p>
            We may share your data with:
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>Service providers and partners</li>
            <li>Legal authorities when required</li>
            <li>With your explicit consent</li>
          </ul>
          <p className="mt-4 text-sm italic">
            We do not sell personal information to third parties.
          </p>
        </PolicySection>

        <PolicySection 
          title="User Rights" 
          sectionKey="userRights"
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <p>
            You have the right to:
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>Access your personal data</li>
            <li>Request data correction</li>
            <li>Delete your account and data</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </PolicySection>

        <PolicySection 
          title="Security Measures" 
          sectionKey="security"
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <p>
            We implement industry-standard security protocols:
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>Encryption of sensitive data</li>
            <li>Regular security audits</li>
            <li>Access controls and authentication</li>
            <li>Secure data storage practices</li>
          </ul>
        </PolicySection>

        <PolicySection 
          title="Cookies and Tracking" 
          sectionKey="cookiesTracking"
          openSections={openSections}
          toggleSection={toggleSection}
        >
          <p>
            We use cookies and similar tracking technologies to:
          </p>
          <ul className="list-disc pl-5 mt-2">
            <li>Improve user experience</li>
            <li>Analyze site traffic</li>
            <li>Personalize content</li>
          </ul>
          <p className="mt-4 text-sm italic">
            You can manage cookie preferences in your browser settings.
          </p>
        </PolicySection>

        <div className="mt-8 text-center text-sm">
          <p>
            Questions? Contact us at {contactEmail}
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};


PrivacyPolicy.propTypes = {
  companyName: PropTypes.string,
  contactEmail: PropTypes.string,
  lastUpdated: PropTypes.string
};

export default PrivacyPolicy;