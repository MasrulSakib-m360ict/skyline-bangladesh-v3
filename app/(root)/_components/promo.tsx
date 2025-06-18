import Container from "@/components/container";
import { Rubik } from "next/font/google";
import Image from "next/image";

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700", "900"],
});

const Promo = () => {
  return (
    <div
      style={{
        backgroundColor: "#FAF5EE",
        backgroundImage: "url(images/bg/bottom-shape.webp)",
        backgroundPosition: "bottom center",
        backgroundRepeat: "no-repeat",
        padding: "58px 0px 50px",
      }}
      className="md:block "
    >
      <Container className="">
        <div className="grid md:grid-cols-3 grid-cols-1 items-start 2xl:gap-8 gap-4">
          <div className="box flex items-center 2xl:gap-6 gap-4">
            <div className="bg-secondary shadow-xl rounded-full p-4 animate-bounce overflow-hidden">
              <Image
                src={"/images/shortPromo/1.png"}
                alt="ticket.png"
                width={120}
                height={120}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <h1
                className={`${rubik.className} text-2xl font-bold mb-1 text-[#363539]`}
              >
                AIR TICKET
              </h1>
              <p className="text-sm text-[#7A7A7A]">
                Book your flights easily with our seamless global ticketing and
                reservation solutions.
              </p>
            </div>
          </div>

          <div className="box flex items-center 2xl:gap-6 gap-4">
            <div className="bg-secondary shadow-xl rounded-full p-4 animate-bounce overflow-hidden">
              <Image
                src={"/images/shortPromo/2.png"}
                alt="hotel.png"
                width={120}
                height={120}
                className="w-[56px] min-w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <h1
                className={`${rubik.className} text-2xl font-bold mb-1 text-[#363539] whitespace-nowrap`}
              >
                HOTEL RESERVATION
              </h1>
              <p className="text-sm text-[#7A7A7A]">
                Find top-rated hotels at great prices—we always pick the best
                for your comfort.
              </p>
            </div>
          </div>

          <div className="box flex 2xl:items-center xl:items-start gap-4">
            <div className="bg-secondary shadow-xl rounded-full p-4 animate-bounce overflow-hidden">
              <Image
                src={"/images/shortPromo/3.png"}
                alt="visa.png"
                width={120}
                height={120}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <h1
                className={`${rubik.className} text-2xl font-bold mb-1 text-[#363539]`}
              >
                VISA ASSISTANCE
              </h1>
              <p className="text-sm text-[#7A7A7A]">
                We guide our clients through visa processes smoothly to help
                them travel stress-free.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Promo;
