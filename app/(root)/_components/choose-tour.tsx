import Container from "@/components/container";
import { Cormorant_Garamond, Poppins, Seaweed_Script } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "700", "900"],
});
const Seaweed = Seaweed_Script({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});
const Cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const ChooseTour = () => {
  const data = [
    {
      id: 1,
      title: "Accommodation",
      description: "Find your ideal stay: B&Bs to luxury hotels.",
      img: "/images/tour/1.png",
    },
    {
      id: 2,
      title: "Best Menu",
      description: "Let us craft your dream vacation.",
      img: "/images/tour/2.png",
    },
    {
      id: 3,
      title: "Best Price",
      description: "Book your stay & save with our deals.",
      img: "/images/tour/3.png",
    },
    {
      id: 4,
      title: "Best Travel Agent",
      description: "Savor delicious food on your travels.",
      img: "/images/tour/4.png",
    },
    {
      id: 5,
      title: "Beautiful Places",
      description: "Uncover stunning places & create memories.",
      img: "/images/tour/5.png",
    },
    {
      id: 6,
      title: "Rental Camera",
      description: "Embark on extraordinary journeys with us.",
      img: "/images/tour/6.png",
    },
    {
      id: 7,
      title: "Best Hotel",
      description: "Get the best value for your travel budget.",
      img: "/images/tour/7.png",
    },
    {
      id: 8,
      title: "Passionate Travel",
      description: "Capture stunning travel moments in style.",
      img: "/images/tour/8.png",
    },
    {
      id: 9,
      title: "Luxurious Cruise",
      description: "Explore the world in style on an unforgettable cruise.",
      img: "/images/tour/9.png",
    },
  ];

  return (
    <div className="relative ">
      <div
        style={{
          backgroundImage: "url(/images/destination/icotrav022.png)",
          backgroundPosition: "center center",
          backgroundSize: " cover",
          opacity: "0.1",
          backgroundRepeat: "no-repeat",
          transition: "background 0.3s, border-radius 0.3s, opacity 0.3s",
        }}
        className="absolute w-full h-full z-[-1]"
      ></div>
      <Container className="py-20">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-neutral-800  text-center">
            About Us
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-neutral-600  text-center">
            We are a team of travel enthusiasts dedicated to providing you with
            the best travel experiences. Learn more about our vision, mission,
            and values.
          </p>
        </div>

        <section className="grid gap-4 col-span-8 ">
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
              customers by offering a wide range of options, competitive
              pricing, and unparalleled customer support, making every travel
              experience enjoyable and hassle-free.
            </p>
          </div>

          <div className="col-span-8">
            <div className="relative h-full ml-0 mr-0">
              <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#F1F5F5]"></span>
              <div className="relative h-full p-5 bg-white border-2 border-[#F1F5F5]">
                <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
                <ul className="list-disc list-inside">
                  <li>
                    Customer-Centricity - We prioritize our customers&apos;
                    needs and strive to exceed their expectations at every
                    touchpoint.
                  </li>
                  <li>
                    Integrity - We believe in honesty and transparency in all
                    our dealings with customers, partners, and each other.
                  </li>
                  <li>
                    Innovation - We continuously seek to enhance our services
                    and technology to improve the travel experience for our
                    users.
                  </li>
                  <li>
                    Collaboration - We work together as a team, leveraging our
                    diverse expertise to provide the best travel solutions for
                    our customers.
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
        {/* <div className="md:grid grid-cols-4 gap-8 items-center">
          <div className="col-span-4 grid md:grid-cols-3 grid-cols-1 gap-8">
            {data.map((item, index) => (
              <div
                className="box flex mb-6 items-center gap-6 w-full"
                key={index}
              >
                <div>
                  <Image
                    src={item.img}
                    alt="tour image"
                    width={500}
                    height={500}
                    className="w-[90px]"
                  />
                </div>
                <div>
                  <h1
                    className={`${poppins.className} text-[#1B2B47] text-[20px] mb-[1px] font-[500]`}
                    style={{
                      letterSpacing: "1px",
                    }}
                  >
                    {item.title}
                  </h1>
                  <p
                    className={`${poppins.className} text-[13px] font-[300]`}
                    style={{
                      letterSpacing: "1.5px",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </Container>
    </div>
  );
};

export default ChooseTour;
