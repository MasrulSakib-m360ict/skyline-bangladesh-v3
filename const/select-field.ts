import { TOption } from "@/types";

export const referenceField: TOption[] = [
  {
    value: "MR",
    label: "Mr",
  },
  {
    value: "MS",
    label: "Ms",
  },
  {
    value: "MRS",
    label: "Mrs",
  },
  {
    value: "MISS",
    label: "Miss",
  },
  {
    value: "MSTR",
    label: "MASTER",
  },
];

export const genderSelect: TOption[] = [
  {
    value: "M",
    label: "Male",
  },
  {
    value: "F",
    label: "Female",
  },
];
export const nationalityField: TOption[] = [
  {
    value: "Bangladeshi",
    label: "Bangladesh",
  },
  {
    value: "Afganistan",
    label: "Afganistan",
  },
];
export const passengerField: TOption[] = [
  {
    label: "Adult",
    value: "adt",
  },
  {
    value: "c11",
    label: "Child",
  },
  {
    value: "inf",
    label: "Infant",
  },
];

export const classFields: TOption[] = [
  { value: "Y", label: "Economy" },
  { value: "P", label: "Premium Economy" },
  { value: "C", label: "Business" },
  { value: "F", label: "First Class" },
];

export const flightMoreDetails: TOption[] = [
  { value: "FlightDetails", label: "Flight Details" },
  { value: "FareSummary", label: "Fare Summary" },
  { value: "RefundReissuePolicy", label: "Refund/Reissue Policy" },
  { value: "Baggage", label: "Baggage" },
  { value: "Passenger", label: "Passenger" },
];

export const supportType: TOption[] = [
  { value: "DateChange", label: "Date Change" },
  { value: "Refund", label: "Refund" },
  { value: "VOID", label: "VOID" },
  { value: "AddWheelChair", label: "Add Wheel Chair" },
  { value: "AddVIPCIPMASS", label: "Add VIP/CIP/MASS" },
  { value: "AddFrequentFlyer", label: "Add Frequent Flyer" },
  { value: "SeatAssignRequest", label: "Seat Assign Request" },
  { value: "AirTicketCopy", label: "Air Ticket Copy" },
  { value: "SplitPNR", label: "Split PNR" },
  { value: "ExtraBaggage", label: "Extra Baggage" },
  { value: "Other", label: "Other" },
];


export const bookingSupportSearch: TOption[] = [
  { value: "pending", label: "Pending" },
  { value: "processing", label: "Processing" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" }
];

export const bookingFilters: TOption[] = [
  { value: "pending", label: "Pending" },
  { value: "issued", label: "Issued" },
  { value: "booking-cancelled", label: "Booking Cancelled" },
  { value: "ticket-void", label: "Ticket Cancelled" },
  { value: "ticket-refund", label: "Ticket Refund" },
  { value: "ticket-processing", label: "Ticket Processing" },
]