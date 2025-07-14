import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <button
                className={`w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-green-500/50 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${className}`}
                ref={ref}
                {...props}
            >
                {children}
            </button>
        );
    }
);
Button.displayName = 'Button';

export default Button;