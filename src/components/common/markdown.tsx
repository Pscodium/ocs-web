import React, { useEffect } from 'react';
import MDEditor, { ICommand } from '@uiw/react-md-editor';
import '@/styles/markdown-editor.css';
import '@/styles/markdown-preview.css';
import { Button } from '@/components/ui/button';

const codePreview: ICommand = {
    name: "removed",
    keyCommand: "removed",
    value: "removed",
};


export default function Markdown() {
    const [value, setValue] = React.useState<string | undefined>("***Hello World***");
    const [viewHeight, setViewHeight] = React.useState(0);
    const [text, setText] = React.useState('');
    const [editMode, setEditMode] = React.useState(false);

    useEffect(() => {
        setViewHeight(window.innerHeight - 120);

        getReadme();

        function handleResize() {
            setViewHeight(window.innerHeight - 120);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        setValue(text);
    }, [text]);

    async function getReadme() {
        fetch(`https://raw.githubusercontent.com/Pscodium/portfolio/master/src/assets/README.md`)
            .then(response => response.text())
            .then(result => setText(result))
            .catch(error => console.log(error));
    }

    return (
        <div className='w-full'>
            <Button
                className='absolute top-[7px] right-[25px] z-[9999] h-[30px] p-2 bg-core-secondary'
                onClick={() => setEditMode(!editMode)}
            >{editMode ? "Preview" : "Edit"}
            </Button>
            <div data-color-mode="light" className="flex items-center align-middle justify-center min-h-screen" style={{ height: viewHeight }}>
                <MDEditor
                    visibleDragbar={false}
                    className='w-full min-h-screen'
                    value={value}
                    hideToolbar={editMode ? false : true}
                    height={viewHeight / 1}
                    onChange={setValue}
                    preview={editMode ? "edit" : "preview"}
                    extraCommands={[codePreview]}
                />
            </div>
        </div>
    );
}