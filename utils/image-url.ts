import { ENV } from "@/config";

const imageUrl = (url: string) => {
  const host = ENV?.imageHost;

  if (!host) {
    throw new Error('Image host is not defined');
  }

  return `${host}${url}`;
}

export { imageUrl };

