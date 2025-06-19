import Container from "@/components/container";
import { Button } from "@/components/ui/button";

const Tourism = () => {
  return (
    <section className="relative overflow-hidden mt-10">
      <div className="tourism-header h-64">
        <Container className="flex h-full items-center justify-center">
          <div className="-mx-8 flex flex-wrap items-center justify-center">
            <div className="w-full px-4 lg:w-2/3">
              <div className="text-center lg:text-left">
                <div className="mb-10 lg:mb-0">
                  <h1 className="mt-0 mb-3 text-3xl font-bold leading-tight sm:text-4xl sm:leading-tight md:text-[40px] md:leading-tight text-white">
                    Discover Nature’s Wonders
                  </h1>
                  <p className="w-full text-base font-medium leading-relaxed sm:text-lg sm:leading-relaxed text-white">
                    Experience our sustainable villas, panoramic hill and sea
                    views, wellness spas, fitness hubs, scenic pools, dining
                    spots, and cozy lounges.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/3">
              <div className="text-center lg:text-right">
                <Button variant="outline" className="">
                  Explore More
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};

export default Tourism;
