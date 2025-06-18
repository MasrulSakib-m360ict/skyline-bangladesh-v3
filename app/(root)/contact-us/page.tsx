"use client";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import siteInfo from "@/config/site.info";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Grid } from "../_components/memories";

// Define the schema for form validation
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long." }),
});

// Define the types for form data
type FormData = z.infer<typeof formSchema>;

// Contact information component props
interface ContactInfoItemProps {
  title: string;
  description: string;
  info: string;
  icon: ReactNode;
}

// Contact information component
const ContactInfoItem: React.FC<ContactInfoItemProps> = ({
  title,
  description,
  info,
  icon,
}) => (
  <div className="">
    <span className="inline-block p-3 text-blue-500 rounded-full bg-blue-100/80 dark:bg-gray-800">
      {icon}
    </span>
    <h2 className="mt-4 text-lg font-medium text-gray-800 dark:text-white">
      {title}
    </h2>
    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
      {description}
    </p>
    <p className="mt-2 text-sm text-blue-500 dark:text-blue-400">{info}</p>
  </div>
);

const ContactUsPage: React.FC = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // Handle form submission
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      console.log("Form submitted:", data);
      toast.success("Your message has been sent!");
      form.reset(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("There was an error sending your message.");
    }
  };

  return (
    <section className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="header">
        <Container className="h-60 flex items-end justify-start">
          <div className="h-20">
            <h1 className="text-4xl font-semibold text-white">Contact Us</h1>
          </div>
        </Container>
      </div>
      <div className="overflow-hidden w-full relative">
        <Grid size={35} />
        <Container className="">
          <div className="my-16">
            <h2 className="text-2xl font-semibold  text-gray-800 mb-8">
              Get in Touch
            </h2>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-1">
                <ContactInfoItem
                  title="Email"
                  description="Our friendly team is here to help."
                  info={siteInfo.companyInfo.emails
                    .map((email) => email)
                    .join(", ")}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      />
                    </svg>
                  }
                />
                <ContactInfoItem
                  title="Office"
                  description="Come say hello at our office HQ."
                  info={siteInfo.companyInfo.address}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                      />
                    </svg>
                  }
                />
                <ContactInfoItem
                  title="Phone"
                  description="Mon-Fri from 8am to 5pm."
                  info={siteInfo.companyInfo.phones
                    .map((phone) => phone)
                    .join(", ")}
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                      />
                    </svg>
                  }
                />
              </div>
              <div className="overflow-hidden rounded-lg lg:col-span-2 h-96 lg:h-auto">
                <iframe
                  width="100%"
                  height="100%"
                  title="map"
                  src={siteInfo.companyInfo.location}
                ></iframe>
              </div>
            </div>
          </div>
          {/* Contact Form Section */}
          <div className="max-w-4xl mx-auto p-4 mb-16">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <CardDescription>
                  We would love to hear from you! Please fill out the form
                  below.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid gap-4"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Your Message" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="mt-4">
                      Send Message
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default ContactUsPage;
