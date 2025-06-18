import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
type IProps = {
  children: ReactNode;
  className?: string;
};

const Container = ({ children, className }: IProps) => {
  return (
    <section
      className={twMerge(
        "w-full px-[15px] mx-auto  lg:max-w-[1110px] ",
        className
      )}
    >
      {children}
    </section>
  );
};

export default Container;
