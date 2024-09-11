export interface ArticleCardProps {
    url?: string;
}

export default function Icon({ url }: ArticleCardProps) {
    return (
        <div className='flex items-center justify-center'>
            <div className="h-12 w-12 flex items-center justify-center">
                <img src={url} />
            </div>
        </div>
    );
}