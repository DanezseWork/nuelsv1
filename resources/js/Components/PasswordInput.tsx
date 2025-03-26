import {
    forwardRef,
    InputHTMLAttributes,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { Eye, EyeOff } from 'lucide-react';

export default forwardRef(function PasswordInput(
    {
        className = '',
        isFocused = false,
        error = false,
        ...props
    }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean; error?: boolean },
    ref,
) {
    const localRef = useRef<HTMLInputElement>(null);
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
        <div className="relative w-full">
            <input
                {...props}
                type={visible ? 'text' : 'password'}
                className={
                    `rounded-md shadow-sm focus:ring-primary pr-10 ` +
                    (error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary') +
                    ` ` +
                    className
                }
                ref={localRef}
            />
            <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setVisible(!visible)}
            >
                {visible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
    );
});
