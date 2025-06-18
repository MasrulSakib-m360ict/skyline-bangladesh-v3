import Container from "@/components/container";
import { Card } from "@/components/ui/card";
import siteInfo from "@/config/site.info";
import { Metadata } from "next";
import Image from "next/image";
import { Grid } from "../_components/memories";

export const metadata: Metadata = {
  title: `How It Works - ${siteInfo.name}`,
  description: `Learn how to book flights and travel services on ${siteInfo.name}.`,
};

export default function HowItWorks() {
  return (
    <section className=" text-gray-800 ">
      {/* Hero Section */}
      <div className="header">
        <Container className="h-60 flex items-end justify-start">
          <div className="h-20">
            <h1 className="text-4xl font-semibold text-white">How It Works</h1>
          </div>
        </Container>
      </div>
      <div className="overflow-hidden w-full relative">
        <Grid size={35} />
        <Container className="my-16">
          <div className="">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-12">
              The Booking Process
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Step 1: Search Flights",
                  description:
                    "Enter your departure and destination, dates, and select one-way or round-trip to begin your search.",
                  image: "/images/search-plan.jpg",
                },
                {
                  title: "Step 2: Compare Options",
                  description:
                    "Browse flight options, compare prices, layover times, and choose the best option for your schedule and budget.",
                  image: "/images/compare-options.png",
                },
                {
                  title: "Step 3: Book Your Ticket",
                  description:
                    "Select your flight, enter passenger details, and proceed to checkout for a secure booking experience.",
                  image: "/images/book-ticket.png",
                },
              ].map((step, index) => (
                <Card key={index} className="p-6 shadow-md text-center">
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={150}
                    height={100}
                    className="mx-auto mb-4 rounded-lg"
                  />
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-700">{step.description}</p>
                </Card>
              ))}
            </div>
          </div>
          <div className="mt-16">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
              Security & Reliability
            </h2>
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <Image
                src="/images/security.jpg"
                alt="Security"
                width={400}
                height={250}
                className="rounded-lg shadow-lg"
              />
              <div className="lg:w-1/2">
                <p className="text-lg leading-relaxed text-gray-700 mb-4">
                  We prioritize your security with encrypted payments and secure
                  booking processes. Your data is protected with the latest
                  security standards, so you can book with confidence.
                </p>
                <p className="text-lg leading-relaxed text-gray-700">
                  Our partnerships with trusted airlines worldwide ensure that
                  you get reliable services, up-to-date information, and
                  seamless experiences.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
