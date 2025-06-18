"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

import { useVisaApplyQuery } from "@/redux/api/visa.api";
import { IAppliedVisaDetails } from "@/types/visa.types";
import { DocumentUpload } from "./traveler-documents";

const VisaApplyDetails = ({ id }: { id: string }) => {
  const { data, isLoading } = useVisaApplyQuery(id);
  const applicationData = data?.data || ({} as IAppliedVisaDetails);

  const formatDate = (date: string) => {
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime())
      ? "Invalid date"
      : format(parsedDate, "PPP");
  };

  if (isLoading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <div className="">
      <div className="">
        <CardHeader className="bg-blue-600 text-white">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">
                Visa Application #{applicationData.id}
              </CardTitle>
              <CardDescription className="text-blue-100">
                {applicationData.category_code} Visa for{" "}
                {applicationData.country_code}
              </CardDescription>
            </div>
            <Badge variant="secondary" className="text-lg py-1 ">
              {applicationData.status}
            </Badge>
          </div>
        </CardHeader>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="mb-8 w-full lg:w-10/12">
            <Card className="ml-4">
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
                  <InfoItem
                    label="Visa Type"
                    value={applicationData.applied_visa}
                  />
                  <InfoItem
                    label="Services"
                    value={applicationData.applied_services}
                  />
                  <InfoItem
                    label="Departure Date"
                    value={formatDate(applicationData.departure_date)}
                  />
                  <InfoItem
                    label="Total Payable"
                    value={`$${applicationData.payable}`}
                  />
                  <InfoItem
                    label="Contact Email"
                    value={applicationData.contact_email}
                  />
                  <InfoItem
                    label="Contact Phone"
                    value={applicationData.contact_number}
                  />
                  <InfoItem
                    label="Created At"
                    value={formatDate(applicationData.created_at)}
                  />
                  <InfoItem
                    label="Created By"
                    value={applicationData.created_by}
                  />
                  <InfoItem
                    label="Agency ID"
                    value={applicationData.agency_id?.toString() || "N/A"}
                  />
                </div>
                <div className="">
                  <div className="flex flex-wrap gap-2">
                    {applicationData.document_requirements?.map((req) => (
                      <Badge
                        variant={"destructive"}
                        key={req.id}
                        className="text-sm hover:bg-none"
                      >
                        {req.doc_title}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="mt-4 ml-4">
              <CardHeader>
                <CardTitle>Travelers</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Passport</TableHead>
                      <TableHead>Nationality</TableHead>
                      <TableHead>Date of Birth</TableHead>
                      <TableHead>Gender</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applicationData.travelers?.map((traveler) => (
                      <TableRow key={traveler.id}>
                        <TableCell>{`${traveler.first_name} ${traveler.last_name}`}</TableCell>
                        <TableCell>{traveler.passport_number}</TableCell>
                        <TableCell>{traveler.nationality}</TableCell>
                        <TableCell>
                          {formatDate(traveler.date_of_birth)}
                        </TableCell>
                        <TableCell>
                          {traveler.gender === "F" ? "Female" : "Male"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <div className="mt-4">
              <DocumentUpload
                travelers={applicationData.travelers}
                documentRequirements={applicationData.document_requirements}
              />
            </div>
          </div>

          <div className="mb-8 w-full lg:w-2/12">
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="">
                {applicationData.tracking_data?.map((activity) => (
                  <div
                    key={activity.id}
                    className="relative p-4 pl-6 border-l-2"
                  >
                    <div className="absolute -left-1 top-2 w-2 h-2 bg-blue-600 rounded-full" />
                    <div className="ml-1 border-blue-600">
                      <p className="font-medium">{activity.action_type}</p>

                      <p>{activity.action_taker.name}</p>
                      <p>{formatDate(activity.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisaApplyDetails;

function InfoItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1">{value}</p>
    </div>
  );
}
