"use client";

import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebounce } from "@/hooks/use-debounce";
import {
  IVisaCategory,
  useVisaCategoriesListQuery,
} from "@/redux/api/visa.api";
import { useState } from "react";
import { toast } from "sonner";

interface VisaSelectCategoryProps {
  value: string;
  onChange: (value: string) => void;
  name: string;
}

const VisaSelectCategory: React.FC<VisaSelectCategoryProps> = ({
  value,
  onChange,
  name,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data: ctrData, isLoading: ctrLoading } = useVisaCategoriesListQuery(
    [
      { name: "title", value: debouncedSearchTerm },
      { name: "limit", value: 20 },
      { name: "skip", value: 0 },
    ],
    {
      refetchOnReconnect: false,
      refetchOnMountOrArgChange: true,
    }
  );

  const handleSetValues = (category: IVisaCategory) => {
    const requiredFields = ["title", "id"];
    const missingFields = requiredFields.filter(
      (field) => !category[field as keyof IVisaCategory]
    );

    if (missingFields.length > 0) {
      toast.error(`Invalid country data: Missing ${missingFields.join(", ")}`);
      return;
    }
    onChange(category.id + "-" + category.title);
    setIsOpen(false);
  };

  const [categoryId, categoryName] = value?.split("-") || [];

  return (
    <div className="w-full text-black">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger className="w-full rounded-md">
          <div className="flex justify-between items-center p-4 h-10 rounded-md border">
            <p className="uppercase">{categoryName || "Select Category"}</p>
          </div>
        </PopoverTrigger>
        <PopoverContent className="p-2 border rounded-md shadow-lg w-60">
          <Input
            name={name}
            type="text"
            placeholder="Search Categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border rounded-md p-2 mb-2"
          />
          <div className="text-sm h-72 overflow-auto">
            {ctrLoading ? (
              <div className="text-gray-500 p-2">Loading categories...</div>
            ) : (
              <>
                {ctrData && ctrData.data && ctrData.data.length > 0 ? (
                  ctrData.data.map((category, i) => (
                    <div
                      key={i}
                      onClick={() => handleSetValues(category)}
                      className="cursor-pointer hover:bg-gray-200 p-2 rounded-md flex justify-between items-center"
                    >
                      <p className="text-gray-800 text-sm truncate w-56">
                        {category.title}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 p-2">No categories found</div>
                )}
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default VisaSelectCategory;
