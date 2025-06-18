import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const catchAsync = async <T>(asyncFn: () => Promise<T>): Promise<void> => {
  try {
    await asyncFn();
  } catch (error) {
    console.error(error);
  }
};


// 5 - removeEmptyValues
type AnyObject = { [key: string]: any }; // Type for an object with dynamic keys
export const removeEmptyValues = <T extends AnyObject>(arr: T[] | T[][]): T[] | T[][] => {
  if (Array.isArray(arr[0])) {
    // Handle nested array of objects
    return (arr as T[][]).map(innerArray =>
      innerArray.map(item => {
        const newItem: Partial<T> = {};
        Object.keys(item).forEach(key => {
          if (item[key] !== undefined && item[key] !== null) {
            newItem[key as keyof T] = item[key];
          }
        });
        return newItem as T;
      })
    );
  } else {
    // Handle single array of objects
    return (arr as T[]).map(item => {
      const newItem: Partial<T> = {};
      Object.keys(item).forEach(key => {
        if (item[key] !== undefined && item[key] !== null) {
          newItem[key as keyof T] = item[key];
        }
      });
      return newItem as T;
    });
  }
};
