
interface IArticle {
    id: string;
    title: string;
    body: string;
    files?: object | null;
    createdAt: Date;
    updatedAt: Date;
    Tags?: ITagResponse
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

interface IImage {
    id: string;
    name: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
}

type IImageReponse = IImage[];
type ITagResponse = ITag[];
type IArticleResponse = IArticle[];

