import { ProfileForm } from "@/app/dashboard/settings/components/profile-form";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Dashboard - Profile`,
  description: " user profile settings",
};

export default function page() {
  return (
    <div className="pt-4 px-4 md:px-6">
      <div className=" space-y-6  pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            {/* <SettingSidebarNav items={items} /> */}
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            {" "}
            <div className="lex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
              <div className="flex-1 lg:max-w-2xl">
                <div className="space-y-6 w-full mx-auto">
                  <div>
                    <h3 className="text-lg font-medium">Profile</h3>
                    <p className="text-sm text-muted-foreground">
                      This is how others will see you on the site.
                    </p>
                  </div>
                  <Separator />
                  <ProfileForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
