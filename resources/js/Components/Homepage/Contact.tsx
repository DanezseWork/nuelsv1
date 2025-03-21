"use client";

import { CalendarIcon, Check, MoveRight, PhoneCall } from "lucide-react";
import { Badge } from "@/Components/ui/Badge";
import { Button } from "@/Components/ui/Button";
import { Calendar } from "@/Components/ui/Calendar";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/Popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Label } from "@/Components/ui/Label";
import { Input } from "@/Components/ui/Input";
import TimePicker from "@/Components/ui/TimePicker";
import Sparkles from "../Common/Sparkles";
const TimeInputComponent = () => {
  const [time, setTime] = useState('');

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  return (
    <div>
      <label
        htmlFor="time1"
        className="flex items-center h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:opacity-50 md:text-sm"
      >
        {time ? `Selected Time: ${time}` : 'Select a time'}
      </label>
      <input
        id="time1"
        type="time"
        className="hidden"
        value={time}
        onChange={handleTimeChange}
      />
    </div>
  );
};

export const Contact1 = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('');
  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };

  return (
    <div className="relative w-full py-20 lg:py-40 bg-transparent" id="bookingSection">

      <div className="container max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular">
                  Something new
                </h4>
                <p className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-sm text-left">
                  Managing a small business today is already tough. Avoid
                  further complications by ditching outdated, tedious trade
                  methods.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start text-left">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Easy to use</p>
                <p className="text-muted-foreground text-sm">
                  We&apos;ve made it easy to use and understand.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start text-left">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Fast and reliable</p>
                <p className="text-muted-foreground text-sm">
                  We&apos;ve made it easy to use and understand.
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-start text-left">
                <Check className="w-4 h-4 mt-2 text-primary" />
              <div className="flex flex-col gap-1">
                <p>Beautiful and modern</p>
                <p className="text-muted-foreground text-sm">
                  We&apos;ve made it easy to use and understand.
                </p>
              </div>
            </div>
          </div>

          <div className="justify-center flex items-center">
            <div className="rounded-md w-[400px] flex flex-col border p-8 gap-4 bg-secondary border-none text-white z-20">
              <p className="text-2xl font-bold">Book a appointment</p>
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="picture">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full max-w-sm justify-start text-left bg-secondary font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="time">Time</Label>
                <TimePicker />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="firstname">First name</Label>
                <Input id="firstname" type="text" className="focus-visible:!ring-primary focus-visible:!border-primary" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="lastname">Last name</Label>
                <Input id="lastname" type="text" className="focus-visible:!ring-primary focus-visible:!border-primary" />
              </div>

              <Button className="gap-4 w-full bg-yellow-500 text-white font-semibold shadow-[0_0_10px_rgb(250,204,21)] hover:shadow-[0_0_20px_rgb(250,204,21)] transition-shadow duration-300">
                  Book the meeting <MoveRight className="w-4 h-4" />
              </Button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};