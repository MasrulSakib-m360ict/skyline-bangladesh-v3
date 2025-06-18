"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

import { IDocumentRequirement, ITraveler } from "@/types/visa.types";
import { User } from "lucide-react";
import { TravelerForm } from "./traveler-form";

interface DocumentUploadProps {
  travelers: ITraveler[];
  documentRequirements: IDocumentRequirement[];
}

export function DocumentUpload({
  travelers,
  documentRequirements,
}: DocumentUploadProps) {
  return (
    <ScrollArea className="ml-4">
      <Accordion type="multiple" className="w-full space-y-4">
        {travelers.map((traveler) => (
          <AccordionItem value={traveler.id.toString()} key={traveler.id}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary text-primary-foreground rounded-full p-2">
                    <User size={24} />
                  </div>
                  <div className="font-semibold text-lg">
                    {traveler.first_name} {traveler.last_name}
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardContent className="pt-6">
                  <TravelerForm
                    traveler={traveler}
                    documentRequirements={documentRequirements}
                  />
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollArea>
  );
}
