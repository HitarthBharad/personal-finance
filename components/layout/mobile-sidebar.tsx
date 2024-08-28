import UserModules from "./user-modules";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { moduleItems } from "@/data/moduleItems";
import { MenuIcon, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import useTheme from "@/hooks/useTheme";
import Link from "next/link";

export default function MobileSidebar() {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    return (
        <>
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                    <MenuIcon />
                </SheetTrigger>
                <SheetContent side="left" className="!px-0">
                    <div className="space-y-4 py-4">
                        <div className="px-3 py-2">
                            <div className="mb-2 px-4 pb-2">
                                <Link
                                    href={"/user"}
                                >
                                    Rock Paper Scissor
                                </Link>
                            </div>

                            {/* <div className="py-2">
                                <Button
                                    size={'sm'}
                                    className="text-xs md:text-sm  text-white w-full "
                                    onClick={() => navigate('/user/workflows/list/add')}
                                >
                                    <Plus className="mr-2 h-4 w-4" /> New Workflow
                                </Button>
                            </div> */}
                            <div className="space-y-1">
                                <UserModules items={moduleItems} />
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
