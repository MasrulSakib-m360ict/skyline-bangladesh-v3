import Container from "@/components/container";
import { useId } from "react";

export function Memories() {
  return (
    <div className="">
      <Container className="pt-20">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-neutral-900 ">
            Cherished Memories
          </h2>
          <p className="mt-4  text-neutral-600 ">
            Capture every moment, share with loved ones, and explore the world
            with our travel tools.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-2 ">
          {memories.map((feature) => (
            <div
              key={feature.title}
              className="relative bg-gradient-to-b  from-neutral-100  to-white p-6  overflow-hidden shadow"
            >
              <Grid size={20} />
              <p className="text-base font-bold text-neutral-800  relative z-20">
                {feature.title}
              </p>
              <p className="text-neutral-600  mt-4 text-base font-normal relative z-20">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

const memories = [
  {
    title: "Capture Every Moment",
    description:
      "Use our integrated photo tools to capture and share your travel moments instantly.",
  },
  {
    title: "Personalized Itineraries",
    description:
      "Create customized travel itineraries that perfectly match your interests and preferences.",
  },
  {
    title: "Share with Loved Ones",
    description:
      "Easily share your travel plans and memories with friends and family to keep everyone in the loop.",
  },
  {
    title: "Seamless Flight Bookings",
    description:
      "Book your flights effortlessly and ensure you have more time to make unforgettable memories.",
  },
  {
    title: "Group Travel Planning",
    description:
      "Coordinate with your travel companions seamlessly, making group trips enjoyable ",
  },
  {
    title: "Explore the World",
    description:
      "Discover new destinations and experiences that turn your trips into lifelong memories.",
  },
  {
    title: "Happiness Guaranteed",
    description:
      "We strive to make every journey enjoyable, ensuring you return with cherished memories.",
  },
  {
    title: "Bookmark Your Favorites",
    description:
      "Save your favorite destinations and plans to revisit and book them anytime.",
  },
];
export const Grid = ({
  pattern,
  size,
}: {
  pattern?: number[][];
  size?: number;
}) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  return (
    <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-zinc-100/30 to-zinc-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]: any) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
