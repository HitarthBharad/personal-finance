import { Icons } from "./icons";
import { cn } from "@/utils/lib/utils";
import Link from "next/link";

interface IModuleItems {
    title: string;
    href?: string;
    disabled?: boolean;
    external?: boolean;
    icon?: string;
    label?: string;
    description?: string;
}

interface DashboardNavProps {
	items: IModuleItems[];
	// setOpen?: Dispatch<SetStateAction<boolean>>;
}

const UserModules = ({ items }: DashboardNavProps) => {

	if (!items?.length) {
		return null;
	}

	return (
		<nav className="grid items-start gap-2">
			{items.map((item, index) => {
				const Icon = Icons["arrowRight"];
				
                return (
					item.href && (
						<Link
							href={`${item.href}`}
						>
							<span
								className={cn(
									"group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transparent"
								)}
							>
								<Icon
									className={cn(
										"mr-2 h-4 w-4"
									)}
								/>
								<span>{item.title}</span>
							</span>
						</Link>
					)
				);
			})}
		</nav>
	);
};

export default UserModules;
