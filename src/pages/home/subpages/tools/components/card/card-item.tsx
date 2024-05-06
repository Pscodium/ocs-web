/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/components/ui/badge';
import React, { ReactElement } from 'react';
import { FaChevronRight } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

interface CardItem {
    title: string;
    description: string;
    icon: ReactElement<any, any>;
    new?: boolean;
    beta?: boolean;
    soon?: boolean;
    path: string;
}

export interface CardItemProps {
    item: CardItem
}

export default function CardItem({ item }: CardItemProps) {
    return (
        <div>
            <NavLink to={item.path} className="sm:flex sm:items-center sm:justify-between sm:space-x-5 hover:bg-gray-100 py-5 px-10">
                <div className="flex items-center flex-1 min-w-0">
                    {React.cloneElement(item.icon, { className: "flex-shrink-0 object-cover rounded-full btn- w-10 h-10" })}
                    <div className="mt-0 mr-0 mb-0 ml-4 flex-1 min-w-0">
                        <p className="text-lg font-bold text-gray-800 truncate">{item.title}</p>
                        <p className="text-gray-600 text-md">{item.description}</p>
                    </div>
                    {item.beta && (
                        <div>
                            <Badge className='bg-core-secondary py-1 hover:bg-core-secondary' variant='default'>BETA</Badge>
                        </div>
                    )}
                    {item.new && (
                        <div>
                            <Badge className='bg-core-secondary py-1 hover:bg-core-secondary' variant='default'>NEW</Badge>
                        </div>
                    )}
                    {item.soon && (
                        <div>
                            <Badge className='bg-core-secondary py-1 hover:bg-core-secondary' variant='default'>SOON</Badge>
                        </div>
                    )}

                </div>
                <div className="mt-4 mr-0 mb-0 ml-0 pt-0 pr-0 pb-0 pl-14 flex items-center sm:space-x-6 sm:pl-0 sm:mt-0 rounded">
                    <FaChevronRight className='fill-gray-500' />
                </div>
            </NavLink>
        </div>
    );
}