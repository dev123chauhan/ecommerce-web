import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import { faqList } from "../lib/faqList";
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b dark:border-gray-700 border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left focus:outline-none transition-all duration-300 ease-in-out"
      >
        <h3 className="text-lg font-semibold">{question}</h3>
        <div className="transition-all duration-300 ease-in-out">
          {isOpen ? <ChevronUp className="" /> : <ChevronDown className="" />}
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out  ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {isOpen && <p className="mt-3 text-base">{answer}</p>}
      </div>
    </div>
  );
};
const FAQSection = ({ title, items }) => (
  <div className="shadow-md rounded-lg  mb-6">
    <h2 className="text-2xl font-bold mb-6 dark:border-gray-700 border-b pb-3">{title}</h2>
    {items.map((faq, index) => (
      <FAQItem key={index} question={faq.question} answer={faq.answer} />
    ))}
  </div>
);
const Faq = () => {
  return (
    <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold  mb-12">
            Frequently Asked Questions
          </h1>

          {faqList.map((section, index) => (
            <FAQSection
              key={index}
              title={section.title}
              items={section.items}
            />
          ))}

          <div className="mt-10 text-center">
            <p className="">
              Cant find the answer you are looking for?
              <Link
                to="/contact"
                className="ml-2 text-blue-600 hover:underline"
              >
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
