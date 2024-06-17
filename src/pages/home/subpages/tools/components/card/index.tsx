import { useState } from 'react';
import CardItem from './card-item';
import { SIDEBAR_ITEMS } from '@/pages/home/components/constants';
export interface CardProps { }

export default function Card() {
    const [cards] = useState(SIDEBAR_ITEMS.find(item => item.title === 'Tools')?.submenuItems);
    const [search, setSearch] = useState('');

    const filteredCards = search.length > 0
        ? cards?.filter(card => card.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || card.description.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        : cards;

    return (
        <div className="bg-white pt-12 pr-0  pl-0 mt-0 mr-auto mb-0 ml-auto sm:py-16 lg:py-20 w-full">
            <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-xl font-bold text-gray-900">Some Tools</p>
                            <p className="text-sm mt-1 mr-0 mb-0 ml-0 font-semi-bold text-gray-500">Access tools dynamically</p>
                        </div>
                        <div className="p-4">
                            <label htmlFor="table-search" className="sr-only">Search</label>
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd"></path>
                                    </svg>
                                </div>
                                <input value={search} onChange={(ev) => setSearch(ev.target.value)} type="text" id="table-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
                            </div>
                        </div>
                    </div>
                    <div className="shadow-xl mt-8 mr-0 mb-0 ml-0 flow-root rounded-lg">
                        <div className="">
                            {filteredCards?.length === 0 && (
                                <div className='w-full flex text-center items-center justify-center p-5'>
                                    <h1 className='text-[18px]'>Tool not found</h1>
                                </div>
                            )}
                            {filteredCards?.map((item, index) => (
                                <CardItem item={item} key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}