import Container from "@/components/container";
import siteInfo from "@/config/site.info";
import { Metadata } from "next";
import { Grid } from "../../_components/memories";

export const metadata: Metadata = {
  title: `Terms & Condition - ${siteInfo.name}`,
  description: `Learn about the terms and conditions for using ${siteInfo.name} services.`,
};

const termsSections = [
  {
    title: "Acceptance of Terms",
    content: `By accessing the website, you confirm that you are at least 18 years old and have full capacity to enter into a legally binding contract. If you access the website in the course of your business or work then you hereby represent and warrant to ${siteInfo.name} that you have authority to bind the business or organization that you represent to these terms.`,
  },
  {
    title: "Provided Services",
    content: `${siteInfo.name} provides services for travel planning, which include but are not limited to flight booking, hotel reservation, travel packages, and travel insurance. All services provided herein are subject to availability and the terms of the respective service providers.`,
  },
  {
    title: "Booking Process",
    content: `The customer warrants that all the information provided for making any booking via our website is correct and complete. We have the right to decline, modify, or cancel reservations, where appropriate, and rooms remain subject to confirmation and availability. Any deposit or full payment may be requested upon making a booking. The rates are subject to change until such time as the booking is duly confirmed.`,
  },
  {
    title: "Payment Terms",
    content: `Payments may be made by using one or more of the payment methods included on our site. You agree to pay all fees and charges applicable to your bookings. Late payments may result in the cancellation of your booking.`,
  },
  {
    title: "Cancellations and Refunds",
    content: `Cancellation policies vary for service providers and it is your responsibility to familiarize yourself with the cancellation policy of the service provider offering the service you booked. All cancellations are required in writing to ${siteInfo.name}. Refunds will be given according to the policy of the service provider.`,
  },
  {
    title: "Amendments to Bookings",
    content: `Where amendments need to be effected, you should contact us as soon as possible. Amendments are subject to availability and additional costs may apply.`,
  },
  {
    title: "Travel Documents",
    content: `It is your responsibility to ensure that you are in possession of all necessary travel documents, including passports, visas, and any health-related documentation. ${siteInfo.name} is not liable for any problems that may arise due to improper documentation.`,
  },
  {
    title: "Limitation of Liability",
    content: `${siteInfo.name} shall not be held liable for any loss, damage, and/or injury resulting from your travel plans, including but not limited to delays, cancellations, or changes in itinerary. Our liability shall be limited to the maximum extent as provided by law.`,
  },
  {
    title: "Privacy Policy",
    content: `Your use of our website is also governed by our Privacy Policy, which governs how we collect, use, and safeguard your personal information. For further information, please refer to our Privacy Policy.`,
  },
  {
    title: "Governing Law",
    content: `These terms and conditions are governed by the laws of Bangladesh. Any disputes arising from these terms shall be resolved in the courts of Bangladesh.`,
  },
  {
    title: "Changes to Terms",
    content: `${siteInfo.name} reserves the right to change all or any of these terms from time to time. The revised terms will be effective from the date they are posted on the website. If you continue to use the website subsequent to any posting of changes in the terms, it will mean that you have accepted such changes.`,
  },
];

const TermsAndConditionsPage = () => {
  return (
    <div>
      <div className="header">
        <Container className="h-60 flex items-end justify-start">
          <div className="h-20">
            <h1 className="text-4xl font-semibold text-white">
              Terms and Conditions
            </h1>
          </div>
        </Container>
      </div>
      <div className="overflow-hidden w-full relative">
        <Grid size={35} />
        <Container className="py-16">
          <p className="mb-6">
            Welcome to {siteInfo.name}. By using or accessing our website you
            agree to be bound by and comply with the following terms of service.
            Please take a moment to review these terms carefully. If you do not
            agree to these terms, please do not use our website.
          </p>
          {termsSections.map((section, index) => (
            <section key={index} className="mb-6">
              <h2 className="mb-2 text-xl font-semibold">{section.title}</h2>
              <p>{section.content}</p>
            </section>
          ))}

          <section className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">12. Contact Us</h2>
            <p className="mb-2">
              If you have any questions about these terms and conditions, please
              contact us:
            </p>
            <p className="ml-4">
              Email:{" "}
              <a
                href={siteInfo.companyInfo.emails[0]}
                className="text-blue-500 underline"
              >
                {siteInfo.companyInfo.emails[0]}
              </a>
              <br />
              {siteInfo.companyInfo.address}
            </p>
          </section>
        </Container>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
