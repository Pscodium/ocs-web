export interface TitleProps {
    children: string;
}

export default function Title({ children }: TitleProps) {
    return (
        <div className='select-none font-semibold'>{ children }</div>
    );
}