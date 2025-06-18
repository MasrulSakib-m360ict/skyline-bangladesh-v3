"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { OtpStyledInput } from "@/components/ui/otp-styled-input";
import { useAppSelector } from "@/redux/hooks";
import { useProfile } from "@/redux/slices/profile.slice";
import { matchOTP } from "@/services/actions/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  otp: z.string().min(6, {
    message: "OTP is required.",
  }),
});

export default function VerifyUser({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { user } = useAppSelector(useProfile);
  // State for loading
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: { otp: string }) => {
    if (!user?.email) {
      toast.error("Email is required");
      return;
    }
    try {
      setLoading(true);
      const response = await matchOTP(user?.email, data.otp, "verify_user");
      setLoading(false);
      console.log(response);
      if (response.token) {
        toast.success("Your email is verified");
        open && onOpenChange(false);
        window.location.reload();
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
  );
}
