import UserModules from "./user-modules";
import { moduleItems } from "@/data/moduleItems";
import { cn } from "@/utils/lib/utils";
import { LogOut, ReceiptTextIcon } from "lucide-react";
import useTheme from "@/hooks/useTheme";
import Link from "next/link";

export default function Sidebar({}) {
	const theme = useTheme();

	return (
		<nav
			className={cn(
				`flex-shrink-0 bg-background-sidebar hidden sticky h-full overflow-y-hidden border-r lg:block w-56`
			)}
		>
			<div className="flex justify-between flex-col space-y-4 py-4 ">
				<div className="px-3 py-2">
					<div className="space-y-1">
						<div className="mb-2 px-4 pb-2">
							<Link href="/home">
								RPS
							</Link>
						</div>

						<UserModules items={moduleItems}/>
					</div>
				</div>
				{/* <div className="absolute bottom-0 px-3 py-2 w-48 flex gap-2 flex-col">
					<Link href="/home">
						<span
							className={cn(
								"group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transparent",
							)}
						>
							<ReceiptTextIcon
								className={cn(
									"mr-2 h-4 w-4"
								)}
							/>
							<span>Billing</span>
						</span>
					</Link>

					<Form method="post" action="/logout">
						<button type="submit" className="group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground w-48 cursor-pointer">
							<LogOut
								className={cn(
									"mr-2 h-4 w-4"
								)}
							/>
							<span>Logout</span>
						</button>
					</Form>

					<p className="text-sm dark:text-n-2 text-n-5  px-3 py-2">
						© {new Date().getFullYear()}. RPS
					</p>

				</div> */}
			</div>
		</nav>
	);
}
