import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { CornerDownLeft, Mic, Paperclip } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Dashboard - Support`,
  description: "Chat with our support team",
};

const dummyUsers = [
  {
    name: "John Doe",
    image: "https://via.placeholder.com/50",
    lastMessage: "Hello, this is a dummy chat message!",
  },
  {
    name: "Jane Smith",
    image: "https://via.placeholder.com/50",
    lastMessage: "Hi there, how are you?",
  },
  {
    name: "Alice Johnson",
    image: "https://via.placeholder.com/50",
    lastMessage: "Good morning everyone!",
  },
];

export default function Page() {
  return (
    <div className="flex ">
      <div className="w-96">
        {dummyUsers.map((user, index) => (
          <div
            key={index}
            className="flex items-center p-2 border-b border-gray-200 hover:cursor-pointer"
          >
            <img
              src={user.image}
              alt={user.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <strong>{user.name}</strong>
              <p className="text-gray-500 truncate w-48">{user.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="relative flex flex-col border  h-[92vh] w-full p-4 lg:col-span-2 ">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Support</h1>
          <span className="text-muted-foreground text-sm">
            Chat with our support team
          </span>
        </div>
        <div className="flex-1" />
        <div className="">
          <form className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
            <Label htmlFor="message" className="sr-only">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center p-3 pt-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="button" variant="ghost" size="icon">
                      <Paperclip className="size-4" />
                      <span className="sr-only">Attach file</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Attach File</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="button" variant="ghost" size="icon">
                      <Mic className="size-4" />
                      <span className="sr-only">Use Microphone</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Use Microphone</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Button type="submit" size="sm" className="ml-auto gap-1.5">
                Send Message
                <CornerDownLeft className="size-3.5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
