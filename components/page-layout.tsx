// PageLayout.tsx

import React from "react";
import { twMerge } from "tailwind-merge";
import { Card } from "./ui/card";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

interface SubComponentProps {
  children: React.ReactNode;
  className?: string;
}

const PageLayout: React.FC<PageLayoutProps> & {
  Header: React.FC<SubComponentProps>;
  Body: React.FC<SubComponentProps>;
  // Footer: React.FC<SubComponentProps>;
} = ({ children, className }) => {
  return (
    <div className={twMerge("pt-4 px-4 md:px-6", className)}>{children}</div>
  );
};

const Header: React.FC<SubComponentProps> = ({ children, className }) => {
  return (
    <header className={twMerge("page-header mb-4", className)}>
      {children}
    </header>
  );
};
const Body: React.FC<SubComponentProps> = ({ children, className }) => {
  return <Card className={twMerge("", className)}>{children}</Card>;
};

PageLayout.Header = Header;
PageLayout.Body = Body;
// PageLayout.Footer = Footer;

export default PageLayout;
