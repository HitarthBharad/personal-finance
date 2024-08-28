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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "@/utils/lib/utils"
import fontSans from "@/utils/fontSans"

const debitCardProvider = [
    {
        name: "Mastercard",
        value: "Mastercard"
    },
    {
        name: "Visa",
        value: "Visa"
    }
];

  
const AddBankAccount = ({open, setOpen, currencyName}) => {

    const [error, setError] = useState();

    const bankAccountShcema = z.object({
        bankName: z.string(),
        debitCardNumber: z.string(),
        debitCardProvider: z.string()
    });

    const form = useForm({
        resolver: zodResolver(bankAccountShcema),
        defaultValues: {
            bankName: "",
            debitCardNumber: "",
            debitCardProvider: "Mastercard"
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async({bankName, debitCardNumber, debitCardProvider}: {
        bankName: string, debitCardNumber: string, debitCardProvider: string}) => {

        const res = await fetch("/api/bank-account/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bankName,
                debitCardNumber,
                debitCardProvider,
                currencyName
            })
        });

        const result = await res.json();
        if (result.success) {
            toast.success("Bank details added successfully !")
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
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className={cn(
                "font-sans antialiased",
                fontSans.variable
            )}>
                <DialogHeader>
                    <DialogTitle>Add Bank Account</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 my-4 flex flex-col"
                    >
                        <FormField
                            control={form.control}
                            name="bankName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Bank Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-[350px]"
                                            disabled={isSubmitting}
                                            placeholder="JPMorgan Chase"
                                            required={true}
                                            {...field} />
                                    </FormControl>
                                    <FormMessage>{error?.["currencyName"]}</FormMessage>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="debitCardNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Debit Card Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="w-[350px]"
                                            disabled={isSubmitting}
                                            required={true}
                                            placeholder="1234"
                                            {...field} />
                                    </FormControl>
                                    <FormMessage>{error?.["currencySymbol"]}</FormMessage>
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="debitCardProvider"
                            render={({ field }) => (
                                <FormItem className={"flex flex-col space-y-1"}>
                                    <FormLabel className="font-semibold">Debit Card Provider</FormLabel>
                                    <FormControl>
                                        <Select
                                            {...field}
                                            required
                                            name={field.name}
                                            onValueChange={(value) => field.onChange(value)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {debitCardProvider?.map((type, index) => (
                                                    <SelectItem key={index} value={type.value} className={cn(
                                                        "font-sans antialiased",
                                                        fontSans.variable
                                                    )}>
                                                        {type.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage>{error?.["type"]}</FormMessage>
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

export default AddBankAccount;