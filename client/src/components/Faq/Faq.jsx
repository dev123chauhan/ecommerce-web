import { useState } from "react";
import PropTypes from "prop-types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

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

FAQItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
};

const FAQSection = ({ title, items }) => (
  <div className="shadow-md rounded-lg p-6 mb-6">
    <h2 className="text-2xl font-bold mb-6 dark:border-gray-700 border-b pb-3">{title}</h2>
    {items.map((faq, index) => (
      <FAQItem key={index} question={faq.question} answer={faq.answer} />
    ))}
  </div>
);

FAQSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const Faq = () => {
  const faqData = [
    {
      title: "Ordering",
      items: [
        {
          question: "How do I place an order?",
          answer:
            "Browse our products, select the items you want, add them to your cart, and proceed to checkout. Create an account or check out as a guest.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.",
        },
      ],
    },
    {
      title: "Shipping & Delivery",
      items: [
        {
          question: "How long does shipping take?",
          answer:
            "Standard shipping takes 3-5 business days. Express shipping is available at checkout for 1-2 day delivery.",
        },
        {
          question: "Do you ship internationally?",
          answer:
            "We currently ship to the United States and Canada. International shipping options are being expanded.",
        },
      ],
    },
    {
      title: "Returns & Exchanges",
      items: [
        {
          question: "What is our return policy?",
          answer:
            "We offer a 30-day return policy for unworn, unwashed items with original tags attached. Refunds are processed within 5-7 business days.",
        },
        {
          question: "How do I initiate a return?",
          answer:
            'Log into your account, go to "Order History", select the item you wish to return, and follow the return process.',
        },
      ],
    },
  ];

  return (
    <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold  mb-12">
            Frequently Asked Questions
          </h1>

          {faqData.map((section, index) => (
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
