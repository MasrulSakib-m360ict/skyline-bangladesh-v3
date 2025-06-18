"use client";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Bell, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAppSelector } from "@/redux/hooks";
import { useProfile } from "@/redux/slices/profile.slice";
import { imageUrl } from "@/utils/image-url";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarTrigger } from "../ui/sidebar";
const Navbar = () => {
  const router = useRouter();
  const { user } = useAppSelector(useProfile);

  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsAlertOpen(true);
  };
  const handleDialogClose = () => {
    setIsAlertOpen(false);
  };

  const navLinks = [{ name: "Home", href: "/" }];

  const handleLogOut = async () => {
    await signOut();
    router.refresh();
    setIsAlertOpen(false);
  };

  return (
    <header className="sticky top-0 flex justify-between h-14 items-center gap-4 border-b bg-background px-4 z-10">
      <SidebarTrigger />
      <div className="flex items-center gap-4">
        <div className="flex items-center mt-4 lg:mt-0">
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full border-black/40 border-2"
                >
                  <Avatar className="h-7 w-7 rounded-md border">
                    <AvatarImage
                      src={imageUrl(user?.photo!)}
                      alt={user?.name}
                      className="animate-in fade-in-50 zoom-in-90"
                    />
                    <AvatarFallback className="rounded-md">CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="gap-2 cursor-pointer" asChild>
                    <Link href="/">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      Home
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="gap-2" asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <Bell className="h-4 w-4 text-muted-foreground" />
                      Setting
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="gap-2 cursor-pointer"
                  onClick={handleLogoutClick}
                >
                  <LogOut className="h-4 w-4 text-muted-foreground" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You are about to log out from your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={handleDialogClose}>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleLogOut}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
