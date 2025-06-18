export type ISegment = {
  id: number;
  airline: string;
  airline_logo: string;
  arrival_date: string;
  arrival_time: string;
  class: string;
  departure_date: string;
  departure_time: string;
  origin: string;
  destination: string;
};

type ILegDescription = {
  id: number;
  departure: string;
  arrival: string;
  departure_date: string;
};

export type IBookingRequest = {
  agency_id: number;
  agency_logo: string;
  agency_name: string;
  created_at: string;
  id: number;
  journey_type: string;
  leg_description: ILegDescription[];
  note: string;
  price: string;
  segments: ISegment[];
  status: string;
  user_email: string;
  user_id: number;
  user_mobile_number: string;
  user_name: string;
  user_photo: string;
};

// IBookingRequestDetails is an extended version of IBookingRequest


export interface IBookingRequestDetails {
  id: number;
  status: string;
  journey_type: string;
  class: string | null;
  created_at: string;
  total_price: string;
  base_fair: string;
  total_tax: string;
  ait: string | null;
  customer_discount: string;
  customer_price: string;
  total_travelers: number;
  traveler_adult: number;
  traveler_children: number;
  traveler_kids: number;
  traveler_infants: number;
  segments: IBookingRequestDetailsSegment[];
  travelers: IBookingRequestDetailsTraveler[];
}

export interface IBookingRequestDetailsSegment {
  id: number;
  booking_request_id: number;
  flight_number: string;
  airline: string;
  airline_code: string;
  airline_logo: string;
  origin: string;
  destination: string;
  class: string;
  baggage: string;
  departure_date: string;
  arrival_date: string;
  departure_time: string;
  arrival_time: string;
  origin_airport: string | null;
  destination_airport: string | null;
  elapsed_time: string | null;
  aircraft_name: string | null;
}

export interface IBookingRequestDetailsTraveler {
  id: number;
  booking_request_id: number;
  type: string; // e.g., "ADT" for adults
  title: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  passport_number: string;
  passport_expiry_date: string;
  email: string;
  phone: string;
  frequent_flyer_airline: string;
  frequent_flyer_number: string;
  city: string;
  country_id: number;
  gender: string | null; // Optional
  country_name: string;
}
