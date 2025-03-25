import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Header1 } from '@/Components/Homepage/Header';
import Sparkles from '@/Components/Common/Sparkles';
import { Footer1 } from '@/Components/Homepage/Footer';
import { Button } from '@/Components/ui/Button';
export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout fileName='Login'>
            <Head title="Log in" />
            <div className="container mx-auto">
            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="Enter your email"
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="Enter your password"
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 flex justify-between">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData(
                                    'remember',
                                    (e.target.checked || false) as false,
                                )
                            }
                        />
                        <span className="ms-2 text-sm text-white">
                            Remember me
                        </span>
                    </label>
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-white underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        >
                            Forgot your password?
                        </Link>
                    )}
                </div>

                <div className="mt-4 flex items-center flex-col">
                    <Button className="gap-4 w-[75%] mx-auto bg-yellow-500 text-white font-semibold shadow-[0_0_10px_rgb(250,204,21)] hover:shadow-[0_0_20px_rgb(250,204,21)] transition-shadow duration-300" disabled={processing}>
                            Log in
                    </Button>
                    <div className='text-white flex gap-1 mt-2 text-sm'>
                        <p>Don't have an account?</p>
                        <Link href="/register" className='underline text-yellow-500 hover:text-primary'>
                            Register
                        </Link>
                    </div>
                    
                    {/* <PrimaryButton className="ms-4" >
                        Log in
                    </PrimaryButton> */}
                </div>
            </form>
            </div>
        </GuestLayout>
    
    );
}
