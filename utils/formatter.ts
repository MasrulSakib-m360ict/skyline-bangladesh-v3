import { ICreateTraveler } from "@/types/traveler";
import {
  IAirportList,
  IFlightSearchRequest,
  IOriginDestinationInformation,
  IPassengerType,
  IPassengerTypeQuantity,
  TFlightClass,
  TFlightRoute
} from "@/types/type.flight";
import dayjs from "dayjs";

/**
 * Interface representing a flight segment (from-to with dates).
 * Each segment has a `from` airport, a `to` airport, and one or more `date` values.
 */
export interface FlightSegment {
  from: string; // Example: "DAC - Dhaka - Hazrat Shahjalal International Airport"
  to: string;   // Example: "JFK - New York - John F. Kennedy International Airport"
  date: Date[]; // Dates of departure and return (for round trip)
}

/**
 * Function to parse a string containing airport information into structured data.
 * 
 * @param airportString - String format like "DAC - Dhaka - Hazrat Shahjalal International Airport"
 * @returns {IAirportList} - An object containing airport details: IATA code, city name, and airport name.
 */
export const parseAirportString = (airportString: string): IAirportList => {
  const [iata_code, city_name, name] = airportString.split(" - ");
  return {
    name: name.trim(),
    iata_code: iata_code.trim(),
    city_name: city_name.trim(),
    country_name: "",
  };
};

/**
 * Converts flight segments and dates into a query string for URL parameters.
 * This is useful for persisting search state in a URL.
 * 
 * @param fields - Array of flight segments (from, to, date)
 * @param searchType - Type of search (e.g., "oneway" or "roundway")
 * @returns {string} - Encoded query string representing flight segments
 */
export const formatQuerySegments = (fields: FlightSegment[], searchType: TFlightRoute): string => {
  return fields
    .map((field) => {
      const [iataCode, city, airportName] = field.from.split(" - ");
      const [iataCodeTo, cityTo, airportNameTo] = field.to.split(" - ");

      // Encode only necessary values (spaces, special characters)
      const origin = iataCode;
      const originAirport = encodeURIComponent(airportName);
      const originCity = encodeURIComponent(city);

      const destination = iataCodeTo;
      const destinationAirport = encodeURIComponent(airportNameTo);
      const destinationCity = encodeURIComponent(cityTo);

      const form = `origin=${origin}&originAirport=${originAirport}&originCity=${originCity}&destination=${destination}&destinationAirport=${destinationAirport}&destinationCity=${destinationCity}`;
      const departureDate = dayjs(field.date[0]).format('YYYY-MM-DD');
      const returnDate = field.date.length > 1 ? `${dayjs(field.date[1]).format('YYYY-MM-DD')}` : '';

      let date;
      if (searchType === "roundway") {
        date = `departureDate=${departureDate}&returnDate=${returnDate}`;
      } else {
        date = `departureDate=${departureDate}`;
      }

      return `${form}&${date}`;
    })
    .join("__");
};

/**
 * Decodes a query string into flight segments. Converts dates from string to Date object.
 * 
 * @param queryString - Encoded query string from the URL
 * @returns {FlightSegment[]} - Array of decoded flight segments
 */
export const decodeQuerySegments = (queryString: string): FlightSegment[] => {
  const segments = queryString.split('__').filter(segment => segment.trim() !== '');

  return segments.map((segment) => {
    const decodedSegment = decodeURIComponent(segment);
    const params = new URLSearchParams(decodedSegment);

    const from = `${params.get('origin')} - ${params.get('originCity')} - ${params.get('originAirport')}`;
    const to = `${params.get('destination')} - ${params.get('destinationCity')} - ${params.get('destinationAirport')}`;
    const departureDate = params.get('departureDate') || '';
    const returnDate = params.get('returnDate') || '';

    const dates = returnDate ? [new Date(departureDate), new Date(returnDate)] : [new Date(departureDate)];

    return { from, to, date: dates };
  });
};

/**
 * Decodes query parameters for passengers from a URL string.
 * Returns an object representing the number of adult, child, infant, and kid passengers.
 * 
 * @param queryString - Encoded query string from the URL
 * @returns {IPassengerType} - Passenger counts for adults, children, infants, and kids.
 */
export const decodeQueryPassengers = (queryString: string): IPassengerType => {
  const params = new URLSearchParams(queryString);

  return {
    adult: parseInt(params.get('adults') || '1'),
    child: parseInt(params.get('children') || '0'),
    kid: parseInt(params.get('kids') || '0'),
    infant: parseInt(params.get('infants') || '0'),
  };
};

/**
 * Formats flight search data into the required API request format.
 * It handles both one-way and roundway trips.
 * 
 * @param state - Contains flight route, ticket class, flight segments, and passenger info.
 * @returns {IFlightSearchRequest} - The formatted flight request for API consumption.
 */
export const flightRequestFormatter = (state: {
  flightRoute: TFlightRoute;
  ticketClass: TFlightClass;
  fields: FlightSegment[];
  passenger: IPassengerType;
}): IFlightSearchRequest => {
  const { fields, ticketClass, passenger, flightRoute } = state;

  const originDestinationInformation: IOriginDestinationInformation[] = fields.map((field, index) => ({
    RPH: (index + 1).toString(),
    DepartureDateTime: dayjs(field.date[0]).format('YYYY-MM-DDTHH:mm:ss'),
    OriginLocation: {
      LocationCode: parseAirportString(field.from).iata_code,
    },
    DestinationLocation: {
      LocationCode: parseAirportString(field.to).iata_code,
    },
    TPA_Extensions: {
      CabinPref: {
        Cabin: ticketClass,
        PreferLevel: 'Preferred',
      },
    },
  }));

  // If round trip, handle return journey
  if (flightRoute === 'roundway') {
    const returnTrip = fields.map((field, index) => ({
      RPH: (fields.length + index + 1).toString(),
      DepartureDateTime: dayjs(field.date[1]).format('YYYY-MM-DDTHH:mm:ss'),
      OriginLocation: {
        LocationCode: parseAirportString(field.to).iata_code,
      },
      DestinationLocation: {
        LocationCode: parseAirportString(field.from).iata_code,
      },
      TPA_Extensions: {
        CabinPref: {
          Cabin: ticketClass,
          PreferLevel: 'Preferred',
        },
      },
    }));
    originDestinationInformation.push(...returnTrip);
  }

  const passengerTypeQuantity: IPassengerTypeQuantity[] = [
    { Code: 'ADT', Quantity: passenger.adult },
    { Code: 'C11', Quantity: passenger.child },
    { Code: 'INF', Quantity: passenger.infant },
    { Code: 'C05', Quantity: passenger.kid },
  ].filter(ptq => ptq.Quantity > 0);

  return {
    OriginDestinationInformation: originDestinationInformation,
    PassengerTypeQuantity: passengerTypeQuantity,
  };
};



export const travelerDataFormatter = (passengerType: string, values: any, index: number): ICreateTraveler => {
  return {
    // ! domestic
    title: values[`${passengerType}-${index}-reference`],
    type: passengerType,
    first_name: values[`${passengerType}-${index}-mid_name`],
    last_name: values[`${passengerType}-${index}-sur_name`],
    gender: values[`${passengerType}-${index}-gender`],
    date_of_birth: values[`${passengerType}-${index}-date_of_birth`],

    // ! contact for ticket
    email: values[`${passengerType}-${index}-email`],
    phone: values[`${passengerType}-${index}-phone`],

    // ! international
    issuing_country: values[`${passengerType}-${index}-issuing_country`],
    nationality: values[`${passengerType}-${index}-nationality`],
    passport_number: values[`${passengerType}-${index}-passport_number`],
    passport_expiry_date: values[`${passengerType}-${index}-passport_expiry`],

    // ! frequent flyer
    frequent_flyer_airline: values[`${passengerType}-${index}-frequent_flyer_airline`],
    frequent_flyer_number: values[`${passengerType}-${index}-frequent_flyer_number`],

  };
};

export const travelerTypeFormatter = (type: string): string => {
  switch (type) {
    case "ADT":
      return "Adult";
    case "C11":
      return "Child";
    case "INF":
      return "Infant";
    case "C05":
      return "Kid";
    default:
      return "Adult";
  }
}