"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { OtpStyledInput } from "@/components/ui/otp-styled-input";
import { matchOTP } from "@/services/actions/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  otp: z.string().min(1, {
    message: "OTP is required.",
  }),
});

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  // State for loading
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: { otp: string }) => {
    try {
      setLoading(true);
      const email = Array.isArray(searchParams.email)
        ? searchParams.email[0]
        : searchParams.email;
      if (!email) {
        throw new Error("Email is required");
      }
      const response = await matchOTP(email, data.otp, "reset_user");
      setLoading(false);

      if (response.token) {
        toast.success("Your email is verified");
        router.push(`/recover/reset-password?token=${response.token}`);
      } else {
        toast.error(response?.message);
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Verify OTP</CardTitle>
        <CardDescription>
          Enter the OTP sent to your email address below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <OtpStyledInput numInputs={6} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Loading..." : "Verify OTP"}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Didn&apos;t receive the OTP?{" "}
          <Link href="/recover" className="underline">
            Resend OTP
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
