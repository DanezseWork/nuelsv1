import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PasswordInput from '@/Components/PasswordInput';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Booking() {
    const { data, setData, post, processing, errors, reset, setError } = useForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        date: '',
        time: '',
        service: '',
        location: '',
    });

    const handleChange = (field: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(field, e.target.value);

        // Clear error for this field when user starts typing
        if (errors[field]) {
            setError(field, ''); // Use an empty string instead of null
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('booking'), {
            preserveScroll: true, // Prevents page jumping
            onError: () => {},    // Ensures form values persist
            onSuccess: () => reset(), // Optional: Resets form only on success
            // onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout fileName="Booking">
            <Head title="Booking" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="First Name" />
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
                        autoComplete="username"
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
                    <TextInput
                        id="date"
                        type="date"
                        name="date"
                        value={data.date}
                        className="mt-1 block w-full"
                        autoComplete="date"
                        onChange={handleChange('date')}
                        error={!!errors.date}
                    />
                    <InputError message={errors.date} className="mt-2" />
                </div>
                
                <div className="mt-4">
                    <InputLabel htmlFor="time" value="Time" />
                    <TextInput
                        id="time"
                        type="time"
                        name="time"
                        value={data.time}
                        className="mt-1 block w-full"
                        autoComplete="time"
                        onChange={handleChange('time')}
                        error={!!errors.time}
                    />
                    <InputError message={errors.time} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="service" value="Service" />
                    <TextInput
                        id="service"
                        type="text"
                        name="service"
                        value={data.service}
                        className="mt-1 block w-full"
                        autoComplete="service"
                        onChange={handleChange('service')}
                        error={!!errors.service}
                    />
                    <InputError message={errors.service} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="location" value="Location" />
                    <TextInput
                        id="location"
                        type="text"
                        name="location"
                        value={data.location}
                    />
                </div>

                {/* <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />
                    <PasswordInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={handleChange('password')}
                        error={!!errors.password}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                    <PasswordInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={handleChange('password_confirmation')}
                        error={!!errors.password_confirmation}
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div> */}

                <div className="mt-4 flex items-center justify-end">
                    {/* <Link
                        href={route('login')}
                        className="rounded-md text-sm text-yellow-500 underline hover:text-primary focus:outline-none"
                    >
                        Already registered?
                    </Link> */}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Book Now
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
