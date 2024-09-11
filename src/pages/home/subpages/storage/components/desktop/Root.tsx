import React from 'react';

export interface ArticleCardProps {
    children: React.ReactNode;
}

export default function Root({ children }: ArticleCardProps) {
    return (
        <div className='w-full p-5 min-h-screen flex'>
            {children}
        </div>
    );
}