interface ModuleItem {
    title: string;
    href?: string;
    disabled?: boolean;
    external?: boolean;
    icon?: string;
    label?: string;
    description?: string;
}

export const moduleItems: ModuleItem[] = [
    {
        title: "Dashboard",
        href: "home",
        icon: "dashboard",
        label: "Dashboard",
    },
    {
        title: "PnL",
        href: "pnl",
        icon: "wallet-cards",
        label: "PnL",
    },
];
