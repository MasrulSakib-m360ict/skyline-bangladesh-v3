import Container from "@/components/container";
import { cn } from "@/lib/utils";
import {
  FaBell,
  FaDollarSign,
  FaHeadset,
  FaHeart,
  FaLock,
  FaPlane,
  FaRedoAlt,
  FaRegCalendarAlt,
} from "react-icons/fa";
import { Grid } from "./memories";

export function Features() {
  const features = [
    {
      title: "Wide Selection of Airlines",
      description:
        "Choose from hundreds of airlines worldwide to find the perfect flight for your needs.",
      icon: <FaPlane size={24} />,
    },
    {
      title: "Best Price Guarantee",
      description:
        "Get the lowest prices on flights with our price match guarantee.",
      icon: <FaDollarSign size={24} />,
    },
    {
      title: "Easy Booking Process",
      description:
        "Book your flights quickly and easily with our user-friendly interface.",
      icon: <FaRegCalendarAlt size={24} />,
    },
    {
      title: "24/7 Customer Support",
      description:
        "Our support team is available around the clock to assist you with your bookings.",
      icon: <FaHeadset size={24} />,
    },
    {
      title: "Secure Payment Options",
      description:
        "Enjoy safe and secure payment methods for all your transactions.",
      icon: <FaLock size={24} />,
    },
    {
      title: "Flexible Cancellation ",
      description: "Cancel or change your flights with ease, no hassle.",
      icon: <FaRedoAlt size={24} />,
    },
    {
      title: "Real-Time Flight Updates",
      description: "Stay informed with instant updates on your flight status.",
      icon: <FaBell size={24} />,
    },
    {
      title: "Rewards and Loyalty ",
      description:
        "Earn points and enjoy exclusive benefits with our loyalty program.",
      icon: <FaHeart size={24} />,
    },
  ];
  return (
    <div className="overflow-hidden">
      <Container className="pt-20 relative">
        <Grid size={35} />
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-neutral-800  text-center">
            What We Offer
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-neutral-600  text-center">
            We offer a wide range of features to make your travel experience
            seamless and enjoyable.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </Container>
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-secondary transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
