import React, { useState } from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
};

interface FAQItem {
  question: string;
  answer: string;
}

const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData: FAQItem[] = [
    {
      question: "How do I check-in for my flight?",
      answer:
        "You can check-in online via our website or mobile app starting 24 hours before your scheduled departure. Alternatively, you can check-in at the airport kiosk or counter.",
    },
    {
      question: "What is the baggage allowance?",
      answer:
        "Baggage allowance varies by ticket type and destination. Please refer to your booking confirmation or our 'Baggage Information' section on the website for detailed specifics.",
    },
    {
      question: "Can I change my flight details?",
      answer:
        "Flight changes are subject to your ticket's fare rules. You can typically make changes online through 'Manage My Booking' or by contacting our customer service team. Fees may apply.",
    },
    {
      question: "What items are restricted on board?",
      answer:
        "For safety reasons, certain items are restricted or prohibited. This includes flammable liquids, explosives, and certain sharp objects. Please check our 'Restricted Items' guide for a comprehensive list.",
    },
    {
      question: "Is Wi-Fi available during the flight?",
      answer:
        "Wi-Fi availability depends on the aircraft and route. Many of our newer aircraft offer Wi-Fi services, which can be purchased onboard. Look for the Wi-Fi symbol when making your booking.",
    },
  ];

  return (
    <Container className="py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
          Find quick answers to common questions about your travel with us.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none focus:ring-blue-500 rounded-t-lg transition-colors duration-200 hover:bg-gray-50"
              onClick={() => toggleAccordion(index)}
              aria-expanded={openIndex === index ? "true" : "false"}
            >
              <span className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800">
                {faq.question}
              </span>
              <svg
                className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            <div
              className={`
                transition-all duration-300 ease-in-out
                ${
                  openIndex === index
                    ? "max-h-[500px] opacity-100 py-4 px-6"
                    : "max-h-0 opacity-0 px-6 pointer-events-none"
                }
              `}
            >
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default FAQAccordion;
