import Container from "@/components/container";
import siteInfo from "@/config/site.info";
import { Metadata } from "next";
import { Grid } from "../../_components/memories";

export const metadata: Metadata = {
  title: `Privacy Policy - ${siteInfo.name}`,
  description: `Learn about how we handle your personal data and protect your privacy at ${siteInfo.name}.`,
};

const PrivacyPolicyPage = () => {
  return (
    <div className="">
      <div className="header">
        <Container className="h-60 flex items-end justify-start">
          <div className="h-20">
            <h1 className="text-4xl font-semibold text-white">
              Privacy Policy
            </h1>
          </div>
        </Container>
      </div>
      <div className="overflow-hidden w-full relative">
        <Grid size={35} />
        <Container className="py-16 ">
          <h1 className="mb-4 block text-2xl font-bold md:hidden">
            Privacy Policy
          </h1>
          <p className="mb-6">
            {siteInfo.name} Address: BEL Tower, Ground Floor, House 19, Road 1,
            Dhanmondi, Dhaka 1205, Bangladesh. At{siteInfo.name}, we are
            committed to protecting and preserving the privacy of our visitors
            and customers when visiting our site or communicating electronically
            with us. This Privacy Policy explains how we process any personal
            data we collect from you or that you provide to us through our
            website and social media sites. By using our services, you agree to
            the collection and use of information in accordance with this
            policy.
          </p>

          <section className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">
              Information We Collect
            </h2>
            <p className="mb-2">
              We may collect and process the following data about you:
            </p>
            <ul className="ml-4 list-inside list-disc">
              <li className="mb-1">
                Personal Identification Information: Name, email address, phone
                number, and address.
              </li>
              <li className="mb-1">
                Travel Information: Passport details, travel itinerary, and
                booking details.
              </li>
              <li className="mb-1">
                Payment Information: Credit card details, billing address, and
                transaction history.
              </li>
              <li className="mb-1">
                Technical Data: IP address, browser type and version, time zone
                setting, browser plug-in types and versions, operating system
                and platform, and other technology on the devices you use to
                access this website.
              </li>
              <li className="mb-1">
                Usage Data: Information about how you use our website, products,
                and services.
              </li>
              <li className="mb-1">
                Marketing and Communications Data: Your preferences in receiving
                marketing from us and your communication preferences.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">
              How We Use Your Information
            </h2>
            <p className="mb-2">
              We use the information we collect in the following ways:
            </p>
            <ul className="ml-4 list-inside list-disc">
              <li className="mb-1">
                To Provide Our Services: Processing your bookings, managing
                payments, and providing customer support.
              </li>
              <li className="mb-1">
                To Improve Our Website: Ensuring that content is presented in
                the most effective manner for you and your device.
              </li>
              <li className="mb-1">
                To Communicate With You: Sending booking confirmations, updates,
                and notifications related to your travel.
              </li>
              <li className="mb-1">
                To Market Our Services: Sending promotional materials and
                newsletters, only if you have consented to receive them.
              </li>
              <li className="mb-1">
                To Comply With Legal Obligations: Ensuring compliance with
                applicable laws and regulations.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">
              Sharing Your Information
            </h2>
            <p className="mb-2">We may share your information with:</p>
            <ul className="ml-4 list-inside list-disc">
              <li className="mb-1">
                Service Providers: Third-party companies and individuals
                employed to facilitate our services, provide the service on our
                behalf, perform service-related services, or assist us in
                analyzing how our service is used.
              </li>
              <li className="mb-1">
                Business Partners: Airlines, hotels, and other travel service
                providers to fulfill your booking requests.
              </li>
              <li className="mb-1">
                Legal Requirements: Where required by law, we may disclose your
                information to authorities or regulatory bodies.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">Data Security</h2>
            <p>
              We take the security of your personal data very seriously. We
              implement appropriate technical and organizational measures to
              protect your data from unauthorized access, use, alteration, and
              disclosure. All payment transactions are encrypted using SSL
              technology.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">Your Rights</h2>
            <p className="mb-2">You have the right to:</p>
            <ul className="ml-4 list-inside list-disc">
              <li className="mb-1">
                Access: Request access to your personal data.
              </li>
              <li className="mb-1">
                Correction: Request correction of the personal data that we hold
                about you.
              </li>
              <li className="mb-1">
                Erasure: Request the erasure of your personal data.
              </li>
              <li className="mb-1">
                Objection: Object to the processing of your personal data where
                we are relying on a legitimate interest.
              </li>
              <li className="mb-1">
                Restriction: Request the restriction of processing of your
                personal data.
              </li>
              <li className="mb-1">
                Transfer: Request the transfer of your personal data to another
                party.
              </li>
            </ul>
          </section>

          <section className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">Cookies</h2>
            <p>
              We use cookies to distinguish you from other users of our website.
              This helps us provide you with a good experience when you browse
              our website and also allows us to improve our site. For detailed
              information on the cookies we use and the purposes for which we
              use them, see our Cookie Policy.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">
              Changes to Our Privacy Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. Any changes we
              make will be posted on this page and, where appropriate, notified
              to you by email. Please check back frequently to see any updates
              or changes to our Privacy Policy.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="mb-2 text-xl font-semibold">Contact Us</h2>
            <p className="mb-2">
              If you have any questions about this Privacy Policy, please
              contact us:{" "}
              <a
                href={siteInfo.companyInfo.emails[0]}
                className="text-blue-500 underline"
              >
                {siteInfo.companyInfo.emails[0]}
              </a>
            </p>
          </section>
        </Container>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
