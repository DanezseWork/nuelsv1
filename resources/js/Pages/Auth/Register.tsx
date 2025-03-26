import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PasswordInput from '@/Components/PasswordInput';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset, setError } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
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

        post(route('register'), {
            preserveScroll: true, // Prevents page jumping
            onError: () => {},    // Ensures form values persist
            onSuccess: () => reset(), // Optional: Resets form only on success
            // onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout fileName="Register">
            <Head title="Register" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={handleChange('name')}
                        error={!!errors.name}
                    />
                    <InputError message={errors.name} className="mt-2" />
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
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-yellow-500 underline hover:text-primary focus:outline-none"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
