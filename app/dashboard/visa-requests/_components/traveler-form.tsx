"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { useVisaApplyUploadDocMutation } from "@/redux/api/visa.api";
import { IDocumentRequirement, ITraveler } from "@/types/visa.types";
import { FileIcon, ImageIcon, X } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface TravelerFormProps {
  traveler: ITraveler;
  documentRequirements: IDocumentRequirement[];
}

export function TravelerForm({
  traveler,
  documentRequirements,
}: TravelerFormProps) {
  const form = useForm<any>({});

  const [visaApplyUploadDoc] = useVisaApplyUploadDocMutation();

  const onSubmit = async (data: any) => {
    // Filter out undefined and null values
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== null && value !== undefined
      )
    );

    if (Object.keys(filteredData).length === 0) {
      toast.error("Please upload at least one document");
      return;
    }
    filteredData.traveler_id = traveler.id;

    // make form data
    const formData = new FormData();
    formData.append("traveler_id", traveler.id.toString());
    Object.entries(filteredData).forEach(([key, value]) => {
      if (value && typeof value === "object" && "file" in value) {
        formData.append(key, value.file as Blob);
      }
    });

    await visaApplyUploadDoc({
      booking_id: traveler.booking_id,
      data: formData,
    }).unwrap();
  };

  const handleFileChange = React.useCallback(
    (docCode: string, e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
          form.setValue(docCode, {
            file,
            preview: reader.result as string,
          });
        };

        reader.readAsDataURL(file);
      }
    },
    [form.setValue]
  );

  const removeFile = React.useCallback(
    (docCode: string) => {
      form.setValue(docCode, null);
    },
    [form.setValue]
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {documentRequirements.map((doc) => (
          <FormField
            key={doc.id}
            control={form.control}
            name={doc.doc_code}
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-base font-semibold">
                  {doc.doc_title}
                </FormLabel>
                <FormDescription>{doc.doc_description}</FormDescription>
                <FormControl>
                  <div className="flex items-center gap-4">
                    <input
                      type="file"
                      id={doc.doc_code}
                      accept=".pdf,image/*"
                      className="hidden"
                      onChange={(e) => handleFileChange(doc.doc_code, e)}
                    />
                    <Label
                      htmlFor={doc.doc_code}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <span className="text-sm text-primary">Upload</span>
                      <FileIcon className="h-4 w-4" />
                    </Label>
                  </div>
                </FormControl>
                <FormMessage />
                {field.value && (
                  <div className="flex items-center gap-2 bg-muted p-2 rounded-md">
                    <div className="flex-1 overflow-hidden">
                      {field.value.file &&
                      field.value.file.type.startsWith("image/") ? (
                        <div className="flex items-center">
                          <ImageIcon className="h-4 w-4 mr-2" />
                          <span className="text-sm truncate">
                            {field.value.file.name}
                          </span>
                          <img
                            src={field.value.preview}
                            alt="Preview"
                            className="h-10 w-10 object-cover ml-2"
                          />
                        </div>
                      ) : field.value.file ? (
                        <div className="flex items-center">
                          <FileIcon className="h-4 w-4 mr-2" />
                          <span className="text-sm truncate">
                            {field.value.file.name}
                          </span>
                        </div>
                      ) : null}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(doc.doc_code)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </FormItem>
            )}
          />
        ))}
        <Button type="submit" className="w-full">
          {form.formState.isSubmitting ? "Uploading..." : "Upload Documents"}
        </Button>
      </form>
    </Form>
  );
}
