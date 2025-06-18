import Container from "@/components/container";
import { Poppins } from "next/font/google";
import Image from "next/image";

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "300", "400", "500", "700", "900"],
});

const ShortPromo = () => {
  const data = [
    {
      id: 1,
      img: "/images/shortPromo/1.png",
      title: "Competitive Pricing",
      description:
        "We provide exceptional value for our high-quality services.",
    },
    {
      id: 2,
      img: "/images/shortPromo/2.png",
      title: "Worldwide Coverage",
      description: "Experience our services wherever you are in the world.",
    },
    {
      id: 3,
      img: "/images/shortPromo/3.png",
      title: "Fast Booking",
      description:
        "Secure your spot quickly and easily with our streamlined booking process.",
    },
    {
      id: 4,
      img: "/images/shortPromo/4.png",
      title: "Guided Tours",
      description:
        "Embark on enriching journeys with our knowledgeable and passionate guides.",
    },
  ];
  return (
    <Container className="mx-auto pt-20">
      <div className="grid md:grid-cols-4 grid-cols-2 gap-8">
        {data.map((promo) => (
          <div className="relative" key={promo.id}>
            <div className="flex items-center justify-center flex-col text-center">
              <Image src={promo.img} alt="" width={120} height={120} />
              <div>
                <h1
                  className={`${poppins.className} text-[#1B2B47] text-[20px] font-[500]`}
                  style={{ letterSpacing: "1px" }}
                >
                  {promo.title}
                </h1>
                <p
                  className="mt-1 text-[14px] text-[#7A7A7A]"
                  style={{
                    letterSpacing: "1px",
                  }}
                >
                  {promo.description}
                </p>
              </div>
            </div>
            <div className="short-image-container absolute 2xl:top-[-35px] top-[-16px] w-full">
              <Image
                src={"/images/shortPromo/bg.jpg"}
                alt="destination image"
                width={500}
                height={500}
              />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default ShortPromo;
