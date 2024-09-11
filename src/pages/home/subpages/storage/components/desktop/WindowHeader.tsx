export default function WindowHeader({ children }: { children: string }) {
    return (
        <div className='bg-gray-200 w-full h-7 flex items-center justify-center'>
            <div className='absolute right-8 inset-y-[25px] flex flex-row gap-2'>
                <div className='h-4 w-4 rounded-full bg-[#FF6259]' />
                <div className='h-4 w-4 rounded-full bg-[#FFC331]' />
                <div className='h-4 w-4 rounded-full bg-[#24CB3C]' />
            </div>
            <div>{children}</div>
        </div>
    );
}