"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IAppliedService } from "@/redux/api/visa.api";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function ServiceList({ services }: { services: IAppliedService[] }) {
  const [expandedServices, setExpandedServices] = useState<number[]>([]);

  const toggleService = (id: number) => {
    setExpandedServices((prev) =>
      prev.includes(id)
        ? prev.filter((serviceId) => serviceId !== id)
        : [...prev, id]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Applied Services</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">Service</TableHead>

              <TableHead className="text-right">Fee</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <>
                <TableRow key={service.id}>
                  <TableCell className="font-medium">
                    <Badge variant="outline" className="mt-1">
                      {service.service_code}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    {service.service_fee} {service.currency_code}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleService(service.id)}
                      className="w-full"
                    >
                      {expandedServices.includes(service.id) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                      <span className="sr-only">Toggle details</span>
                    </Button>
                  </TableCell>
                </TableRow>
                {expandedServices.includes(service.id) && (
                  <TableRow>
                    <TableCell colSpan={4} className="bg-muted/50">
                      <div className="py-2">
                        <p className="text-sm text-muted-foreground">
                          {service.service_description}
                        </p>
                        <div className="mt-2 text-sm">
                          <span className="font-medium">VAT Rate:</span>{" "}
                          {service.vat_rate}%
                        </div>
                        <div className="mt-1 text-sm">
                          <span className="font-medium">VAT Applicable:</span>{" "}
                          {service.is_vat_applicable ? "Yes" : "No"}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
