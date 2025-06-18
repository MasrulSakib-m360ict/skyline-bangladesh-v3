import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setFilter, useFlightData } from "@/redux/slices/flight-data-slice";
import { memo, useEffect, useMemo, useState } from "react";

export interface PriceRage {
  max?: number;
  min?: number;
}
type Props = {
  price: PriceRage | undefined;
};

const PriceRangeFilter = ({ price }: Props) => {
  const { filter, flightFilterData } = useAppSelector(useFlightData);
  const { price_rage } = flightFilterData;

  const [range, setRange] = useState<number[]>([0, 1000000]);
  const [prevPrice, setPrevPrice] = useState<number[]>([]);
  const dispatch = useAppDispatch();

  const priceRange = useMemo(() => {
    if (price && price.min !== undefined && price.max !== undefined) {
      return [price.min, price.max];
    }
    return null;
  }, [price]);

  useEffect(() => {
    if (priceRange !== null) {
      if (price_rage.min !== null && price_rage.max !== null) {
        setRange([price_rage.min, price_rage.max]);
      } else {
        setRange([priceRange[0], priceRange[1]]);
      }
      setPrevPrice([priceRange[0], priceRange[1]]);
    }
  }, [priceRange]);

  const handleSliderChange = (value: number[]) => {
    setRange([value[0], value[1]]);
  };

  const handleAfterSliderChange = (value: number[]) => {
    dispatch(
      setFilter({
        ...filter,
        max_price: value[1],
        min_price: value[0],
        page: 1,
      })
    );
  };

  return (
    <div className="grid w-full gap-4 ">
      <label className="mb-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Price Range
      </label>

      {/* <Slider
        min={prevPrice[0]}
        max={prevPrice[1]}
        step={1}
        value={range}
        onValueChange={handleSliderChange}
        handleAfterSliderChange={handleAfterSliderChange}
        formatLabel={(value) => ``}
        minStepsBetweenThumbs={0}
        className="mb-1 bg-destructive"
        trackClassName="h-[1px] "
      /> */}
      <div className="mt-0 flex justify-between text-sm">
        <span>{range[0]?.toLocaleString()}</span>
        <span> {range[1]?.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default memo(PriceRangeFilter);
