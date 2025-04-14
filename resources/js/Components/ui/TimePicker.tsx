import { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import dayjs from "dayjs";

// Generate times in 15-minute intervals for 24 hours
const allTimes = Array.from({ length: (24 * 4) }, (_, i) => 
    dayjs().startOf("day").add(i * 15, "minute")
);

// Convert all times to 12-hour format with AM/PM
const times = allTimes.map(time => time.format("hh:mm A")); // 12-hour format with AM/PM

// Function to get the closest 15-minute interval to current time
const getClosestTime = () => {
    const now = dayjs();
    const currentMinutes = now.minute();
    const roundedMinutes = Math.round(currentMinutes / 15) * 15;
    const closestTime = now.startOf('hour').add(roundedMinutes, 'minute');
    return closestTime.format("hh:mm A");
};

interface TimePickerProps {
    onTimeSelect?: (time: string) => void;
}

const TimePicker = ({ onTimeSelect }: TimePickerProps) => {
    const [selectedTime, setSelectedTime] = useState(getClosestTime());

    // Call onTimeSelect with initial time when component mounts
    useEffect(() => {
        if (onTimeSelect) {
            onTimeSelect(selectedTime);
        }
    }, []);

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        if (onTimeSelect) {
            onTimeSelect(time);
        }
    };

    return (
        <div className="relative w-full bg">
            <input
                type="hidden"
                name="time"
                value={selectedTime}
            />
            <Listbox value={selectedTime} onChange={handleTimeSelect}>
                <Listbox.Button className="w-full flex items-center justify-between px-4 py-2 bg-white border-white border text-black rounded-md shadow">
                    <span>{selectedTime}</span>
                    <ChevronDownIcon className="h-4 w-4" />
                </Listbox.Button>
                <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white text-secondary rounded-md shadow-lg">
                        {times.map((time, index) => (
                            <Listbox.Option
                                key={index}
                                value={time}
                                className={({ active }) =>
                                    `cursor-pointer select-none px-4 py-2 ${
                                        active ? "bg-secondary text-white" : ""
                                    }`
                                }
                            >
                                {time}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </Listbox>
        </div>
    );
};

export default TimePicker;
