import { Button } from '@/Components/ui/Button';
import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <Button
            {...props}
            className={
                `bg-yellow-500 text-white font-semibold shadow-[0_0_10px_rgb(250,204,21)] hover:shadow-[0_0_20px_rgb(250,204,21)] transition-shadow duration-300 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </Button>
    );
}
