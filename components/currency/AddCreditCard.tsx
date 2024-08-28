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
import Image from "next/image"

const cardProvider = [
    {
        name: "Mastercard",
        value: "Mastercard"
    },
    {
        name: "Visa",
        value: "Visa"
    }
];


const AddCreditCard = ({ open, setOpen, currencyName }) => {

    const [error, setError] = useState();

    const bankAccountShcema = z.object({
        bankName: z.string(),
        creditCardNumber: z.string(),
        creditCardProvider: z.string()
    });

    const form = useForm({
        resolver: zodResolver(bankAccountShcema),
        defaultValues: {
            bankName: "",
            creditCardNumber: "",
            creditCardProvider: "Mastercard"
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async ({ bankName, creditCardNumber, creditCardProvider }: {
        bankName: string, creditCardNumber: string, creditCardProvider: string
    }) => {

        const res = await fetch("/api/credit-card/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                bankName,
                creditCardNumber,
                creditCardProvider,
                currencyName
            })
        });

        const result = await res.json();
        if (result.success) {
            toast.success("Credit added successfully !")
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
                    <DialogTitle>Add Credit Card</DialogTitle>
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
                            name="creditCardNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-semibold">Credit Card Number</FormLabel>
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
                            name="creditCardProvider"
                            render={({ field }) => (
                                <FormItem className={"flex flex-col space-y-1"}>
                                    <FormLabel className="font-semibold">Credit Card Provider</FormLabel>
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
                                                {cardProvider?.map((type, index) => (
                                                    <SelectItem key={index} value={type.value} className={cn(
                                                        "font-sans antialiased",
                                                        fontSans.variable
                                                    )}>
                                                        <div className="flex items-center space-x-2">
                                                            {
                                                                type?.name === "Mastercard" && (
                                                                    <Image
                                                                        src="/mastercard.png"
                                                                        alt="Mastercard Logo"
                                                                        width={20}
                                                                        height={12}
                                                                    />
                                                                )
                                                            }
                                                            {
                                                                type?.name === "Visa" && (
                                                                    <Image
                                                                        src="/visa.png"
                                                                        alt="Visa Logo"
                                                                        width={20}
                                                                        height={12}
                                                                    />
                                                                )
                                                            }
                                                            <span>{type?.name}</span>
                                                        </div>
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

export default AddCreditCard;