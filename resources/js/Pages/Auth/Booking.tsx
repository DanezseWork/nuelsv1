import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';
import { Dropdown } from "@/Components/ui/Dropdown";
import { MapModal } from "@/Components/ui/MapModal";
import { Calendar } from "@/Components/ui/Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/Components/ui/Popover";
import { Button } from "@/Components/ui/Button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import TimePicker from "@/Components/ui/TimePicker";
import dayjs from 'dayjs';

export default function Booking() {
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const { data, setData, post, processing, errors, reset, setError } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        date: '',
        time: dayjs().format('hh:mm A'),
        service: '',
        location: '',
        address: '',
    });

    const [date, setDate] = useState<Date | undefined>(data.date ? new Date(data.date) : undefined);

    const handleChange = (field: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setData(field, e.target.value);

        // Clear error for this field when user starts typing
        if (errors[field]) {
            setError(field, '');
        }
    };

    const handleDateSelect = (selectedDate: Date | undefined) => {
        setDate(selectedDate);
        if (selectedDate) {
            // Format the date as YYYY-MM-DD without timezone conversion
            const year = selectedDate.getFullYear();
            const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
            const day = String(selectedDate.getDate()).padStart(2, '0');
            setData('date', `${year}-${month}-${day}`);
        }
    };

    const handleTimeSelect = (selectedTime: string) => {
        setData('time', selectedTime);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('booking'), {
            preserveScroll: true,
            onError: (errors) => {
                console.log('Form errors:', errors);
            },
            onSuccess: () => {
                reset();
                alert('Booking submitted successfully!');
            },
        });
    };

    return (
        <GuestLayout fileName="Booking">
            <Head title="Booking" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="first_name" value="First Name" />
                    <TextInput
                        id="first_name"
                        name="first_name"
                        value={data.first_name}
                        className="mt-1 block w-full"
                        autoComplete="first_name"
                        isFocused={true}
                        onChange={handleChange('first_name')}
                        error={!!errors.first_name}
                    />
                    <InputError message={errors.first_name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="last_name" value="Last Name" />
                    <TextInput
                        id="last_name"
                        name="last_name"
                        value={data.last_name}
                        className="mt-1 block w-full"
                        autoComplete="last_name"
                        onChange={handleChange('last_name')}
                        error={!!errors.last_name}
                    />
                    <InputError message={errors.last_name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        onChange={handleChange('email')}
                        error={!!errors.email}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="phone" value="Phone" />
                    <TextInput
                        id="phone"
                        type="tel"
                        name="phone"
                        value={data.phone}
                        className="mt-1 block w-full"
                        autoComplete="phone"
                        onChange={handleChange('phone')}
                        error={!!errors.phone}
                    />
                    <InputError message={errors.phone} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="date" value="Date" />
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
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
                                onSelect={handleDateSelect}
                                initialFocus
                                disabled={(date) => date < new Date()}
                            />
                        </PopoverContent>
                    </Popover>
                    <InputError message={errors.date} className="mt-2" />
                </div>
                
                <div className="mt-4">
                    <InputLabel htmlFor="time" value="Time" />
                    <TimePicker onTimeSelect={handleTimeSelect} />
                    <InputError message={errors.time} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="service" value="Service" />
                    <Dropdown
                        value={data.service}
                        onChange={(value) => {
                            setData('service', value);
                            if (errors.service) {
                                setError('service', '');
                            }
                        }}
                        options={[
                            { value: 'Hair', label: 'Hair' },
                            { value: 'Makeup', label: 'Makeup' },
                            { value: 'Nail', label: 'Nail service' },
                            { value: 'All Services', label: 'All Services' },
                            { value: 'Other', label: 'Other' },
                        ]}
                        placeholder="Select a service"
                    />
                    <InputError message={errors.service} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="location" value="Location" />
                    <Dropdown
                        value={data.location}
                        onChange={(value) => {
                            setData('location', value);
                            if (errors.location) {
                                setError('location', '');
                            }
                        }}
                        options={[
                            { value: 'Studio', label: 'Studio' },
                            { value: 'Home', label: 'Home' }
                        ]}
                        placeholder="Select a location"
                    />
                    <InputError message={errors.location} className="mt-2" />
                </div>

                {data.location === 'Home' && (
                    <div className="mt-4">
                        <InputLabel htmlFor="address" value="Address" />
                        <TextInput
                            id="address"
                            type="text"
                            name="address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            className="w-full"
                            placeholder="Enter your address"
                            error={!!errors.address}
                        />
                        <InputError message={errors.address} className="mt-2" />
                    </div>
                )}

                <MapModal
                    isOpen={isMapModalOpen}
                    onClose={() => setIsMapModalOpen(false)}
                    onSelect={(address) => {
                        setData('address', address);
                        if (errors.address) {
                            setError('address', '');
                        }
                    }}
                    initialAddress={data.address}
                />

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Book Now
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
