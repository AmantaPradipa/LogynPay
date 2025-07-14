import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        return (
            <input
                type={type}
                className={`w-full bg-white/5 text-white placeholder-white/50 border border-white/20 rounded-lg py-3 pl-4 pr-4 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ${className}`}
                ref={ref}
                {...props}
            />
        );
    }
);
Input.displayName = 'Input';

export default Input;