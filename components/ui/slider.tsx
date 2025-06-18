"use client";
import { cn } from "@/lib/utils";
import * as SliderPrimitive from "@radix-ui/react-slider";
import React, { useEffect, useState } from "react";
type SliderProps = {
  className?: string;
  rangClassName?: string;
  trackClassName?: string;
  thumbClassName?: string;
  min: number;
  max: number;
  minStepsBetweenThumbs: number;
  step: number;
  formatLabel?: (value: number) => string;
  value?: number[] | readonly number[];
  onValueChange?: (values: number[]) => void;
  handleAfterSliderChange?: (values: number[]) => void;
};

const Slider = React.forwardRef(
  (
    {
      className,
      rangClassName,
      trackClassName,
      thumbClassName,

      min,
      max,
      step,
      formatLabel,
      value,
      onValueChange,
      handleAfterSliderChange,
      ...props
    }: SliderProps,
    ref
  ) => {
    const initialValue = Array.isArray(value) ? value : [min, max];
    const [localValues, setLocalValues] = useState(initialValue);

    useEffect(() => {
      // Update localValues when the external value prop changes
      setLocalValues(Array.isArray(value) ? value : [min, max]);
    }, [min, max, value]);

    const handleValueChange = (newValues: number[]) => {
      setLocalValues(newValues);
      if (onValueChange) {
        onValueChange(newValues);
      }
    };

    return (
      <SliderPrimitive.Root
        ref={ref as React.RefObject<HTMLDivElement>}
        min={min}
        max={max}
        step={step}
        value={localValues}
        onValueChange={handleValueChange}
        onValueCommit={handleAfterSliderChange}
        className={cn(
          "relative mb-6 flex w-full touch-none select-none items-center",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track
          className={cn(
            "bg-primary/20 relative h-1 w-full grow overflow-hidden rounded-full",
            trackClassName
          )}
        >
          <SliderPrimitive.Range
            className={cn("absolute h-full bg-primary", rangClassName)}
          />
        </SliderPrimitive.Track>
        {localValues.map((value, index) => (
          <React.Fragment key={index}>
            {/* <div
              className="absolute text-center"
              style={{
                left: `calc(${((value - min) / (max - min)) * 84}% + 0px)`,
                top: `10px`,
              }}
            >
              <span className="text-sm">
                {formatLabel ? formatLabel(value) : value}
              </span>
            </div> */}
            <SliderPrimitive.Thumb
              className={cn(
                "block h-3 w-3 rounded-full border border-primary bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                thumbClassName
              )}
            />
          </React.Fragment>
        ))}
      </SliderPrimitive.Root>
    );
  }
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
