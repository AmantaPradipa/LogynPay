import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'default', children, ...props }, ref) => {
        const baseClasses = "font-bold py-3 px-6 rounded-lg shadow-lg transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
        
        const variantClasses = {
            default: "w-full bg-gradient-to-r from-green-500 to-teal-500 text-white hover:shadow-green-500/50",
            outline: "bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 hover:shadow-white/20"
        };
        
        return (
            <button
                className={`${baseClasses} ${variantClasses[variant]} ${className}`}
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