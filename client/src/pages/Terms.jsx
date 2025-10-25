import  { useState } from 'react';
const Terms = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      content: 'Welcome to our e-commerce platform. These Terms of Use govern your use of our website and services. By accessing or using our platform, you agree to be bound by these terms.'
    },
    {
      id: 'account',
      title: 'User Accounts',
      content: 'To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You agree to provide accurate and current information.'
    },
    {
      id: 'purchases',
      title: 'Purchases and Payments',
      content: 'When making a purchase, you agree to provide valid payment information. All prices are listed in the current currency and are subject to change. We reserve the right to refuse or cancel any order.'
    },
    {
      id: 'shipping',
      title: 'Shipping and Delivery',
      content: 'Shipping times and costs vary depending on your location and selected shipping method. We are not responsible for delays caused by customs, international shipping, or other external factors.'
    },
    {
      id: 'returns',
      title: 'Returns and Refunds',
      content: 'Our return policy allows for returns within 30 days of purchase. Items must be unused, in original packaging, and accompanied by a valid receipt. Refunds are processed to the original method of payment.'
    },
    {
      id: 'privacy',
      title: 'Privacy and Data',
      content: 'We collect and use your personal information as described in our Privacy Policy. By using our platform, you consent to our data practices and agree to receive communications related to your account and purchases.'
    },
    {
      id: 'intellectual',
      title: 'Intellectual Property',
      content: 'All content on our platform, including text, graphics, logos, and images, is our property and protected by copyright laws. You may not reproduce, distribute, or create derivative works without our express permission.'
    },
    {
      id: 'limitation',
      title: 'Limitation of Liability',
      content: 'We strive to provide accurate information but do not warrant the completeness or accuracy of our content. We shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of our platform.'
    }
  ];

  return (
    <div className='dark:bg-gray-900 dark:text-white transition-colors duration-300'>
    <div className="py-12 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-7xl mx-auto  overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-64   border-r  border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            Terms of Use
          </h2>
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-4 py-2 rounded-full transition-colors duration-200 ${
                  activeSection === section.id 
                    ? 'secondaryColor text-white' 
                    : ''
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>

       
        <div className="flex-1 p-8 overflow-y-auto max-h-[700px]">
          {sections.map((section) => (
            activeSection === section.id && (
              <div key={section.id} className="prose prose-blue max-w-none">
                <h3 className="text-2xl font-semibold mb-4 border-b dark:border-gray-700 pb-2">
                  {section.title}
                </h3>
                <p className="leading-relaxed">
                  {section.content}
                </p>
              </div>
            )
          ))}
        </div>
      </div>


      <div className="max-w-5xl mx-auto mt-6  p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm">
            By using our platform, you agree to these Terms of Use.
          </p>
          <button className="  px-6 py-2 rounded-md  transition-colors">
            I Agree
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Terms;