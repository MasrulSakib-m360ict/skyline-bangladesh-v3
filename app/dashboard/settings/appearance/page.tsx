import { Separator } from "@/components/ui/separator";
import siteInfo from "@/config/site.info";
import { Metadata } from "next";
import { AppearanceForm } from "../components/appearance-form";

export const metadata: Metadata = {
  title: `${siteInfo.name} - Settings - Appearance`,
  description: " app appearance settings",
};

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance of the app. Automatically switch between day
          and night themes.
        </p>
      </div>
      <Separator />
      <AppearanceForm />
    </div>
  );
}
