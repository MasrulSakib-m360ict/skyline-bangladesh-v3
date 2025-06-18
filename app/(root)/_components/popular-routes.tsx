"use client";

import Container from "@/components/container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { resetFilter } from "@/redux/slices/flight-data-slice";
import { useFlightSearch } from "@/redux/slices/flight-search.slice";
import { TFlightRoute } from "@/types/type.flight";
import { FlightSegment, formatQuerySegments } from "@/utils/formatter";
import { addDays } from "date-fns";
import { LucideArrowLeftRight } from "lucide-react";
import { Cormorant_Garamond, Seaweed_Script } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Grid } from "./memories";

// Fonts
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

// Type definitions
interface Route {
  id: number;
  from: {
    city: string;
    name: string;
    iata_code: string;
  };
  to: {
    city: string;
    name: string;
    iata_code: string;
  };
  img: string;
  formDate: Date;
  toDate: Date;
}
// Route Data Model
const routesData = {
  international: [
    {
      id: 1,
      from: {
        city: "Dhaka",
        name: "Hazrat Shahjalal International Airport",
        iata_code: "DAC",
      },
      to: {
        city: "New York",
        name: "John F. Kennedy International Airport",
        iata_code: "JFK",
      },
      img: "/images/routes/international/newyork.jpg",
      formDate: addDays(new Date(), 15),
      toDate: addDays(new Date(), 30),
    },
    {
      id: 2,
      from: {
        city: "Dhaka",
        name: "Hazrat Shahjalal International Airport",
        iata_code: "DAC",
      },
      to: {
        city: "Dubai",
        name: "Dubai International Airport",
        iata_code: "DXB",
      },
      img: "/images/routes/international/Dubai.jpg",
      formDate: addDays(new Date(), 10),
      toDate: addDays(new Date(), 18),
    },
    {
      id: 3,
      from: {
        city: "Dhaka",
        name: "Hazrat Shahjalal International Airport",
        iata_code: "DAC",
      },
      to: {
        city: "Washington",
        name: "Dulles International",
        iata_code: "IAD",
      },
      img: "/images/routes/international/Washington.jpg",
      formDate: addDays(new Date(), 14),
      toDate: addDays(new Date(), 27),
    },
    {
      id: 4,
      from: {
        city: "Dhaka",
        name: "Hazrat Shahjalal International Airport",
        iata_code: "DAC",
      },
      to: { city: "London", name: "Heathrow", iata_code: "LHR" },
      img: "/images/routes/international/London.jpg",
      formDate: addDays(new Date(), 17),
      toDate: addDays(new Date(), 29),
    },
    {
      id: 5,
      from: {
        city: "Dhaka",
        name: "Hazrat Shahjalal International Airport",
        iata_code: "DAC",
      },
      to: { city: "Medina", name: "Mohammad Bin Abdulaziz", iata_code: "MED" },
      img: "/images/routes/international/Medina.jpg",
      formDate: addDays(new Date(), 15),
      toDate: addDays(new Date(), 24),
    },
    {
      id: 6,
      from: {
        city: "Dhaka",
        name: "Hazrat Shahjalal International Airport",
        iata_code: "DAC",
      },
      to: {
        city: "Colombo",
        name: "Bandaranaike International Airport",
        iata_code: "CMB",
      },
      img: "/images/routes/international/colombo.jpg",
      formDate: addDays(new Date(), 15),
      toDate: addDays(new Date(), 24),
    },
    {
      id: 7,
      from: {
        city: "Dhaka",
        name: "Hazrat Shahjalal International Airport",
        iata_code: "DAC",
      },
      to: {
        city: "Delhi",
        name: "Indira Gandhi International Airport",
        iata_code: "DEL",
      },
      img: "/images/routes/international/Delhi.jpg",
      formDate: addDays(new Date(), 15),
      toDate: addDays(new Date(), 24),
    },
    {
      id: 8,
      from: {
        city: "Dhaka",
        name: "Hazrat Shahjalal International Airport",
        iata_code: "DAC",
      },
      to: {
        city: "Bangkok",
        name: "Suvarnabhumi International",
        iata_code: "BKK",
      },
      img: "/images/routes/international/Bangkok.jpg",
      formDate: addDays(new Date(), 15),
      toDate: addDays(new Date(), 24),
    },
    {
      id: 9,
      from: {
        city: "Dhaka",
        name: "Hazrat Shahjalal International Airport",
        iata_code: "DAC",
      },
      to: { city: "Kolkata", name: "Netaji Subhas Chandra", iata_code: "CCU" },
      img: "/images/routes/international/Kolkata.jpg",
      formDate: addDays(new Date(), 15),
      toDate: addDays(new Date(), 24),
    },
    {
      id: 10,
      from: {
        city: "Dhaka",
        name: "Hazrat Shahjalal International Airport",
        iata_code: "DAC",
      },
      to: {
        city: "Bangalore",
        name: "Kempegowda International Airport",
        iata_code: "BLR",
      },
      img: "/images/routes/international/Bangalore.jpg",
      formDate: addDays(new Date(), 15),
      toDate: addDays(new Date(), 24),
    },
  ],
  domestic: [
    {
      id: 1,
      from: {
        city: "Dhaka",
        name: "Hazrat Shahjalal International Airport",
        iata_code: "DAC",
      },
      to: {
        city: "Chittagong",
        name: "Shah Amanat International Airport",
        iata_code: "CGP",
      },
      img: "/images/routes/domestic/chittagong.jpg",
      formDate: addDays(new Date(), 5),
      toDate: addDays(new Date(), 10),
    },
    {
      id: 2,
      from: {
        city: "Dhaka",
        name: "Hazrat Shahjalal International Airport",
        iata_code: "DAC",
      },
      to: {
        city: "Sylhet",
        name: "Osmani International Airport",
        iata_code: "ZYL",
      },
      img: "/images/routes/domestic/sylhet.jpg",
      formDate: addDays(new Date(), 6),
      toDate: addDays(new Date(), 12),
    },
    {
      id: 3,
      from: {
        city: "Dhaka",
        name: "Hazrat Shahjalal International Airport",
        iata_code: "DAC",
      },
      to: {
        city: "Cox's Bazar",
        name: "Cox's Bazar Airport",
        iata_code: "CXB",
      },
      img: "/images/routes/domestic/cox.jpg",
      formDate: addDays(new Date(), 7),
      toDate: addDays(new Date(), 14),
    },
    {
      id: 4,
      from: {
        city: "Dhaka",
        name: "Hazrat Shahjalal International Airport",
        iata_code: "DAC",
      },
      to: { city: "Saidpur", name: "Saidpur Airport", iata_code: "SPD" },
      img: "/images/routes/domestic/spd.jpg",
      formDate: addDays(new Date(), 9),
      toDate: addDays(new Date(), 16),
    },
    {
      id: 5,
      from: {
        city: "Dhaka",
        name: "Hazrat Shahjalal International Airport",
        iata_code: "DAC",
      },
      to: { city: "Barisal", name: "Barisal Airport", iata_code: "BZL" },
      img: "/images/routes/domestic/barisal.jpg",
      formDate: addDays(new Date(), 10),
      toDate: addDays(new Date(), 18),
    },
  ],
};

// RouteCard Component
const RouteCard: React.FC<{ route: Route }> = ({ route }) => (
  <div key={route.id}>
    <div className="w-full bg-secondaryBg p-0 shadow-xl">
      <div className="relative 2xl:h-[200px] xl:h-[180px] w-full">
        <Image
          src={route.img}
          alt="route-image"
          fill
          className=" object-cover"
        />
      </div>
      <div className="px-4 py-5">
        <div className="relative grid grid-cols-2 gap-8">
          <div>
            <p className="my-1 text-xs text-primary font-bold xl:text-sm  ">
              {route.from.city}
            </p>
            <p className="mt-[2px] truncate text-sm text-secondary">
              {route.from.name}
            </p>
          </div>
          <LucideArrowLeftRight className="absolute left-[44%] z-50 hidden h-7 w-7 cursor-pointer rounded-full p-1.5 text-sm font-bold transition-all duration-150 md:block" />
          <div className="text-end">
            <p className="my-1 text-xs text-primary font-bold xl:text-sm truncate">
              {route.to.city}
            </p>
            <p className="mt-[3px] truncate text-sm text-secondary">
              {route.to.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

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

// PopularRoute Component
const PopularRoute: React.FC = () => {
  const router = useRouter();
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
    <div className="relative overflow-hidden">
      <Grid size={35} />
      <div className="md:mt-0 mt-8 py-16 pb-8 container md:px-0 px-2 mx-auto">
        <div className="text-center mb-6">
          <p className={`${Seaweed.className} md:text-[25px] text-[20px]`}>
            Routes to travel
          </p>
          <h1
            className={`${Cormorant.className} text-[#1B2B47] md:text-[43px] text-[35px] font-[600]`}
            style={{ lineHeight: "1.2em", letterSpacing: "1.5px" }}
          >
            Popular Routes
          </h1>
        </div>

        <Tabs defaultValue="international" className="space-y-6">
          <TabsList className="flex items-center justify-center gap-2 rounded-lg bg-inherit">
            <TabsTrigger
              value="domestic"
              className="px-8 py-2.5 text-sm leading-5 font-medium rounded-lg"
            >
              Domestic
            </TabsTrigger>
            <TabsTrigger
              value="international"
              className="px-8 py-2.5 text-sm leading-5 font-medium rounded-lg"
            >
              International
            </TabsTrigger>
          </TabsList>

          {Object.entries(routesData).map(([key, routes]) => (
            <TabsContent key={key} value={key} className="rounded-xl p-3">
              <Container className="grid grid-cols-2 gap-2 border-none bg-transparent px-0 md:grid-cols-5 md:gap-4">
                {routes.map((route: any) => (
                  <Link
                    href={handleRoute(route)}
                    className="cursor-pointer"
                    key={route.id}
                  >
                    <RouteCard route={route} />
                  </Link>
                ))}
              </Container>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default PopularRoute;
