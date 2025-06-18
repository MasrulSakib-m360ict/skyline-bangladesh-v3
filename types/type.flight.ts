import { Dayjs } from "dayjs";


// ! country list 
export interface ICountry {
  id: number;
  name: string;
  iso3: string;
  iso: string;
}

// ! airport response
export interface IAirportList {
  id?: number;
  airport_country_id?: number;
  name: string;
  iata_code: string;
  city_name?: string | null;
  country_name?: string;
}

// ! flight search state
export interface IPassengerType {
  adult: number;
  child: number;
  kid: number;
  infant: number;
}
export type TFlightRoute = 'oneway' | 'roundway' | 'multiway';
export type TFlightClass = 'Y' | 'C' | 'F' | 'P';

export interface IFlightField {
  origin: IAirportList;
  departure: IAirportList;
  date: Dayjs[];
}

//! request for flight response

export interface Location {
  LocationCode: string;
}
export interface CabinPref {
  Cabin: string;
  PreferLevel: string;
}

export interface TPAExtensions {
  CabinPref: CabinPref;
}
export interface IOriginDestinationInformation {
  RPH: string;
  DepartureDateTime: string;
  OriginLocation: Location;
  DestinationLocation: Location;
  TPA_Extensions: TPAExtensions;
}

export interface IPassengerTypeQuantity {
  Code: string;
  Quantity: number;
}
export interface IFlightSearchRequest {
  OriginDestinationInformation: IOriginDestinationInformation[];
  PassengerTypeQuantity: IPassengerTypeQuantity[];
}
// flight revalidate response

export interface FlightDetailRevalidate {
  departure_time: string;
  departure_date: string;
  arrival_time: string;
  arrival_date: string;
  carrier_marketing_flight_number: number;
  departure_airport_code: string;
  arrival_airport_code: string;
  carrier_marketing_code: string;
  carrier_operating_code: string;
}
export interface IOriginDestinationInformationRevalidate {
  RPH: string;
  DepartureDateTime: string;
  OriginLocation: Location;
  DestinationLocation: Location;
  TPA_Extensions: TPAExtensions;
  flight: FlightDetailRevalidate[];
}
export type ITransformedRevalidate = {
  OriginDestinationInformation: IOriginDestinationInformationRevalidate[];
  PassengerTypeQuantity: IPassengerTypeQuantity[];
};


// ! flight response
export interface IFare {
  commission: number;
  base_fare: number;
  discount: number;
  ait: number;
  payable: number;
  total_price: number;
  total_tax: number;
}

export interface IRefundable {
  type: string;
  refundable: boolean;
}

export interface IFlightClass {
  type: string;
  booking_code: string;
  cabin_type: string;
}

export interface ILegDescription {
  departureDate: string;
  departureLocation: string;
  arrivalLocation: string;
}

export interface IDeparture {
  airport_code: string;
  city_code: string;
  airport: string;
  city: string;
  country: string;
  terminal: string;
  time: string;
  date: string;
}

export interface Arrival extends IDeparture { }

export interface ICarrier {
  carrier_marketing_code: string;
  carrier_marketing_airline: string;
  carrier_marketing_logo: string;
  carrier_marketing_flight_number: number;
  carrier_operating_code: string;
  carrier_operating_airline: string;
  carrier_operating_logo: string;
  carrier_operating_flight_number: number;
  carrier_aircraft_code: string;
  carrier_aircraft_name: string;
}

export interface IOption {
  id: number;
  e_ticketable: boolean;
  elapsedTime: number;
  stopCount: number;
  total_miles_flown: number;
  departure: IDeparture;
  arrival: Arrival;
  carrier: ICarrier;
}

export interface IFlightDetail {
  stoppage: number;
  id: number;
  elapsed_time: number;
  options: IOption[];
  layover_time?: string[];
}

export interface IBaggage {
  id: number;
  weight: number;
  unit: string;
}

export interface ISegment {
  id: number;
  name?: string;
  meal_type?: string;
  meal_code?: string;
  cabin_code: string;
  cabin_type: string;
  booking_code: string;
  available_seat: number;
  available_break: boolean;
  available_fare_break?: boolean;
}

export interface IPBaggage {
  id: number;
  unit: string;
  count: number;
}

export interface IAvailability {
  id: number;
  from_airport: string;
  to_airport: string;
  segments: ISegment[];
  baggage: IPBaggage;
}

export interface IPFare {
  total_fare: number;
  tax: number;
  base_fare: number;
}

export interface IPassenger {
  type: string;
  number: number;
  non_refundable: boolean;
  availability: IAvailability[];
  fare: IPFare;
}

export interface IFlight {
  flight_id: string;
  fare: IFare;
  refundable: IRefundable[];
  flight_class: IFlightClass[];
  carrier_code: string;
  carrier_name: string;
  carrier_logo: string;
  ticket_last_date: string;
  ticket_last_time: string;
  leg_descriptions: ILegDescription[];
  flights: IFlightDetail[];
  passengers: IPassenger[];
  results?: IFlight[]
  isDomesticFlight?: boolean;
}

export interface IAirline {
  airline_code: string;
  price: number;
  airline_logo: string,
  airline_name: string,
}


export interface TFlightData {
  filter: FlightFilter;
  results: IFlight[];

}

// !  flight filter :
export interface PriceRange {
  max: number;
  min: number;
}
export interface FlightFilter {
  total_stoppage: number[];
  price_rage: PriceRange;
  airlines: IAirline[];
  baggage: string[];
  departure_time: ITimeRange[];
  arrival_time: ITimeRange[];
  fastest: number;
  earliest: number;
  cheapest: number;
}

interface ITimeRange {
  min: string;
  max: string;
}
export interface IFilterState {
  carrier_operating?: string;
  max_price?: number;
  min_price?: number;
  sort_by?: string;
  stoppage?: string;
  refundable?: string;
  page?: number;
  size?: number;
  baggage?: string;
  min_departure_time?: string,
  max_departure_time?: string,
  min_arrival_time?: string,
  max_arrival_time?: string,
}

// booking passenger data formate
//! search history
export interface ISearchHistoryItem {
  flightRoute: TFlightRoute;
  ticketClass: TFlightClass;
  fields: IFlightField[];
  passenger: IPassengerType;
}