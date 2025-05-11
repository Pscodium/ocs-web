import React, { useEffect } from 'react';
import MDEditor, { ICommand } from '@uiw/react-md-editor';
import '@/styles/markdown-editor.css';
import '@/styles/markdown-preview.css';
import { FaBookOpen } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { SEPARATORS, WithContext as ReactTags } from 'react-tag-input';
import { apiService } from '@/services/api';

const codePreview: ICommand = {
    name: 'removed',
    keyCommand: 'removed',
    value: 'removed',
};

interface PostCreatorProps {
    tags: ITagResponse;
    selectedTag: ITag | undefined;
    edit: boolean;
    article: IArticle | undefined;
    handleSubmitArticle: () => void;
}

export interface Tag {
    id: string;
    className: string;
    [key: string]: string;
}

export default function PostCreator({ tags, handleSubmitArticle, selectedTag, edit, article }: PostCreatorProps) {
    const [value, setValue] = React.useState<string | undefined>('');
    const [viewHeight, setViewHeight] = React.useState(0);
    const [title, setTitle] = React.useState('');
    const [tagList, setTagList] = React.useState<Array<Tag>>([]);
    const [editMode, setEditMode] = React.useState(true);
    const suggestions = tags.map((tag) => {
        return {
            id: tag.id,
            text: tag.title,
            className: '',
        };
    });

    useEffect(() => {
        if (selectedTag) {
            setTagList([
                {
                    text: selectedTag?.title,
                    id: selectedTag?.id,
                    className: '',
                },
            ]);
        }
    }, [selectedTag]);

    useEffect(() => {
        if (edit && article) {
            setValue(article.body);
            setTitle(article.title);

            if (article.Tags) {
                const newTagList = article.Tags?.map((tag) => {
                    return {
                        text: tag?.title,
                        id: tag?.id,
                        className: '',
                    };
                });
                setTagList(newTagList);
            }
        }
    }, [edit, article]);

    useEffect(() => {
        setViewHeight(window.innerHeight - 120);

        function handleResize() {
            setViewHeight(window.innerHeight - 120);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleDelete = (index: number) => {
        setTagList(tagList.filter((_, i) => i !== index));
    };

    const onTagUpdate = (index: number, newTag: Tag) => {
        const updatedTags = [...tagList];
        updatedTags.splice(index, 1, newTag);
        setTagList(updatedTags);
    };

    const handleAddition = (tag: Tag) => {
        setTagList((prevTags) => {
            return [...prevTags, tag];
        });
    };

    const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
        const newTags = tagList.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        setTagList(newTags);
    };

    const handleTagClick = (index: number) => {
        console.log('The tag at index ' + index + ' was clicked');
    };

    const onClearAll = () => {
        setTagList([]);
    };

    async function createArticle() {
        try {
            if (edit && article) {
                await apiService.updateArticle({
                    body: String(value),
                    tags: tagList.map((tag) => {
                        return { title: tag.text };
                    }),
                    title: title,
                    articleId: article.id,
                });

                handleSubmitArticle();
                return;
            }
            await apiService.createArticle({
                body: String(value),
                tags: tagList.map((tag) => {
                    return { title: tag.text };
                }),
                title: title,
            });

            handleSubmitArticle();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className='w-full h-full relative'>
            <div className='absolute left-10 top-[-62px] cursor-pointer' onClick={() => setEditMode(!editMode)}>
                {editMode ? <FaBookOpen /> : <FaEdit />}
            </div>
            {title && value && tagList.length > 0 && (
                <div className='absolute left-[75px] top-[-62px] cursor-pointer' onClick={createArticle}>
                    <IoSend />
                </div>
            )}
            <div className='absolute w-full h-10 left-0 top-[-40px] z-[999]'>
                <textarea
                    placeholder='Type the title here'
                    style={{ textAlign: editMode ? 'start' : 'center' }}
                    className='h-full w-full text-[28px] resize-none items-center justify-center overflow-hidden outline-none px-3'
                    value={title}
                    onChange={(ev) => setTitle(ev.currentTarget.value)}
                />
            </div>
            <div data-color-mode='light' className='flex h-full'>
                <MDEditor
                    visibleDragbar={false}
                    className='w-full h-full'
                    value={value}
                    hideToolbar={editMode ? false : true}
                    height={viewHeight / 1.3}
                    onChange={setValue}
                    preview={editMode ? 'edit' : 'preview'}
                    extraCommands={[codePreview]}
                />
            </div>
            <div className='p-2'>
                <ReactTags
                    classNames={{
                        tags: 'tagsClass',
                        tagInput: 'tagInputClass flex flex-col gap-1',
                        tagInputField: 'tagInputFieldClass outline-none w-[calc(100%)] p-1',
                        selected: 'selectedClass gap-1 flex py-2',
                        tag: 'tagClass p-1 bg-gray-300 rounded-md',
                        remove: 'removeClass p-1',
                        suggestions: 'suggestionsClass cursor-pointer border p-1 rounded-md',
                        activeSuggestion: 'activeSuggestionClass bg-gray-200',
                        editTagInput: 'editTagInputClass',
                        editTagInputField: 'editTagInputField',
                        clearAll: 'clearAllClass bg-gray-500 p-1 rounded-md text-white',
                    }}
                    tags={tagList}
                    suggestions={suggestions}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    handleTagClick={handleTagClick}
                    onTagUpdate={onTagUpdate}
                    separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
                    inputFieldPosition='bottom'
                    editable
                    clearAll
                    onClearAll={onClearAll}
                    maxTags={7}
                />
            </div>
        </div>
    );
}
