import { TQueryParam } from "@/types";


const argGenerator = (args: TQueryParam[]) => {

  const params = new URLSearchParams();
  if (args) {
    args.forEach((item: TQueryParam) => {
      if (item.value !== "" && item.value !== null && item.value !== undefined && item.value !== "null") {
        params.append(item.name, item.value as string);
      }
    });
  }
  return params;
}

export default argGenerator;