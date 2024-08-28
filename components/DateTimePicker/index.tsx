import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/utils/lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import fontSans from "@/utils/fontSans";

type DatePickerProps = {
    onChange: (e: Date) => void;
    defaultValue?: string;
}

export function DatePicker({ onChange = () => { }, defaultValue = "" }: DatePickerProps) {
    const selectedDate = defaultValue ? new Date(defaultValue) : null;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    // className={cn(
                    //     "w-full justify-start text-left font-normal",
                    //     !selectedDate && "text-muted-foreground"
                    // )}
                    className={cn(
                        "w-full justify-start text-left font-normal font-sans antialiased",
                       fontSans.variable
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                        format(selectedDate, "PPP")
                    ) : (
                        <span>Pick a date</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={onChange}
                    defaultMonth={selectedDate || undefined}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
