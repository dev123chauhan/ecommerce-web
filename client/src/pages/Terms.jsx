import  { useState } from 'react';
import { termsList } from '../lib/termsList';
const Terms = () => {
  const [activeSection, setActiveSection] = useState('overview');

  return (
    <div className='dark:bg-gray-900 dark:text-white transition-colors duration-300'>
    <div className="py-12 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-7xl mx-auto  overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-64   border-r  border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            Terms of Use
          </h2>
          <nav className="space-y-2">
            {termsList.map((section) => (
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
          {termsList.map((section) => (
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