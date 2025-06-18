"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { DayPicker } from "react-day-picker";

import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format, set } from "date-fns";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

interface CustomCaptionProps {
  date: Date;
  onMonthChange: (date: Date) => void;
}

const CustomCaption: React.FC<CustomCaptionProps> = ({
  date,
  onMonthChange,
}) => {
  const month = date.getMonth();
  const year = date.getFullYear();

  const handleMonthChange = (value: string) => {
    const newMonth = Number(value);
    onMonthChange(new Date(year, newMonth));
  };

  const handleYearChange = (value: string) => {
    const newYear = Number(value);
    onMonthChange(new Date(newYear, month));
  };

  const renderMonthOptions = () =>
    Array.from({ length: 12 }, (_, i) => (
      <SelectItem key={i} value={i.toString()}>
        {format(new Date(0, i), "MMMM")}
      </SelectItem>
    ));

  const renderYearOptions = () =>
    Array.from({ length: 125 }, (_, i) => {
      const yearValue = 1900 + i;
      return (
        <SelectItem key={yearValue} value={yearValue.toString()}>
          {yearValue}
        </SelectItem>
      );
    });

  return (
    <div className="flex justify-between items-center mb-2">
      {/* Year Selector */}
      <Select onValueChange={handleYearChange} defaultValue={year.toString()}>
        <SelectTrigger>
          <SelectValue placeholder="Select Year" />
        </SelectTrigger>
        <SelectContent>{renderYearOptions()}</SelectContent>
      </Select>

      {/* Month Selector */}
      <Select onValueChange={handleMonthChange} defaultValue={month.toString()}>
        <SelectTrigger>
          <SelectValue placeholder="Select Month" />
        </SelectTrigger>
        <SelectContent>{renderMonthOptions()}</SelectContent>
      </Select>
    </div>
  );
};

CustomCaption.displayName = "CustomCaption";

interface DatePickerProps {
  initialDate?: Date; // Optional initial date prop
  onChange: (date: Date) => void; // Callback to handle date changes
  selectedYear: number; // Year for disabling dates
}

const DatePicker: React.FC<DatePickerProps> = ({
  initialDate,
  onChange,
  selectedYear,
  ...props
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    initialDate
  );

  React.useEffect(() => {
    setSelectedDate(initialDate); // Update local state when initialDate changes
  }, [initialDate]);

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      const currentSelectedDate = selectedDate || new Date();
      const newDate = set(currentSelectedDate, {
        year: currentSelectedDate.getFullYear(),
        month: currentSelectedDate.getMonth(),
        date: date.getDate(),
      });
      setSelectedDate(newDate);
      onChange(newDate); // Notify parent about the change
    }
  };

  const handleMonthChange = (date: Date) => {
    if (date) {
      const currentSelectedDate = selectedDate || new Date();
      const newDate = set(currentSelectedDate, {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: currentSelectedDate.getDate(),
      });
      setSelectedDate(newDate);
      onChange(newDate); // Notify parent about the change
    }
  };

  return (
    <DayPicker
      mode="single"
      selected={selectedDate}
      onSelect={handleSelect}
      disabled={(date) =>
        date > new Date() || date.getFullYear() !== selectedYear
      }
      components={{
        Caption: (props) => (
          <CustomCaption
            {...props}
            date={selectedDate || new Date()}
            onMonthChange={handleMonthChange}
          />
        ),
      }}
      {...props} // Spread the rest of the props
    />
  );
};

export { Calendar, CustomCaption, DatePicker };
