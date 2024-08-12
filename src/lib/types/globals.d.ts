
interface IArticle {
    id: string;
    title: string;
    body: string;
    files?: object | null;
    createdAt: Date;
    updatedAt: Date;
}

interface ITag {
    id: string;
    title: string;
    count: number;
    views: number;
    hex: string;
    articlesCount: number;
    createdAt: Date;
    updatedAt: Date;
}

type ITagResponse = ITag[];
type IArticleResponse = IArticle[];

