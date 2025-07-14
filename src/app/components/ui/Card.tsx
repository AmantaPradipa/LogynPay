import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> { }

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg ${className}`}
                ref={ref}
                {...props}
            >
                {children}
            </div>
        );
    }
);
Card.displayName = 'Card';

export default Card;