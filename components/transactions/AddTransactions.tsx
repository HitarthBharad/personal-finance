import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { string, z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { DatePicker } from "../DateTimePicker"
import { toast } from "sonner"
import { cn } from "@/utils/lib/utils"
import fontSans from "@/utils/fontSans"
import Image from "next/image"
import Loader from "../Loader"

interface IBankAccountList {
    name: string;
    value: string;
    provider: string;
};

const trasactionType = [
    {
        value: "Credit",
        name: "Credit"
    },
    {
        value: "Expense",
        name: "Expense"
    }
];

const headerType = [
    {
        value: "Cash",
        name: "Cash"
    },
    {
        value: "Bank",
        name: "Bank"
    },
    {
        value: "Credit Card",
        name: "Credit Card"
    }
]

const AddTransactions = ({ currency, setTransactionList }: { currency: { name: string, symbol: string }, setTransactionList: any }) => {

    const [error, setError] = useState();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [bankAccountList, setBankAccountList] = useState<IBankAccountList[] | []>([]);
    const [creditCardList, setCreditCardList] = useState([]);

    useEffect(() => {
        const fetchBankAccountData = async () => {
            setLoading(true);
            try {
                if (currency?.name) {
                    const res = await fetch(`/api/bank-account/fetch/${currency?.name}`);
                    const result = await res.json();
                    if (!res.ok) {
                        toast(result.message);
                    }

                    setBankAccountList(result.data.map(data => {
                        return {
                            name: data.debitCardNumber,
                            provider: data.debitCardProvider,
                            value: data._id
                        }
                    }));

                }
            } catch (err) {
                toast(err.message);
            } finally {
                setLoading(false);
            }
        };

        const fetchCreditCardData = async () => {
            setLoading(true);
            try {
                if (currency?.name) {
                    const res = await fetch(`/api/credit-card/fetch/${currency?.name}`);
                    const result = await res.json();
                    if (!res.ok) {
                        toast(result.message);
                    }

                    setCreditCardList(result.data.map(data => {
                        return {
                            name: data.creditCardNumber,
                            provider: data.creditCardProvider,
                            value: data._id
                        }
                    }));

                }
            } catch (err) {
                toast(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBankAccountData();
        fetchCreditCardData();


    }, []);

    console.log(bankAccountList);

    const transactionFormSchema = z.object({
        date: z.date(),
        type: z.string(),
        title: z.string(),
        accountHeader: z.string(),
        bankAccountId: z.string().optional(),
        creditCardId: z.string().optional(),
        description: z.string(),
        amount: z.string()
    });

    const form = useForm({
        resolver: zodResolver(transactionFormSchema),
        defaultValues: {
            date: new Date(),
            type: "expense",
            accountHeader: "Cash",
            title: "",
            description: "",
            amount: 0
        },
    });

    const onSubmit = async ({ date, type, accountHeader, title, description, amount, bankAccountId }) => {
        const res = await fetch("/api/transactions/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ date, type, accountHeader, title, description, amount, currencyName: currency.name, bankAccountId  })
        });

        const result = await res.json();
        if (result.success) {
            setTransactionList((prevItems) => [...prevItems, { date: new Date(date), type, accountHeader, title, description, amount, balance: `${currency.symbol} 7,100` }]);
            setOpen(false);
        }
        else {
            if (result.errorType === "field") {
                setError(result.error)
            }
            else {
                toast.error(result.message)
            }
        }
    };

    const { isSubmitting, isValid } = form.formState;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <Button variant="outline">Record Transaction</Button>
            </DialogTrigger>
            <DialogContent className={cn(
                "font-sans antialiased item-center",
                fontSans.variable
            )}>
                <DialogHeader>
                    <DialogTitle>Record Transaction for {currency.name}</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    {
                        loading ? (
                            <Loader />
                        ) : (
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-4 my-4 flex flex-col"
                            >
                                <FormField
                                    control={form.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem className={cn(
                                            "font-sans antialiased flex flex-col",
                                            fontSans.variable
                                        )}
                                        >
                                            <FormLabel className="font-semibold">Transaction Date</FormLabel>
                                            <FormControl>
                                                <DatePicker
                                                    {...field}
                                                    required={true}
                                                    onChange={(date) => field.onChange(date)}
                                                    defaultValue={field.value}
                                                />
                                            </FormControl>
                                            <FormMessage>{error?.["date"]}</FormMessage>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem className={"flex flex-col space-y-1"}>
                                            <FormLabel className="font-semibold py-1">Transaction Type</FormLabel>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    required
                                                    name={field.name}
                                                    onValueChange={(value) => field.onChange(value)}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Type" />
                                                    </SelectTrigger>
                                                    <SelectContent className={cn(
                                                        "font-sans antialiased flex px-3 py-2 text-sm",
                                                        fontSans.variable
                                                    )}>
                                                        {trasactionType?.map((type, index) => (
                                                            <SelectItem key={index} value={type.value}>
                                                                {type.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage>{error?.["type"]}</FormMessage>  {/* Adjust error key */}
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="accountHeader"
                                    render={({ field }) => (
                                        <FormItem className={"flex flex-col space-y-1"}>
                                            <FormLabel className="font-semibold py-2">Type of Account Header</FormLabel>
                                            <FormControl>
                                                <Select
                                                    {...field}
                                                    required
                                                    name={field.name}
                                                    onValueChange={(value) => field.onChange(value)}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select Type" />
                                                    </SelectTrigger>
                                                    <SelectContent className={cn(
                                                        "font-sans antialiased flex px-3 py-2 text-sm",
                                                        fontSans.variable
                                                    )}>
                                                        {headerType?.map((type, index) => (
                                                            <SelectItem key={index} value={type.value}>
                                                                {type.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage>{error?.["accountHeader"]}</FormMessage>
                                        </FormItem>
                                    )}
                                />

                                {
                                    form.getValues("accountHeader") === "Bank" && (
                                        <FormField
                                        control={form.control}
                                        name="bankAccountId"
                                        render={({ field }) => (
                                            <FormItem className={"flex flex-col space-y-1"}>
                                                <FormLabel className="font-semibold py-2">Select the Bank Account</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        required
                                                        name={field.name}
                                                        onValueChange={(value) => field.onChange(value)}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select Type" />
                                                        </SelectTrigger>
                                                        <SelectContent className={cn(
                                                            "font-sans antialiased flex px-3 py-2 text-sm",
                                                            fontSans.variable
                                                        )}>
                                                            {bankAccountList?.map((acc, index) => (
                                                                <SelectItem key={index} value={acc?.value}>
                                                                    <div className="flex items-center space-x-2">
                                                                        {
                                                                            acc?.provider === "Mastercard" && (
                                                                                <Image
                                                                                    src="/mastercard.png"
                                                                                    alt="Mastercard Logo"
                                                                                    width={20}
                                                                                    height={12}
                                                                                />
                                                                            )
                                                                        }
                                                                        {
                                                                            acc?.provider === "Visa" && (
                                                                                <Image
                                                                                    src="/visa.png"
                                                                                    alt="Visa Logo"
                                                                                    width={20}
                                                                                    height={12}
                                                                                />
                                                                            )
                                                                        }
                                                                        <span>{acc?.name}</span>
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage>{error?.["accountHeader"]}</FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                    )
                                }

                                {
                                    form.getValues("accountHeader") === "Credit Card" && (
                                        <FormField
                                        control={form.control}
                                        name="creditCardId"
                                        render={({ field }) => (
                                            <FormItem className={"flex flex-col space-y-1"}>
                                                <FormLabel className="font-semibold py-2">Select the Bank Account</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        {...field}
                                                        required
                                                        name={field.name}
                                                        onValueChange={(value) => field.onChange(value)}
                                                    >
                                                        <SelectTrigger className="w-full">
                                                            <SelectValue placeholder="Select Type" />
                                                        </SelectTrigger>
                                                        <SelectContent className={cn(
                                                            "font-sans antialiased flex px-3 py-2 text-sm",
                                                            fontSans.variable
                                                        )}>
                                                            {creditCardList?.map((acc, index) => (
                                                                <SelectItem key={index} value={acc?.value}>
                                                                    <div className="flex items-center space-x-2">
                                                                        {
                                                                            acc?.provider === "Mastercard" && (
                                                                                <Image
                                                                                    src="/mastercard.png"
                                                                                    alt="Mastercard Logo"
                                                                                    width={20}
                                                                                    height={12}
                                                                                />
                                                                            )
                                                                        }
                                                                        {
                                                                            acc?.provider === "Visa" && (
                                                                                <Image
                                                                                    src="/visa.png"
                                                                                    alt="Visa Logo"
                                                                                    width={20}
                                                                                    height={12}
                                                                                />
                                                                            )
                                                                        }
                                                                        <span>{acc?.name}</span>
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                                <FormMessage>{error?.["accountHeader"]}</FormMessage>
                                            </FormItem>
                                        )}
                                    />
                                    )
                                }
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem className={"flex flex-col space-y-1"}>
                                            <FormLabel className="font-semibold">Title</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="w-[350px]"
                                                    disabled={isSubmitting}
                                                    required={true}
                                                    placeholder="Rent"
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem className={"flex flex-col space-y-1"}>
                                            <FormLabel className="font-semibold">Description</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="w-[350px]"
                                                    disabled={isSubmitting}
                                                    required={true}
                                                    type="textarea"
                                                    placeholder=""
                                                    {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="amount"
                                    render={({ field }) => (
                                        <FormItem className={"flex flex-col space-y-1"}>
                                            <FormLabel className="font-semibold">Amount</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center">
                                                    <span className="px-2 text-gray-500">{currency.symbol}</span>
                                                    <Input
                                                        className="w-[350px]"
                                                        disabled={isSubmitting}
                                                        type="number"
                                                        required={true}
                                                        placeholder=""
                                                        {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter>
                                    <Button type="submit" disabled={!isValid || isSubmitting}>Add</Button>
                                </DialogFooter>
                            </form>
                        )
                    }
                </Form>
            </DialogContent>
        </Dialog>
    )
};

export default AddTransactions;