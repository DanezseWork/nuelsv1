import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "lucide-react";
import dayjs from "dayjs";

// Generate times in 15-minute intervals for 24 hours
const allTimes = Array.from({ length: (24 * 4) }, (_, i) => 
    dayjs().startOf("day").add(i * 15, "minute")
);

// Convert all times to 12-hour format with AM/PM
const times = allTimes.map(time => time.format("hh:mm A")); // 12-hour format with AM/PM

const TimePicker = () => {
    const [selectedTime, setSelectedTime] = useState(times[0]);

    return (
        <div className="relative w-full">
            <Listbox value={selectedTime} onChange={setSelectedTime}>
                <Listbox.Button className="w-full flex items-center justify-between px-4 py-2 bg-secondary border-white border text-white rounded-md shadow">
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
