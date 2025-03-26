import { InertiaLinkProps, Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-yellow-500 text-white focus:border-yellow-500'
                    : 'border-transparent text-gray-200 hover:border-yellow-500 hover:text-white') +
                className
            }
        >
            {children}
        </Link>
    );
}
