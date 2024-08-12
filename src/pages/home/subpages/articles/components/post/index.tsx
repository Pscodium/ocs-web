import React, { useEffect } from 'react';
import MDEditor, { ICommand } from '@uiw/react-md-editor';
import '@/styles/markdown-editor.css';
import '@/styles/markdown-preview.css';

const codePreview: ICommand = {
    name: "removed",
    keyCommand: "removed",
    value: "removed",
};

interface PostProps {
    article: IArticle;
}


export default function ArticlePost({ article }: PostProps) {
    const [viewHeight, setViewHeight] = React.useState(0);

    useEffect(() => {
        setViewHeight(window.innerHeight - 120);

        function handleResize() {
            setViewHeight(window.innerHeight - 120);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <div data-color-mode="light" className="flex h-full" style={{ height: viewHeight }}>
                <MDEditor
                    visibleDragbar={false}
                    className='w-full h-[100%]'
                    value={article.body}
                    hideToolbar={true}
                    height={`100%`}
                    preview={"preview"}
                    extraCommands={[codePreview]}
                />
            </div>
        </div>
    );
}