import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export interface ArticleCardProps extends React.ComponentProps<'div'> {
    children: React.ReactNode;
    className?: string;
    hover?: string;
}

export default function Body({ hover, children, className, ...props }: ArticleCardProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div {...props} className={className}>
                        {children}
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{hover}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}