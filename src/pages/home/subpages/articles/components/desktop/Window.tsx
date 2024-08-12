import { cn } from '@/lib/utils';
import React from 'react';

export interface ArticleCardProps extends React.ComponentProps<'div'> {
    children: React.ReactNode;
}

export default function Window({ children, ...props }: ArticleCardProps) {
    return (
        <div className={cn('w-full h-full rounded-md shadow-lg overflow-hidden', props.className)}>
            {children}
        </div>
    );
}