"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ENV } from "@/config";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import { useProfile } from "@/redux/slices/profile.slice";
import { sendOTP } from "@/services/actions/user";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { GoUnverified } from "react-icons/go";
import { MdVerified } from "react-icons/md";
import { toast } from "sonner";

import VerifyUser from "@/app/(auth)/components/verify-user";
import { Tooltip } from "../ui/tooltip";

export function NavUser({
  side = "right",
}: {
  side?: "left" | "right" | "top" | "bottom";
}) {
  const { user } = useAppSelector(useProfile);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isVerifyAlertOpen, setIsVerifyAlertOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsAlertOpen(true);
  };
  const handleDialogClose = () => {
    setIsAlertOpen(false);
  };
  const handleLogOut = () => {
    signOut();
    setIsAlertOpen(false);
  };

  const handleVerifyAccount = async () => {
    if (!user?.email) {
      toast.error("Email is required");
      return;
    }
    const error = await sendOTP(user?.email, "verify_user");
    if (error) {
      toast.error(error?.message);
      return;
    }
    toast.success("OTP successfully sent to your email");
    setIsVerifyAlertOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="w-full rounded-md outline-none ring-ring hover:bg-accent focus-visible:ring-2 data-[state=open]:bg-accent">
          <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm transition-all">
            <Avatar
              className={cn("h-7 w-7 rounded-md border", {
                "border-red-500": !user?.is_verified,
              })}
            >
              <AvatarImage
                src={`${ENV.imageHost + user?.photo!}`}
                alt={user?.name}
                className="animate-in fade-in-50 zoom-in-90"
              />
              <AvatarFallback className="rounded-md">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 leading-none">
              <div className="font-medium flex gap-2">
                {user?.name}
                {!user?.is_verified ? (
                  <Tooltip>
                    <TooltipTrigger>
                      <GoUnverified className="text-red-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      Your account is not verified yet.
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <MdVerified className="text-blue-500" />
                )}
              </div>

              <div className="overflow-hidden text-xs text-muted-foreground">
                <div className="line-clamp-1">{user?.email}</div>
              </div>
            </div>
            <ChevronsUpDown className="ml-auto mr-0.5 h-4 w-4 text-muted-foreground/50" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56"
          align="end"
          side={side}
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm transition-all">
              <Avatar className="h-7 w-7 rounded-md">
                <AvatarImage
                  alt={user?.name}
                  src={`${ENV.imageHost + user?.photo!}`}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1">
                <div className="font-medium">{user?.name}</div>
                <div className="overflow-hidden text-xs text-muted-foreground">
                  <div className="line-clamp-1">{user?.email}</div>
                </div>
              </div>
            </div>

            {!user?.is_verified && (
              <DropdownMenuItem
                className="gap-2 cursor-pointer text-red-500"
                onClick={handleVerifyAccount}
              >
                <BadgeCheck className="h-4 w-4 " />
                Verify Account
              </DropdownMenuItem>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="gap-2 cursor-pointer" asChild>
              <Link href="/">
                <BadgeCheck className="h-4 w-4 text-muted-foreground" />
                Home
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer" asChild>
              <Link href="/dashboard">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                Dashboard
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 cursor-pointer" asChild>
              <Link href="/dashboard">
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
      <Dialog open={isVerifyAlertOpen} onOpenChange={setIsVerifyAlertOpen}>
        <DialogContent className="mx-auto max-w-sm">
          <DialogHeader>
            <DialogTitle>Verify OTP</DialogTitle>
            <DialogDescription>
              Enter the OTP sent to your email address below.
            </DialogDescription>
          </DialogHeader>
          <VerifyUser
            open={isVerifyAlertOpen}
            onOpenChange={setIsVerifyAlertOpen}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
