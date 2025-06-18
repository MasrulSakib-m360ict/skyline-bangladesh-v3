import siteInfo from "@/config/site.info";
import Image from "next/image";
import Link from "next/link";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FiTwitter, FiYoutube } from "react-icons/fi";
import { MdOutlineEmail, MdOutlineLocalPhone } from "react-icons/md";
import { RiLinkedinFill, RiMessengerLine } from "react-icons/ri";
import Container from "../container";

export default function Footer() {
  const contactInfo = {
    Explore: [
      { id: 1, text: "About Us", href: "/about-us" },
      { id: 2, text: "Guides", href: "/guides" },
      { id: 3, text: "How It Work", href: "/how-it-works" },
      { id: 4, text: "Contact Us", href: "/contact-us" },
    ],
    Services: [
      { id: 1, text: "Flight", href: "/" },
      { id: 2, text: "Hotel", href: "/" },
      { id: 3, text: "Holiday", href: "/" },
      { id: 4, text: "Visa", href: "/" },
    ],
  };
  const commonLinksStyle =
    " transition-colors duration-300 hover: mb-[7px] block text-[13px] leading-[20px]";

  const socialLinks = [
    { id: 1, icon: <FaFacebookF />, href: siteInfo.contactInfo.facebook },
    { id: 2, icon: <RiMessengerLine />, href: siteInfo.contactInfo.facebook },
    { id: 3, icon: <FiTwitter />, href: siteInfo.contactInfo.twitter },
    { id: 4, icon: <FaInstagram />, href: siteInfo.contactInfo.instagram },
    { id: 5, icon: <FiYoutube />, href: siteInfo.contactInfo.youtube },
    { id: 6, icon: <RiLinkedinFill />, href: siteInfo.contactInfo.linkedin },
  ];

  const payImage = [
    "/images/pay/2.svg",
    "/images/pay/3.svg",
    "/images/pay/4.svg",
    "/images/pay/5.svg",
    "/images/pay/6.svg",
    "/images/pay/7.svg",
    "/images/pay/8.svg",
    "/images/pay/9.svg",
    "/images/pay/10.svg",
    "/images/pay/11.svg",
  ];

  return (
    <div
      className="bg-secondary"
      style={{
        // backgroundImage: "url(/images/bg/bottom-shape.webp)",
        backgroundPosition: "bottom center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Container className="pt-8 text-white">
        <div className="grid gap-4 mb-8 md:grid-cols-9 grid-cols-1 md:px-0 px-4">
          <div className="md:col-span-2 col-span-full">
            <Link
              href="/"
              aria-label="Go home"
              title="Company"
              className="flex gap-4 items-center"
            >
              <Image
                className="h-16 w-fit bg-white"
                src={siteInfo.logo}
                alt={siteInfo.name}
                height={500}
                width={900}
              />
              {/* <div className="text-white">
                <h2 className="text-2xl font-bold">{siteInfo.name}</h2>
              </div> */}
            </Link>
            <div>
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex gap-1 ">
                  <CiLocationOn className="" />
                  <a
                    href={`https://www.google.com/maps/search/${siteInfo.companyInfo.address}`}
                    className="text-xs "
                  >
                    {siteInfo.companyInfo.address}
                  </a>
                </div>
                <div className="flex gap-2 ">
                  <MdOutlineEmail className="text-[15px]" />
                  <a
                    href={`mailto:${siteInfo.companyInfo.emails[0]}`}
                    className="text-xs hover:underline"
                  >
                    {" "}
                    {siteInfo.companyInfo.emails[0]}
                  </a>
                </div>
                <div className="flex gap-2 ">
                  <MdOutlineLocalPhone className="text-[15px]" />
                  <a
                    href={`tel:${siteInfo.companyInfo.phones[0]}`}
                    className="text-xs hover:underline"
                  >
                    {siteInfo.companyInfo.phones[0]}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-3 md:grid-cols-2 md:px-4">
            {Object.entries(contactInfo).map(([title, links]) => (
              <div key={title}>
                <p className="font-semibold tracking-wide">{title}</p>
                <ul className="mt-3">
                  {links.map((link) => (
                    <li key={link.id} className="hover:underline">
                      <Link href={link.href} className={commonLinksStyle}>
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="md:col-span-2">
            <p className="font-semibold tracking-wide mb-3">Contact Us</p>
            <div>
              <ul>
                <li>
                  <p className={commonLinksStyle + " flex mb-[5px]"}>
                    <span className="me-1 font-semibold ">Email:</span>
                    <a
                      href={`mailto:${siteInfo.companyInfo.emails[0]}`}
                      className=" hover:underline"
                    >
                      {siteInfo.companyInfo.emails[0]}
                    </a>
                  </p>
                </li>
                <li>
                  <p className={commonLinksStyle + " flex mb-[5px]  "}>
                    <span className="me-1 font-semibold  ">Phone:</span>
                    <a
                      href={`tel:${siteInfo.contactInfo.phones[0]}`}
                      className=" hover:underline"
                    >
                      {siteInfo.contactInfo.phones[0]}
                    </a>
                  </p>
                </li>
                <li>
                  <p className={commonLinksStyle + " flex mb-[5px] "}>
                    <span className="me-1 font-semibold ">WhatsApp:</span>
                    <a
                      href={`https://wa.me/${siteInfo.contactInfo.whatsapp}`}
                      className=" hover:underline"
                    >
                      {siteInfo.contactInfo.whatsapp}
                    </a>
                  </p>
                </li>
              </ul>
              <div className="flex justify-between mt-3 pe-10 ">
                {socialLinks.map((link, index) => (
                  <a key={index} href={link.href} className=" py-2 pe-2 hover:">
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-2 ">
            <p className="font-semibold tracking-wide mb-3">We accept</p>
            <div className="grid grid-cols-5">
              {payImage.map((pay, index) => (
                <div key={index} className="w-[48px] h-[28px] mb-1">
                  <Image src={pay} alt="pay" height={100} width={100} />
                </div>
              ))}
            </div>
            <div className="mt-2">
              <p className="mb-[2px] text-xs">Verified by</p>
              <Image
                src={"/images/ssl.png"}
                width={150}
                height={100}
                alt="ssl"
              />
            </div>
          </div>
        </div>
      </Container>
      <div className="h-[2px] bg-gray-300"></div>
      <Container className="text-white">
        <div className="flex flex-col justify-between pt-6 md:pb-5 pb-8  sm:flex-row ">
          <div className="flex md:justify-start justify-between md:border-0 md:pb-0 pb-4">
            <div className="relative md:pe-4 pt-[2px]">
              <a href="/terms" className="text-sm  text-[13px]">
                Terms & Conditions
              </a>
              <div className="absolute hidden md:block w-[1px] h-[25px] bg-gray-100 right-0 top-0 transform -rotate-180 "></div>
            </div>

            <div className="relative md:px-4 pt-[2px]">
              <Link href="/privacy" className="text-sm  text-[13px]">
                Privacy Policy
              </Link>
              <div className="absolute hidden md:block w-[1px] h-[25px] bg-gray-100 right-0 top-0 transform -rotate-180 "></div>
            </div>
          </div>

          <p className="text-sm  md:mt-0 mt-0 text-center">
            Copyright © {new Date().getFullYear()}{" "}
            <a href="" className="">
              {siteInfo.name}
            </a>
            . All rights reserved
            <span className="text-[14px]  md:mt-0   mt-4 text-center">
              Designed and Developed by{" "}
              <Link className="" target="_blank" href={"https://m360ict.com/"}>
                M360ICT
              </Link>
            </span>
          </p>
        </div>
      </Container>
    </div>
  );
}
