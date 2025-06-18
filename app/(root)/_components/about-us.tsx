import Container from "@/components/container";

const AboutUs = () => {
  return (
    <Container className="mb-20">
      <section className="">
        <div className="mb-10">
          <h1 className="">About Us</h1>
          <p className="text-gray-700">
            At TravelSmart, we are dedicated to providing travelers with
            seamless experiences and exceptional services, ensuring that every
            journey is memorable and enjoyable.
          </p>
        </div>
      </section>

      <section className="grid gap-4 col-span-8">
        <div className="p-6  shadow col-span-8 md:col-span-3">
          <h2 className="text-2xl font-semibold mb-4">Vision</h2>
          <p>
            Our vision is to be the leading online travel agency, where
            travelers can explore a world of opportunities and create lasting
            memories through easy and accessible travel solutions.
          </p>
        </div>

        <div className="p-6  shadow col-span-8 md:col-span-5">
          <h2 className="text-2xl font-semibold mb-4">Mission</h2>
          <p>
            Our mission is to simplify travel planning and booking for our
            customers by offering a wide range of options, competitive pricing,
            and unparalleled customer support, making every travel experience
            enjoyable and hassle-free.
          </p>
        </div>

        <div className="col-span-8">
          <div className="relative h-full ml-0 mr-0">
            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#F1F5F5]"></span>
            <div className="relative h-full p-5 bg-white border-2 border-[#F1F5F5]">
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <ul className="list-disc list-inside">
                <li>
                  Customer-Centricity - We prioritize our customers&apos; needs
                  and strive to exceed their expectations at every touchpoint.
                </li>
                <li>
                  Integrity - We believe in honesty and transparency in all our
                  dealings with customers, partners, and each other.
                </li>
                <li>
                  Innovation - We continuously seek to enhance our services and
                  technology to improve the travel experience for our users.
                </li>
                <li>
                  Collaboration - We work together as a team, leveraging our
                  diverse expertise to provide the best travel solutions for our
                  customers.
                </li>
                <li>
                  Sustainability - We are committed to promoting responsible
                  travel and minimizing our environmental impact.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default AboutUs;
