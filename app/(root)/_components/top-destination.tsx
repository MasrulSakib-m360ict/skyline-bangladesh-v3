import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetFilter } from "@/redux/slices/flight-data-slice";
import { useFlightSearch } from "@/redux/slices/flight-search.slice";
import { TFlightRoute } from "@/types/type.flight";
import { FlightSegment, formatQuerySegments } from "@/utils/formatter";
import { addDays } from "date-fns";
import { Cormorant_Garamond, Pacifico } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
const Cursive = Pacifico({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});
const Cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const data = [
  {
    id: 13,
    title: "Dubai, United Arab Emirates",
    description:
      "Discover the modern marvels and luxurious experiences of Dubai.",
    img: "/images/destination/Dubai.avif",
    from: {
      id: 210,
      country_id: 18,
      country: "BANGLADESH",
      name: "Dhaka - Hazrat Shahjalal International Airport",
      iata_code: "DAC",
      city: "Dhaka",
    },
    to: {
      id: 8,
      country_id: 0,
      country: "United Arab Emirates",
      city: "Dubai",
      name: "Dubai International Airport",
      iata_code: "DXB",
    },
    formDate: addDays(new Date(), 12),
    toDate: addDays(new Date(), 20),
  },
  {
    id: 6,
    title: "Kuala Lumpur, Malaysia",
    description:
      "Explore the vibrant cityscape of Kuala Lumpur, known for its iconic Petronas Towers.",
    img: "/images/destination/Kuala_Lumpur.avif",
    from: {
      id: 210,
      country_id: 18,
      country: "BANGLADESH",
      name: "Dhaka - Hazrat Shahjalal International Airport",
      iata_code: "DAC",
      city: "Dhaka",
    },
    to: {
      id: 9,
      country_id: 0,
      country: "Malaysia",
      city: "Kuala Lumpur",
      name: "Kuala Lumpur International Airport",
      iata_code: "KUL",
    },
    formDate: addDays(new Date(), 12),
    toDate: addDays(new Date(), 20),
  },
  {
    id: 7,
    title: "Bangkok, Thailand",
    description:
      "Experience the bustling life of Bangkok, Thailand’s vibrant capital city.",
    img: "/images/destination/Bangkok.avif",
    from: {
      id: 210,
      country_id: 18,
      country: "BANGLADESH",
      name: "Dhaka - Hazrat Shahjalal International Airport",
      iata_code: "DAC",
      city: "Dhaka",
    },
    to: {
      id: 10,
      country_id: 0,
      country: "Thailand",
      city: "Bangkok",
      name: "Suvarnabhumi Airport",
      iata_code: "BKK",
    },
    formDate: addDays(new Date(), 12),
    toDate: addDays(new Date(), 20),
  },
  {
    id: 8,
    title: "Singapore",
    description: "Discover the beautiful and ultra-modern city of Singapore.",
    img: "/images/destination/Singapore.avif",
    from: {
      id: 210,
      country_id: 18,
      country: "BANGLADESH",
      name: "Dhaka - Hazrat Shahjalal International Airport",
      iata_code: "DAC",
      city: "Dhaka",
    },
    to: {
      id: 11,
      country_id: 0,
      country: "Singapore",
      city: "Singapore",
      name: "Singapore Changi Airport",
      iata_code: "SIN",
    },
    formDate: addDays(new Date(), 12),
    toDate: addDays(new Date(), 20),
  },
  {
    id: 9,
    title: "Bali, Indonesia",
    description:
      "Enjoy the serene beaches and tropical vibes of Bali, Indonesia.",
    img: "/images/destination/bali.jpg",
    from: {
      id: 210,
      country_id: 18,
      country: "BANGLADESH",
      name: "Dhaka - Hazrat Shahjalal International Airport",
      iata_code: "DAC",
      city: "Dhaka",
    },
    to: {
      id: 12,
      country_id: 0,
      country: "Indonesia",
      city: "Bali",
      name: "Ngurah Rai International Airport",
      iata_code: "DPS",
    },
    formDate: addDays(new Date(), 12),
    toDate: addDays(new Date(), 20),
  },
  {
    id: 10,
    title: "Colombo, Sri Lanka",
    description:
      "Experience the cultural heritage and lush landscapes of Sri Lanka.",
    img: "/images/destination/Colombo-Sri-Lanka.webp",
    from: {
      id: 210,
      country_id: 18,
      country: "BANGLADESH",
      name: "Dhaka - Hazrat Shahjalal International Airport",
      iata_code: "DAC",
      city: "Dhaka",
    },
    to: {
      id: 13,
      country_id: 0,
      country: "Sri Lanka",
      city: "Colombo",
      name: "Bandaranaike International Airport",
      iata_code: "CMB",
    },
    formDate: addDays(new Date(), 12),
    toDate: addDays(new Date(), 20),
  },
  {
    id: 11,
    title: "Malé, Maldives",
    description: "Relax in the paradise-like island resorts of Maldives.",
    img: "/images/destination/male.jpg",
    from: {
      id: 210,
      country_id: 18,
      country: "BANGLADESH",
      name: "Dhaka - Hazrat Shahjalal International Airport",
      iata_code: "DAC",
      city: "Dhaka",
    },
    to: {
      id: 14,
      country_id: 0,
      country: "Maldives",
      city: "Malé",
      name: "Velana International Airport",
      iata_code: "MLE",
    },
    formDate: addDays(new Date(), 12),
    toDate: addDays(new Date(), 20),
  },
  {
    id: 12,
    title: "Delhi, India",
    description:
      "Explore the rich cultural heritage of Delhi, India’s capital city.",
    img: "/images/destination/india-delhi-india-gate.jpg",
    from: {
      id: 210,
      country_id: 18,
      country: "BANGLADESH",
      name: "Dhaka - Hazrat Shahjalal International Airport",
      iata_code: "DAC",
      city: "Dhaka",
    },
    to: {
      id: 15,
      country_id: 0,
      country: "India",
      city: "Delhi",
      name: "Indira Gandhi International Airport",
      iata_code: "DEL",
    },
    formDate: addDays(new Date(), 12),
    toDate: addDays(new Date(), 20),
  },
];

interface Route {
  id: number;
  from: {
    id: number;
    country_id: number;
    country: string;
    city: string;
    name: string;
    iata_code: string;
  };
  to: {
    city: string;
    name: string;
    iata_code: string;
    id: number;
    country_id: number;
    country: string;
  };
  img: string;
  formDate: Date;
  toDate: Date;
}

const convertRoute = (
  route: Route,
  flightRoute: TFlightRoute
): FlightSegment => {
  return {
    from: `${route.from.iata_code} - ${route.from.city} - ${route.from.name} `,
    to: `${route.to.iata_code} - ${route.to.city} - ${route.to.name} `,
    date:
      flightRoute === "roundway"
        ? [
            addDays(
              new Date(),
              (route.formDate.getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24)
            ),
            addDays(
              new Date(),
              (route.toDate.getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24)
            ),
          ]
        : [
            addDays(
              new Date(),
              (route.formDate.getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24)
            ),
          ],
  };
};

const TopDestination = () => {
  const dispatch = useAppDispatch();
  const { flightRoute, passenger, ticketClass } =
    useAppSelector(useFlightSearch);

  const handleRoute = (route: Route) => {
    dispatch(resetFilter());
    const convertedRoute = convertRoute(route, flightRoute);
    const segments = formatQuerySegments([convertedRoute], flightRoute);
    const passengers = `adults=${passenger.adult}&children=${passenger.child}&infants=${passenger.infant}&kids=${passenger.kid}`;
    return `/flight?${passengers}&ticketClass=${ticketClass}&${segments}&tripType=${flightRoute}`;
  };

  return (
    <div className=" relative pt-20">
      <div
        style={{
          backgroundImage: "url(/images/destination/icotrav022.png)",
          backgroundPosition: "center center",
          backgroundSize: " cover",
          opacity: "0.15",
        }}
        className="absolute w-full h-full z-[-1]"
      ></div>
      <div className="">
        <div className="text-center">
          <div className="flex items-center justify-center gap-1 mb-3">
            <Image
              src={"/images/star.webp"}
              alt="star"
              width={17}
              height={17}
            />
            <p className={`${Cursive.className} text-[15px] `}>
              Get To Know Us
            </p>
          </div>
          <h1
            className={`${Cormorant.className} text-[#1B2B47] text-[43px] font-bold`}
            style={{
              letterSpacing: "1.5px",
            }}
          >
            Top Destinations
          </h1>
        </div>

        <Marquee className="py-10" speed={100} pauseOnHover={true}>
          {data.map((top) => (
            <Link
              href={handleRoute(top)}
              key={top.id}
              className="bg-white cursor-pointer rounded block  2xl:mr-10 xl:mr-6 mr-3"
              style={{
                boxShadow: "0px 11px 40px 0px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div>
                <Image
                  src={top.img}
                  alt=""
                  width={500}
                  height={500}
                  className="2xl:h-[360px] xl:h-[208px] h-[220px] 2xl:w-[20vw] xl:w-[20vw] w-[60vw]  rounded object-cover"
                />
              </div>
              <div className="">
                <h1
                  className={`${Cormorant.className} pb-1 p-4 font-bold md:text-[29px] text-[18px] text-[#1B2B47]`}
                  style={{
                    fontWeight: 600,
                    letterSpacing: "1.2px",
                  }}
                >
                  {top.title}
                </h1>
                <hr />
                <p className="pt-3 md:text-base text-sm pb-5 md:w-[20vw] w-[60vw] p-4 text-[#7A7A7A]">
                  {top.description}
                </p>
              </div>
            </Link>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default TopDestination;
