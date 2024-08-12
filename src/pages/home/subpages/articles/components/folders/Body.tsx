import React from 'react';

export interface ArticleCardProps extends React.ComponentProps<'div'> {
    children: React.ReactNode;
    className?: string;
}

export default function Body({ children, className, ...props }: ArticleCardProps) {
    return (
        <div {...props} className={className}>
            {children}
        </div>
    );
}