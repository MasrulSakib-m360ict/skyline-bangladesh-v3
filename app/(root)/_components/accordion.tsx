import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQAccordion: React.FC = () => {
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
    <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600">
          Find quick answers to common questions about your travel with us.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg"
            >
              <AccordionTrigger
                className={`w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none rounded-t-lg transition-all duration-300 hover:bg-secondary group data-[state=open]:bg-secondary hover:no-underline`}
              >
                <span className="text-base sm:text-lg lg:text-xl font-semibold transition-colors duration-200 group-data-[state=open]:text-white text-gray-800 group-hover:text-white">
                  {faq.question}
                </span>
                <svg
                  className="w-6 h-6 transition-all duration-300 text-secondary/70 group-hover:text-white group-data-[state=open]:text-white group-data-[state=open]:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                ></svg>
              </AccordionTrigger>
              <AccordionContent className="transition-all duration-300 ease-in-out overflow-hidden px-6 py-4 text-sm sm:text-base text-gray-700 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQAccordion;
