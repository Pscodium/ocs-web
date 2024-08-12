/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosInstance, AxiosResponse } from "axios";
import api from "./axios";
import { parse } from 'cookie';

type UserRoles = "admin" | "developer" | "owner" | "customer" | "default"

interface UserProps {
    id: number;
    nickname: string;
    external_id: string;
    role: UserRoles;
    firstName: string;
    lastName: string;
    email: string;
    verifiedEmail: boolean;
    profileIcon: string | null;
}

interface FormProps {
    nickname?: string;
    email?: string;
    password?: string;
}

interface LoginProps {
    email: string;
    password: string;
}

interface ArticleProps {
    title: string;
    body: string;
    tags: {
        title: string
    }[]
}

interface ArticleEditProps extends ArticleProps {
    articleId: string
}

class ApiService {
    public api: AxiosInstance;

    constructor() {
        this.api = api;

        this.api.interceptors.response.use(
            (response) => response,
            async (err) => {
                const originalRequest = err.config;
                if (err.response?.status != 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    return this.api(originalRequest);
                }
                return Promise.reject(err);
            }
        );
    }

    getHeaders(contentType?: string): Record<string, string> {
        const headers: Record<string, string> = {};

        headers.Authorization = `Bearer ${parse(document.cookie).token}`;

        if (contentType) {
            headers["Content-Type"] = contentType;
        }

        return headers;
    }

    async checkAuth(): Promise<UserProps> {
        const res = await this.api.get('/check/auth', {
            headers: this.getHeaders()
        });

        if (res.status != 200) {
            throw new Error("An errror was returned");
        }

        const response = res.data;

        return response;
    }

    async getUserData(): Promise<UserProps> {

        const res = await this.api.get('/data/user', {
            headers: this.getHeaders()
        });

        if (res.status != 200) {
            throw new Error("An errror was returned");
        }

        const response = res.data;

        return response;
    }

    async login({ email, password }: FormProps): Promise<AxiosResponse<UserProps, any>> {
        this.api.defaults.withCredentials = true;
        const res = await this.api.post('/login', {
            email,
            password
        }, {
            headers: this.getHeaders("application/json")
        });

        if (res.status != 200) {
            throw new Error('Unexpected error on get a user profile.');
        }

        return res;
    }

    async logout() {
        const res = await this.api.get('/logout', {
            headers: this.getHeaders(),
            withCredentials: true
        });

        if (res.status != 200) {
            throw new Error('Unexpected error on get logout');
        }

        return res.data.success;
    }

    async getTags(): Promise<ITagResponse> {
        const res = await this.api.get('/list-all/tags');

        if (res.status != 200) {
            throw new Error('Unexpected error on get logout');
        }

        return res.data;
    }

    async getArticlesByTagId(tagId: string): Promise<IArticleResponse> {
        const res = await this.api.get('/list/articles/' + tagId);

        if (res.status != 200) {
            throw new Error('Unexpected error on get logout');
        }

        return res.data;
    }

    async createArticle({ body, tags, title } : ArticleProps) {
        const res = await this.api.post('/article/create', {
            body,
            title,
            tags
        }, {
            headers: this.getHeaders(),
        })

        if (res.status != 200) {
            throw new Error('Unexpected error on get logout');
        }

        return res.data;
    }

    async updateArticle({ body, tags, title, articleId } : ArticleEditProps) {
        const res = await this.api.put(`/article/update/${articleId}`, {
            body,
            title,
            tags
        }, {
            headers: this.getHeaders(),
        })

        if (res.status != 200) {
            throw new Error('Unexpected error on get logout');
        }

        return res.data;
    }

    async deleteArticle(articleId: string | undefined) {
        const res = await this.api.delete(`/article/delete/${articleId}`, {
            headers: this.getHeaders()
        })

        if (res.status != 200) {
            throw new Error('Unexpected error on get logout');
        }

        return res.data;
    }

    async deleteFolder(folderId: string | undefined) {
        const res = await this.api.delete(`/tag/delete/${folderId}`, {
            headers: this.getHeaders()
        })

        if (res.status != 200) {
            throw new Error('Unexpected error on get logout');
        }

        return res.data;
    }
}

export const apiService = new ApiService();
export type { FormProps, UserProps, UserRoles, LoginProps };