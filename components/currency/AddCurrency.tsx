import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { toast } from "sonner"
import fontSans from "@/utils/fontSans"
import { cn } from "@/utils/lib/utils"

interface IListCurrency {
    currencyName: string;
    balance: number;
    currencySymbol: string;
};

const AddCurrency = ({ setCurrencyList }: { setCurrencyList: any }) => {

    const [error, setError] = useState();
    const [open, setOpen] = useState(false);

    const currencyFormSchema = z.object({
        currencyName: z.string(),
        currencySymbol: z.string()
    });

    const form = useForm({
        resolver: zodResolver(currencyFormSchema),
        defaultValues: {
            currencyName: "",
            currencySymbol: ""
        },
    });

    const onSubmit = async ({ currencyName, currencySymbol }: { currencyName: string, currencySymbol: string }) => {

        console.log(currencyName, currencySymbol);

        const res = await fetch("/api/currency/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                currencyName,
                currencySymbol
            })
        });

        const result = await res.json();
        if (result.success) {
            setCurrencyList((prevItems: IListCurrency[]) => [...prevItems, {
                currencySymbol,
                currencyName,
                balance: 0
            }]);
            setOpen(false);
        }
        else {
            if (result.errorType === "field") {
                setError(result.error)
            }
            else {
                toast(result.message)
            }
        }
    };

    const { isSubmitting, isValid } = form.formState;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={() => setOpen(true)}>
                <Button variant="outline">Add Currency</Button>
            </DialogTrigger>
            <DialogContent className={cn(
                "font-sans antialiased",
                fontSans.variable
            )}>
                <DialogHeader>
                    <DialogTitle>Add Currency</DialogTitle>
                    <DialogDescription>
                        to start recording your transactions.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 my-4 flex flex-col"
                    >
                        <FormField
                            control={form.control}
                            name="currencyName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Currency Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-[350px]"
                                            disabled={isSubmitting}
                                            placeholder="USD"
                                            required={true}
                                            {...field} />
                                    </FormControl>
                                    <FormMessage>{error?.["currencyName"]}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="currencySymbol"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Currency Symbol</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-[350px]"
                                            disabled={isSubmitting}
                                            required={true}
                                            placeholder="$"
                                            {...field} />
                                    </FormControl>
                                    <FormMessage>{error?.["currencySymbol"]}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit" disabled={!isValid || isSubmitting}>Add</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
};

export default AddCurrency;