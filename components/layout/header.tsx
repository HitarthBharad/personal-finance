import { cn } from "@/utils/lib/utils";
import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
// import { ThemeSwitch } from "~/routes/action.set-theme";
// import { useFetcher, useMatches } from "@remix-run/react";

//components
import UserNav from "./user-nav";
import { Button } from "@/components/ui/button";
import MobileSidebar from "./mobile-sidebar";
// import NotificationModule from "./notification-module";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

//icons
import { BellIcon } from "lucide-react";
import ThemeToggle from "./themeToggle";

export default function Header() {

    const [isOpen, setIsOpen] = useState(false)


    return (
        // supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur
        <div className="">
            <nav className="h-14 flex items-center justify-between">
                <div className={cn("block lg:!hidden")}>
                    <MobileSidebar />
                </div>

                <div className="relative flex items-center gap-2">
                    <Popover modal={true}
                        open={isOpen}
                        onOpenChange={(open: boolean) => {
                            setIsOpen(open)
                        }}>
                        <PopoverTrigger>
                            <div className="relative">
                                <Button variant="outline" size="icon">
                                    <BellIcon size={20} />
                                    {/* {notifications?.length > 0 && (
                                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                                            {notifications?.length}
                                        </span>
                                    )} */}
                                </Button>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="p-2 overflow-y-scroll h-[90vh]">
                            <div className="h2 font-semibold">
                                Notifications
                            </div>
                            {/* {notifications?.length > 0 ? (
                                notifications?.map((notification) => {
                                    return (
                                        <NotificationModule notification={notification} />
                                    )
                                })
                            ) : <p className="text-center m-3">No notifications</p>
                            } */}
                        </PopoverContent>
                    </Popover>
                    <ThemeToggle />
                    <UserNav />
                </div>
            </nav>
        </div>
    );
}
