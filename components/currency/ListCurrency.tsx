import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../DropDown";
import { Button } from "../ui/button";
import { CreditCard, Eye, Landmark, MoreHorizontal } from "lucide-react";
import AddBankAccount from "./AddBankAccount";
import { useState } from "react";
import { cn } from "@/utils/lib/utils";
import fontSans from "@/utils/fontSans";
import AddCreditCard from "./AddCreditCard";

interface IListCurrency {
    currencyName: string;
    balance: number;
    currencySymbol: string;
};

const ListCurrency = ({ item, selectedCurrency, setSelectedCurrency }: { item: IListCurrency, selectedCurrency: string | undefined, setSelectedCurrency: any }) => {
    const isSelected = item.currencyName === selectedCurrency?.name;

    const [openBankAccount, setOpenBankAccount] = useState(false);
    const [openCreditCardForm, setOpenCreditCardForm] = useState(false);

    return (
        <>
            <Card
                className={`cursor-pointer transition-transform transform hover:scale-105 ml-2 
                        ${isSelected ? 'border border-blue-500 bg-blue-50' : 'border-none'}`}
                onClick={() => setSelectedCurrency({ name: item.currencyName, symbol: item.currencySymbol })}
            >
                <CardHeader className="flex flex-row items-center justify-between space-y-0">
                    <CardTitle className={`text-base font-semibold ${isSelected ? 'text-blue-500' : ''}`}>
                        {item.currencyName}
                    </CardTitle>
                    <div className={`text-base font-semibold z-index-1000 ${isSelected ? 'text-blue-500' : ''}`}>
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className={cn(
                                "font-sans antialiased",
                                fontSans.variable
                            )}>
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>

                                <DropdownMenuItem
                                    onClick={() => { setOpenBankAccount(true) }}
                                >
                                    <Landmark className="mr-2 h-4 w-4" /> Add Bank Account
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => { setOpenCreditCardForm(true) }}
                                >
                                    <CreditCard className="mr-2 h-4 w-4" /> Add Credit Card
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent className="pt-2">
                    <div className={`text-xl font-bold ${isSelected ? 'text-blue-500' : ''}`}>
                        {item.currencySymbol} {item.balance.toLocaleString()}
                    </div>
                </CardContent>
            </Card>
            <AddBankAccount open={openBankAccount} setOpen={setOpenBankAccount} currencyName={selectedCurrency?.name}/>
            <AddCreditCard open={openCreditCardForm} setOpen={setOpenCreditCardForm} currencyName={selectedCurrency?.name} />
        </>
    );
}

export default ListCurrency;
