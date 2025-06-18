import Container from "@/components/container";
import { Card } from "@/components/ui/card";
import siteInfo from "@/config/site.info";
import { Metadata } from "next";
import Image from "next/image";
import { Grid } from "../_components/memories";
import { WhyUs } from "../_components/why-us";

export const metadata: Metadata = {
  title: `About Us - ${siteInfo.name}`,
  description: `Learn about ${siteInfo.name} and how we provide travel and lifestyle solutions to our users.`,
};

// const teamMembers = [
//   {
//     name: "Saud All Mizan",
//     role: "(Co-Founder) CEO",
//     image: "/images/about-us/M.png",
//   },
//   {
//     name: "Md. Fahim Foysal",
//     role: "(Co-Founder) COO",
//     image: "/images/about-us/M1.jpg",
//   },
//   {
//     name: "Noshin Islam",
//     role: "Head of Sales",
//     image: "/images/about-us/M2.jpg",
//   },
// ];
export default function AboutUs() {
  return (
    <section className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="header">
        <Container className="h-60 flex items-end justify-start">
          <div className="h-20">
            <h1 className="text-4xl font-semibold text-white">About Us</h1>
          </div>
        </Container>
      </div>
      <div className="overflow-hidden w-full relative">
        <Grid size={35} />
        <Container className="py-16 ">
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white backdrop-blur-lg rounded-lg shadow-lg overflow-hidden"
              >
                <Image
                  width={300}
                  height={200}
                  src={member.image}
                  alt={member.name}
                  className="w-full h-56 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold">{member.name}</h2>
                  <p className="text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div> */}

          <div className="">
            <h2 className="text-4xl font-bold text-gray-800 mb-10">
              Your Trusted Partner for Travel and Lifestyle Solutions
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Our mission is to simplify the lives of individuals of all ages by
              offering reliable and convenient services. We are dedicated to
              meeting both your travel and everyday needs with an unmatched
              commitment to quality and trust.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Comprehensive Services
                </h3>
                <p className="text-gray-600 mb-4">
                  Our platform allows you to pay bills, recharge your mobile,
                  and shop from your favorite brands—all from one convenient
                  location.
                </p>
                <p className="text-gray-600">
                  Experience a seamless process whether booking flights,
                  securing hotel rooms, or exploring thousands of holiday
                  packages.
                </p>
              </div>

              <div className="bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Mobile Experience
                </h3>
                <p className="text-gray-600 mb-4">
                  Our Android and iOS apps provide a user-friendly interface
                  that puts a world of solutions right at your fingertips.
                </p>
                <p className="text-gray-600">
                  Manage your daily tasks like paying bills and shopping
                  seamlessly within our app, ensuring convenience wherever you
                  are.
                </p>
              </div>

              <div className="bg-white shadow-lg rounded-lg transition-transform transform hover:scale-105 p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  ST Pay: Secure Payments
                </h3>
                <p className="text-gray-600 mb-4">
                  ST Pay is our innovative travel wallet designed for secure
                  online transactions. Whether you're paying for travel services
                  or lifestyle needs, ST Pay offers a trusted solution that
                  integrates effortlessly with our platform.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <WhyUs />
            </div>

            {/* Mission Section */}
            <div className="">
              <h2 className="text-2xl font-semibold text-gray-800 mb-8">
                Our Mission
              </h2>
              <p className="mx-auto text-lg leading-relaxed">
                Our mission is to make travel booking seamless, affordable, and
                accessible for everyone. We believe in transparency,
                reliability, and providing the best travel options to our users.
              </p>
            </div>
          </div>

          {/* Our Story Section */}
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                Founded in <span className="mx-1">{siteInfo.startYear}</span>,
                we started as a small team with a big dream—to revolutionize the
                way people book flights. Since then, we've grown into a leading
                OTA, connecting thousands of travelers with airlines worldwide.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-gray-700">
                Every day, we work tirelessly to improve our platform and
                provide the best experience for our users.
              </p>
            </div>
            <Image
              src="/images/story.png"
              alt="Our Story"
              width={500}
              height={400}
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </Container>
      </div>

      {/* Core Values Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto ">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
            Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Transparency", "Customer Satisfaction", "Innovation"].map(
              (value) => (
                <Card key={value} className="p-6 shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{value}</h3>
                  <p className="text-gray-700">
                    {`Our commitment to ${value.toLowerCase()} drives us every day as we work to provide the best booking experience.`}
                  </p>
                </Card>
              )
            )}
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      {/* <Container className="my-16">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
          Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((member) => (
            <Card key={member} className="p-4 text-center shadow-md">
              <Image
                src={`/images/team-member-${member}.jpg`}
                alt={`Team Member ${member}`}
                width={120}
                height={120}
                className="mx-auto rounded-full mb-4"
              />
              <h3 className="text-lg font-semibold">John Doe</h3>
              <p className="text-sm text-gray-600">Chief Technology Officer</p>
            </Card>
          ))}
        </div>
      </Container> */}
    </section>
  );
}
