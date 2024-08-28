import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/utils/lib/utils";
import { LogOut, ReceiptTextIcon, Settings, User } from "lucide-react";
import { useRouter } from "next/router";

export default function UserNav() {
    // const { user } = useLoaderData<typeof loader>();
    // const navigate = useNavigate();

    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 relative">
                        <AvatarImage
                            src={""}
                            alt={""}
                        />
                        {/* <AvatarFallback>{user?.name?.[0]}</AvatarFallback> */}
                    </Avatar>
                    <span
                        className={cn(
                            "absolute bottom-[-3px] right-[-2px]",
                            false
                                ? "text-red-600"
                                : "text-green-600 animate-ping"
                        )}
                    >
                        ●
                    </span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            Hitarth Bharad
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            hitarth.bharad@gmail.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => router.push("/user/profile")}
                    >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => router.push("/user/billing")}
                    >
                        <ReceiptTextIcon className="mr-2 h-4 w-4" />
                        Billing
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                {/* <Form method="post" action="/logout"> */}
                    <button type="submit" className="w-full">
                        <DropdownMenuItem className="cursor-pointer">
                            <LogOut className="mr-2 h-4 w-4" />
                            Log out
                        </DropdownMenuItem>
                    </button>
                {/* </Form> */}
            </DropdownMenuContent>
        </DropdownMenu >
    );
}
