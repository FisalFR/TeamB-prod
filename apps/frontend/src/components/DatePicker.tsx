import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
    import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
// import {ReactNode} from "react";

export function DatePicker(props:{onChange:(date: Date| undefined) => void, date: Date|undefined}) {
    if(props.date != undefined) {
        console.log(props.date.toDateString());
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !props.date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {props.date ? format(props.date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={props.date}
                    onSelect={(date) => {props.onChange(date);}}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
export default DatePicker;
