import Container from "@/components/container";
import { Grid } from "./memories";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const JoinFamily = () => {
  return (
    <div className="overflow-hidden">
      {" "}
      {/* Changed from overflow-x-hidden to overflow-hidden */}
      <Container className="px-0 sm:px-4">
        {" "}
        {/* Add constrained padding */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Grid size={35} />
        </div>
        <div className="relative flex flex-col items-center justify-center min-h-screen py-16 px-4 sm:px-6 lg:px-8 text-center max-w-full">
          <h1 className="text-3xl mb-4 sm:mb-6 text-gray-900 leading-tight font-bold text-center px-4">
            Become a Part of Our Growing Family
          </h1>

          <p className="text-base text-neutral-600 mb-6 sm:mb-8 max-w-xl md:max-w-2xl lg:max-w-3xl px-4">
            Discover a community where connections flourish and memories are
            made. We're excited to welcome you!
          </p>

          <div className="mb-8 sm:mb-10 w-full px-4 max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
            <Image
              src="/images/family-together.webp"
              alt="Happy family together"
              width={1200}
              height={800}
              layout="responsive"
              objectFit="cover"
              className="rounded-xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12 w-full px-4 max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-blue-600">
                Connect
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Forge meaningful relationships with like-minded individuals and
                build lasting bonds.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-green-600">
                Grow
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Participate in engaging activities, workshops, and shared
                experiences that foster personal growth.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-purple-600">
                Belong
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                Find your place in a supportive and vibrant community where
                everyone is valued.
              </p>
            </div>
          </div>

          <Button
            variant={"secondary"}
            type="submit"
            className="search-button lg:mt-0"
          >
            Join Our Family Today!
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default JoinFamily;
