export interface TitleProps {
    children: string;
}

export default function Title({ children }: TitleProps) {
    return (
        <div className="flex text-center justify-center">
            <p className="select-none font-semibold justify-center">
                { children }
            </p>
        </div>
    );
}