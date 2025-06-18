"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { useFormContext } from "react-hook-form";

export interface SelectOption {
  value: string;
  label: string;
}

interface AdaptiveSelectProps
  extends Omit<React.ComponentPropsWithoutRef<typeof Button>, "onChange"> {
  options: SelectOption[];
  value?: string;
  placeholder?: string;
  loading?: boolean;
  error?: string;
  label?: string;
  name?: string;
  defaultValue?: string; // Add defaultValue prop
}

export function AdaptiveSelect({
  options,
  value,
  placeholder = "Select an option",
  loading = false,
  error,
  label,
  name,
  defaultValue, // Destructure defaultValue
  className,
  ...props
}: AdaptiveSelectProps) {
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const { setValue, trigger } = useFormContext();

  React.useEffect(() => {
    if (defaultValue && name) {
      setValue(name, defaultValue);
      trigger(name);
    }
  }, [defaultValue, name, setValue, trigger]);

  const handleSelect = React.useCallback(
    (currentValue: string) => {
      if (name) {
        setValue(name, currentValue);
        trigger(name);
      }
      setOpen(false);
    },
    [name, setValue, trigger]
  );

  const selectedOption = options.find((option) => option.value === value);

  const content = (
    <Command>
      <CommandInput placeholder={placeholder} />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options.map((option, i) => (
            <CommandItem key={i} value={option.value} onSelect={handleSelect}>
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  value === option.value ? "opacity-100" : "opacity-0"
                )}
              />
              {option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );

  const manyOptions = options.length > 10;

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between", className)}
            disabled={props.disabled || loading}
          >
            {selectedOption ? selectedOption.label : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className={cn("h-[80vh]", manyOptions && "h-[60vh]")}>
          <DrawerHeader className="pb-0">
            <DrawerTitle>{label || "Select an option"}</DrawerTitle>
          </DrawerHeader>
          <ScrollArea className="flex-1 px-4">{content}</ScrollArea>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
          disabled={props.disabled || loading}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">{content}</PopoverContent>
    </Popover>
  );
}
