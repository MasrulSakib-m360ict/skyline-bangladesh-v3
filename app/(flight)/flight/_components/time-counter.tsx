"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useTimer } from "react-timer-hook";

import { Icons } from "@/components/icons";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface TimerProps {
  expiryTimestamp: Date;
  onExpire: () => void;
  className?: string;
  isDesktop: boolean;
}

function Timer({
  expiryTimestamp,
  onExpire,
  className,
  isDesktop,
}: TimerProps) {
  const searchParams = useSearchParams();
  const { seconds, minutes, restart } = useTimer({
    expiryTimestamp,
    onExpire,
  });

  const zeroPadTime = (time: number): string =>
    time < 10 ? `0${time}` : time.toString();

  const pathName = usePathname();
  return (
    <div
      className={cn(
        "mb-4 flex items-center justify-between gap-2 rounded bg-card px-4 py-[1.6vh] shadow",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Icons.Timer
          size={isDesktop ? 23 : 20}
          className={cn(
            "font-bold md:text-primary",
            pathName !== "/flight-revalidate" && "text-white"
          )}
        />
        <p className="text-sm">Time Remaining</p>
      </div>
      <div className={cn("text-sm font-bold md:text-secondary")}>
        <span>{zeroPadTime(minutes)}</span>:<span>{zeroPadTime(seconds)}</span>
      </div>
    </div>
  );
}

// Define props type for TimeCounter component
interface TimeCounterProps {
  className?: string;
}

const TimeCounter: React.FC<TimeCounterProps> = ({ className }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathName = usePathname();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [expiryTimestamp, setExpiryTimestamp] = useState<Date>(
    new Date(Date.now() + 15 * 60 * 1000)
  );

  const handleExpire = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    if (pathName === "/flight") {
      window.location.reload();
    } else {
      router.push("/");
    }
  };
  return (
    <div className="bg-white">
      <Timer
        expiryTimestamp={expiryTimestamp}
        onExpire={handleExpire}
        className={className}
        isDesktop={isDesktop}
      />
      <Dialog open={isModalOpen} onOpenChange={closeModal}>
        <DialogContent className=" [&>button]:hidden">
          <DialogHeader>
            <DialogTitle>Session Expired!</DialogTitle>
          </DialogHeader>
          <DialogDescription>Your session has expired.</DialogDescription>
          <DialogFooter>
            <Button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={closeModal}
            >
              Search Again
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TimeCounter;
