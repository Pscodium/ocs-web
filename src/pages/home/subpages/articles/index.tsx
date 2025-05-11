/* eslint-disable react-hooks/exhaustive-deps */
import { apiService } from "@/services/api";
import { useCallback, useState } from "react";
import { Folders } from "./components/folders";
import { Desktop } from "./components/desktop";
import { FaArrowLeft, FaPen, FaPlus, FaTrashCan } from "react-icons/fa6";
import ArticlePost from "./components/post";
import PostCreator from "./components/editor";
import { useAuth } from "@/contexts/auth";
import { ThreeDots } from "react-loader-spinner";
import { Dialog } from "./components/dialog";
import useDidMount from "@/hooks/react/useMount";

export interface ArticlesProps {}

export type WindowSteps = "FOLDERS" | "FILES" | "ARTICLE" | "CREATE" | "EDIT";

export default function Articles() {
    const [tags, setTags] = useState<ITagResponse>([]);
    const [step, setStep] = useState<WindowSteps>("FOLDERS");
    const [articles, setArticles] = useState<IArticleResponse>([]);
    const [article, setArticle] = useState<IArticle>();
    const [folder, setFolder] = useState<ITag>();
    const [loading, setLoading] = useState(false);
    const [articleTitle, setArticleTitle] = useState('');
    const [folderTitle, setFolderTitle] = useState('');
    const [openFileDeleteDialog, setOpenFileDeleteDialog] = useState(false);
    const [openFolderDeleteDialog, setOpenFolderDeleteDialog] = useState(false);
    const { user } = useAuth();

    const getTags = useCallback(async () => {
        try {
            setLoading(true);
            const data = await apiService.getTags();

            if (!data) {
                return;
            }

            setTags(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }, [setTags, apiService]);

    useDidMount(getTags);

    const getArticles = useCallback(async (tagId: string) => {
        try {
            setLoading(true);
            const data = await apiService.getArticlesByTagId(tagId);

            setArticles(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    }, [setLoading, setArticles, apiService]);

    async function handleDeleteArticle(articleId: string | undefined) {
        try {
            await apiService.deleteArticle(articleId);

            setArticles((prevArticle) => prevArticle.filter(article => article.id !== articleId));
            setStep('FILES');
            getTags();
            setOpenFileDeleteDialog(false);
        } catch (e) {
            console.error(e);
        }
    }

    async function handleDeleteFolder(folderId: string | undefined) {
        try {
            await apiService.deleteFolder(folderId);

            setStep('FOLDERS');
            setFolder(undefined);
            getTags();
            setOpenFolderDeleteDialog(false);
        } catch (e) {
            console.error(e);
        }
    }

    const handleOpenFolder = useCallback(async (tag: ITag) => {
        setStep('FILES');
        setFolderTitle(tag.title);

        setFolder(tag);
        setArticles([]);
        getArticles(tag.id);
    }, [setStep, setFolderTitle, setFolder, setArticles, getArticles]);

    function returnToFolders() {
        setStep('FOLDERS');
        setFolder(undefined);
    }

    function returnToFiles() {
        setStep('FILES');
    }

    function handleOpenArticle(article: IArticle) {
        setStep('ARTICLE');
        setArticleTitle(article.title);

        setArticle(article);
    }

    function handleOpenPostCreator() {
        setStep('CREATE');
    }

    function handleSubmitArticle() {
        setStep('FOLDERS');
        setFolder(undefined);

        getTags();
    }

    function handleEditArticle() {
        setStep('EDIT');
    }

    return (
        <div className="flex w-full min-h-screen justify-center items-center">
            <Desktop.Root>
                <Desktop.Window>
                    {step === 'FOLDERS' && (
                        <>
                            {user && user?.role === 'owner' && (
                                <div onClick={handleOpenPostCreator} className="absolute inset-y-[25px] ml-1 cursor-pointer">
                                    <FaPlus />
                                </div>
                            )}
                            <Desktop.WindowHeader>Folders</Desktop.WindowHeader>
                        </>
                    )}
                    {step === 'FILES' && (
                        <>
                            <div onClick={returnToFolders} className="absolute inset-y-[25px] ml-2 cursor-pointer">
                                <FaArrowLeft />
                            </div>
                            {user && user?.role === 'owner' && (
                                <>
                                    <div onClick={handleOpenPostCreator} className="absolute inset-y-[25px] ml-10 cursor-pointer">
                                        <FaPlus />
                                    </div>
                                    <div onClick={() => setOpenFolderDeleteDialog(!openFolderDeleteDialog)} className="absolute inset-y-[25px] ml-[70px] cursor-pointer">
                                        <FaTrashCan color="#FF3366" />
                                    </div>
                                </>
                            )}
                            <Desktop.WindowHeader>{folderTitle}</Desktop.WindowHeader>
                        </>
                    )}
                    {step === 'ARTICLE' && (
                        <>
                            <div onClick={returnToFiles} className="absolute inset-y-[25px] ml-2 cursor-pointer">
                                <FaArrowLeft />
                            </div>
                            {user && user?.role === 'owner' && (
                                <>
                                    <div onClick={handleOpenPostCreator} className="absolute inset-y-[25px] ml-10 cursor-pointer">
                                        <FaPlus />
                                    </div>
                                    <div onClick={() => setOpenFileDeleteDialog(!openFileDeleteDialog)} className="absolute inset-y-[25px] ml-[70px] cursor-pointer">
                                        <FaTrashCan color="#FF3366" />
                                    </div>
                                    <div onClick={handleEditArticle} className="absolute inset-y-[25px] ml-[100px] cursor-pointer">
                                        <FaPen />
                                    </div>
                                </>
                            )}
                            <Desktop.WindowHeader>{articleTitle}</Desktop.WindowHeader>
                        </>
                    )}
                    {step === 'CREATE' && (
                        <>
                            <div onClick={returnToFolders} className="absolute inset-y-[25px] ml-2 cursor-pointer">
                                <FaArrowLeft />
                            </div>
                            <Desktop.WindowHeader>Create</Desktop.WindowHeader>
                        </>
                    )}
                    {step === 'EDIT' && (
                        <>
                            <div onClick={returnToFolders} className="absolute inset-y-[25px] ml-2 cursor-pointer">
                                <FaArrowLeft />
                            </div>
                            <Desktop.WindowHeader>Edit</Desktop.WindowHeader>
                        </>
                    )}

                    {step === 'ARTICLE' ? (
                        <>
                            {article && (
                                <ArticlePost article={article} />
                            )}
                        </>
                    ) : (
                        <Desktop.WindowContent>
                            {step === 'FOLDERS' && (
                                <>
                                    {loading && (
                                        <div className="w-full h-10 flex items-center justify-center">
                                            <ThreeDots
                                                height="80"
                                                width="80"
                                                radius="9"
                                                color="#000"
                                                ariaLabel="three-dots-loading"
                                                wrapperStyle={{}}
                                                visible={true}
                                            />
                                        </div>
                                    )}
                                    {tags && !loading && (
                                        <Folders.Root className="flex flex-wrap gap-3">
                                            {tags.map((tag, index) => (
                                                <Folders.Body hover={tag.title} key={index} onClick={() => handleOpenFolder(tag)} className="p-5 hover:bg-blue-gray-50 w-32 rounded-md text-center relative cursor-pointer">
                                                    <Folders.Icon hex={tag.hex} />
                                                    <Folders.Badge>{tag.articlesCount}</Folders.Badge>
                                                    <Folders.Title>{tag.title}</Folders.Title>
                                                </Folders.Body>
                                            ))}
                                        </Folders.Root>
                                    )}
                                    {tags.length < 0 && (
                                        <div className="self-center">Articles not found</div>
                                    )}
                                </>
                            )}
                            {step === 'FILES' && (
                                <>
                                    {loading && (
                                        <div className="w-full h-10 flex items-center justify-center">
                                            <ThreeDots
                                                height="80"
                                                width="80"
                                                radius="9"
                                                color="#000"
                                                ariaLabel="three-dots-loading"
                                                wrapperStyle={{}}
                                                visible={true}
                                            />
                                        </div>
                                    )}
                                    {articles && !loading && (
                                        <Folders.Root className="flex flex-wrap gap-3">
                                            {articles.map((article, index) => (
                                                <Folders.Body hover={article.title} key={index} onClick={() => handleOpenArticle(article)} className="p-5 hover:bg-blue-gray-50 w-28 rounded-md text-center relative cursor-pointer">
                                                    <Folders.Files />
                                                    <Folders.Title>{article.title}</Folders.Title>
                                                </Folders.Body>
                                            ))}
                                        </Folders.Root>
                                    )}
                                </>
                            )}
                        </Desktop.WindowContent>
                    )}
                    {step === 'CREATE' && (
                        <>
                            <div>
                                <PostCreator edit={false} article={undefined} selectedTag={folder} tags={tags} handleSubmitArticle={handleSubmitArticle} />
                            </div>
                        </>
                    )}
                    {step === 'EDIT' && (
                        <>
                            <div>
                                <PostCreator edit={true} article={article} selectedTag={undefined} tags={tags} handleSubmitArticle={handleSubmitArticle} />
                            </div>
                        </>
                    )}
                </Desktop.Window>
            </Desktop.Root>
            <Dialog.FileDelete isOpen={openFileDeleteDialog} setOpen={setOpenFileDeleteDialog} onClickSubmit={() => handleDeleteArticle(article?.id)} article={article} />
            <Dialog.FolderDelete isOpen={openFolderDeleteDialog} setOpen={setOpenFolderDeleteDialog} onClickSubmit={() => handleDeleteFolder(folder?.id)} folder={folder} />
        </div>
    );
}