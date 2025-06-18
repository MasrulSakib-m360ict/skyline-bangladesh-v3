export interface ITraveler {
  id?: number
  reference: string | null
  first_name: string
  sur_name: string
  phone: string
  email: string
  date_of_birth: string
  type: string
  passport_number: string
  passport_expire_date: string
  frequent_flyer_airline: string
  frequent_flyer_number: string
  save_information: boolean;
  issuing_country: string
  nationality: string,
  gender: string,
  title: string
}



export interface ICreateTraveler {
  type: string;
  title: string;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  passport_number?: string;
  passport_expiry_date?: Date;
  issuing_country: string;
  nationality: string;
  email?: string;
  phone?: string;
  frequent_flyer_airline?: string;
  frequent_flyer_number?: string;
  gender?: string;
}
