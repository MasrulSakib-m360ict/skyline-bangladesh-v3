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
import { Input } from "@/components/ui/input";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/redux/api/profile.api";
import { imageUrl } from "@/utils/image-url";
import { zodResolver } from "@hookform/resolvers/zod";
import { DamIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(30, { message: "Name must not be longer than 30 characters." }),
  email: z.string().email(),
  mobile_number: z.string().min(6).max(15),
  photo: z.instanceof(File).optional(), // Update to expect a File instance
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { data, isLoading } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateProfile, { isLoading: updateProfileLoading }] =
    useUpdateProfileMutation();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile_number: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (data && data.data) {
      form.reset({
        name: data.data.name,
        email: data.data.email,
        mobile_number: data.data.mobile_number,
      });
    }
  }, [data, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    const { mobile_number, name, photo } = data;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("mobile_number", mobile_number);
    if (photo) {
      formData.append("photo", photo);
    }
    try {
      await updateProfile(formData);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        form.setValue("photo", file); // Set the file to form state
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
      form.setValue("photo", undefined);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Photo Upload Section */}
        <div className="flex items-center space-x-6 mb-4">
          {(previewImage || data?.data?.photo) && (
            <div className="relative">
              <img
                src={
                  previewImage
                    ? previewImage
                    : imageUrl(data?.data?.photo as string)
                }
                alt="Preview"
                className="object-cover w-20 h-20 border border-gray-300 rounded-md"
              />
              {previewImage && (
                <button
                  type="button"
                  onClick={() => {
                    setPreviewImage(null);
                    form.setValue("photo", undefined);
                  }}
                  className="absolute top-0 right-0"
                >
                  <DamIcon fontSize={20} className="text-red-500" />
                </button>
              )}
            </div>
          )}

          <label className="block">
            <span className="text-gray-800 text-sm pb-1.5 block">Photo</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              disabled={isLoading} // Disable when loading
            />
          </label>
        </div>

        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} disabled={isLoading} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym. You can only change this any time.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input disabled placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>
                You can not change your email address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mobile Number Field */}
        <FormField
          control={form.control}
          name="mobile_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Mobile Number"
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormDescription>
                Your mobile number is used for account recovery and security
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" disabled={isLoading || updateProfileLoading}>
          Update Profile
        </Button>
      </form>
    </Form>
  );
}
