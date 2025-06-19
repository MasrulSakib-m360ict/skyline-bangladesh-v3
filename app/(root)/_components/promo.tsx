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
        <div className="grid md:grid-cols-3 grid-cols-1 items-start justify-between gap-4">
          <div className="box flex flex-col items-start 2xl:gap-4 gap-2">
            <div className="bg-secondary shadow-xl rounded-full p-3 overflow-hidden">
              <Image
                src={"/images/shortPromo/1.png"}
                alt="ticket.png"
                width={120}
                height={120}
                className="object-contain rounded-full max-w-[80px]"
              />
            </div>
            <div className="text-start">
              <h1
                className={`${rubik.className} text-2xl font-bold mb-1 text-[#363539]`}
              >
                AIR TICKET
              </h1>
              <p className="text-sm text-[#7A7A7A]">
                Book your flights easily with our global ticketing and
                reservation solutions.
              </p>
            </div>
          </div>

          <div className="box flex flex-col items-start 2xl:gap-4 gap-2">
            <div className="bg-secondary shadow-xl rounded-full p-3 overflow-hidden">
              <Image
                src={"/images/shortPromo/2.png"}
                alt="hotel.png"
                width={120}
                height={120}
                className="object-contain rounded-full max-w-[80px]"
              />
            </div>
            <div className="text-start">
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

          <div className="box flex flex-col items-start 2xl:gap-4 gap-2">
            <div className="bg-secondary shadow-xl rounded-full p-3 overflow-hidden">
              <Image
                src={"/images/shortPromo/3.png"}
                alt="visa.png"
                width={120}
                height={120}
                className="object-contain rounded-full max-w-[80px]"
              />
            </div>
            <div className="text-start">
              <h1
                className={`${rubik.className} text-2xl font-bold mb-1 text-[#363539] whitespace-nowrap`}
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
