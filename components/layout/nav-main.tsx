"use client";

import { ChevronRight, Search, type LucideIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { usePathname } from "next/navigation";
import { Input } from "../ui/input";

export function NavMain({
  className,
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: { title: string; url: string }[];
  }[];
} & React.ComponentProps<"ul">) {
  const pathname = usePathname();

  return (
    <ul className={cn("grid gap-0.5", className)}>
      {items.map((item) => {
        const isNested = item.items?.length;
        const activePath =
          (item.url === "/dashboard" && pathname === "/dashboard") ||
          (item.url !== "/dashboard" && pathname.startsWith(item.url));
        if (!isNested) {
          return (
            <li>
              <Link
                href={item.url}
                className={cn(
                  "min-w-8 flex h-8 flex-1 items-center gap-2 overflow-hidden rounded-md px-1.5 text-sm font-medium outline-none ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 ",
                  {
                    "bg-accent text-accent-foreground": activePath,
                  }
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <div className="flex flex-1 overflow-hidden">
                  <div className="line-clamp-1 pr-6">{item.title}</div>
                </div>
              </Link>
            </li>
          );
        }

        return (
          <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
            <li>
              <div
                className={cn("relative flex items-center ", {
                  "bg-accent text-accent-foreground": activePath,
                })}
              >
                <CollapsibleTrigger className="min-w-8 flex h-8 flex-1 items-center gap-2 overflow-hidden rounded-md px-1.5 text-sm font-medium outline-none ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2">
                  <item.icon className="h-4 w-4 shrink-0" />
                  <div className="flex flex-1 overflow-hidden">
                    <div className="line-clamp-1 pr-6">{item.title}</div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="absolute right-1 h-6 w-6 rounded-md p-0 ring-ring transition-all focus-visible:ring-2 data-[state=open]:rotate-90"
                  >
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="px-4 py-0.5">
                <ul className="grid border-l px-2">
                  {item.items?.map((subItem) => (
                    <li key={subItem.title}>
                      <Link
                        href={subItem.url}
                        className="min-w-8 flex h-8 items-center gap-2 overflow-hidden rounded-md px-2 text-sm font-medium text-muted-foreground ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2"
                      >
                        <div className="line-clamp-1">{subItem.title}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </li>
          </Collapsible>
        );
      })}
    </ul>
  );
}

function SidebarSearch({
  results,
}: {
  results: {
    title: string;
    teaser: string;
    url: string;
  }[];
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className="min-w-8 flex h-8 w-full flex-1 items-center gap-2 overflow-hidden rounded-md px-1.5 text-sm font-medium outline-none ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground">
          <Search className="h-4 w-4 shrink-0" />
          <div className="flex flex-1 overflow-hidden">
            <div className="line-clamp-1 pr-6">Search</div>
          </div>
        </DrawerTrigger>
        <DrawerContent>
          <form>
            <div className="border-b p-2.5">
              <Input
                type="search"
                placeholder="Search..."
                className="h-8 rounded-sm shadow-none focus-visible:ring-0"
              />
            </div>
          </form>
          <div className="grid gap-1 p-1.5 text-sm">
            {results.map((result) => (
              <Link
                href={result.url}
                key={result.title}
                className="rounded-md p-2.5 outline-none ring-ring hover:bg-accent hover:text-accent-foreground focus-visible:ring-2"
              >
                <div className="font-medium">{result.title}</div>
                <div className="line-clamp-2 text-muted-foreground">
                  {result.teaser}
                </div>
              </Link>
            ))}
            <Separator className="my-1.5" />
            <Link
              href="#"
              className="rounded-md px-2.5 py-1 text-muted-foreground outline-none ring-ring hover:text-foreground focus-visible:ring-2"
            >
              See all results
            </Link>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover>
      <PopoverTrigger className="min-w-8 flex h-8 w-full flex-1 items-center gap-2 overflow-hidden rounded-md px-1.5 text-sm font-medium outline-none ring-ring transition-all hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground">
        <Search className="h-4 w-4 shrink-0" />
        <div className="flex flex-1 overflow-hidden">
          <div className="line-clamp-1 pr-6">Search</div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="start"
        sideOffset={4}
        className="w-96 p-0"
      >
        <form>
          <div className="border-b p-2.5">
            <Input
              type="search"
              placeholder="Search..."
              className="h-8 rounded-sm shadow-none focus-visible:ring-0"
            />
          </div>
        </form>
        <div className="grid gap-1 p-1.5 text-sm">
          {results.map((result) => (
            <Link
              href={result.url}
              key={result.title}
              className="rounded-md p-2.5 outline-none ring-ring hover:bg-accent hover:text-accent-foreground focus-visible:ring-2"
            >
              <div className="font-medium">{result.title}</div>
              <div className="line-clamp-2 text-muted-foreground">
                {result.teaser}
              </div>
            </Link>
          ))}
          <Separator className="my-1.5" />
          <Link
            href="#"
            className="rounded-md px-2.5 py-1 text-muted-foreground outline-none ring-ring hover:text-foreground focus-visible:ring-2"
          >
            See all results
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
