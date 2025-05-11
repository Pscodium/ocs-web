import { useEffect, useState } from 'react';
import MDEditor, { ICommand } from '@uiw/react-md-editor';
import '@/styles/markdown-editor.css';
import '@/styles/markdown-preview.css';
import { FaBookOpen, FaEdit } from "react-icons/fa";

const codePreview: ICommand = {
    name: "removed",
    keyCommand: "removed",
    value: "removed",
};

export default function Markdown() {
    const [value, setValue] = useState<string | undefined>("# Welcome to Markdown Editor\n\nStart typing here...");
    const [viewHeight, setViewHeight] = useState(0);
    const [editMode, setEditMode] = useState(true);

    useEffect(() => {
        setViewHeight(window.innerHeight - 180);

        function handleResize() {
            setViewHeight(window.innerHeight - 180);
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className='w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
            <div className='w-full max-w-6xl px-4'>
                <div className='mb-8 text-center'>
                    <h1 className='text-4xl font-bold text-gray-800 mb-2'>Markdown Editor</h1>
                </div>

                <div className='bg-white rounded-lg shadow-xl overflow-hidden'>
                    <div className='border-b border-gray-200 p-4 flex justify-between items-center'>
                        <h2 className='text-lg font-semibold text-gray-700'>Editor</h2>
                        <button
                            onClick={() => setEditMode(!editMode)}
                            className='flex items-center gap-2 px-4 py-2 rounded-md bg-core-primary text-white hover:bg-core-secondary transition-colors'
                        >
                            {editMode ? <FaBookOpen /> : <FaEdit />}
                            {editMode ? "Preview" : "Edit"}
                        </button>
                    </div>

                    <div data-color-mode="light" className="flex items-center justify-center min-h-[600px]">
                        <MDEditor
                            visibleDragbar={false}
                            className='w-full min-h-[600px]'
                            value={value}
                            hideToolbar={editMode ? false : true}
                            height={viewHeight}
                            onChange={setValue}
                            preview={editMode ? "edit" : "preview"}
                            extraCommands={[codePreview]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}