import React, { ChangeEvent, useRef } from 'react';
import { RiCameraSwitchFill } from 'react-icons/ri';
import { FaUpload } from 'react-icons/fa';
import Image from '../image';
import { FaTrashCan } from 'react-icons/fa6';
import { VideoPreview } from '../player/videoPreview';
import AudioPlayer from '../player/audio';

export interface UploaderProps extends React.ComponentProps<'div'> {
    setFile:  React.Dispatch<React.SetStateAction<File | undefined>>;
    setFileUrl: React.Dispatch<React.SetStateAction<string | null>>;
    mimetype?: FileTypes;
    fileUrl: string | null;
    handleUploadFile: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Uploader({ setFile, setFileUrl, fileUrl, mimetype, handleUploadFile, ...props }: UploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleClickFileUpload() {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    function removePostPhoto() {
        setFileUrl(null);
        setFile(undefined);
    }

    return (
        <div {...props}>
            <button onClick={handleClickFileUpload} className='hover:bg-blue-gray-50 rounded-md p-2 hover:opacity-70 animate-fade-down items-center justify-center flex'>
                <input
                    type='file'
                    accept={mimetype}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleUploadFile}
                />
                {!fileUrl && (
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <FaUpload className='w-[30px] h-[30px] fill-black' />
                    </div>
                )}
                {fileUrl ? 
                    <div>
                        {mimetype && mimetype == 'video/*' && (
                            <VideoPreview url={fileUrl} className='h-[180px] w-[180px] rounded-lg object-cover' />
                        )}
                        {mimetype && mimetype == 'audio/*' && (
                            <AudioPlayer url={fileUrl} className='h-[180px] w-[350px] rounded-lg object-cover' />
                        )}
                        {mimetype && mimetype == 'image/*' && (
                            <Image source={fileUrl} className='h-[180px] w-[180px] rounded-lg object-cover' />
                        )}
                        {!mimetype && (
                            <Image source={fileUrl} className='h-[180px] w-[180px] rounded-lg object-cover' />
                        )}
                    </div>
                    : 
                    <div className='h-[180px] w-[180px] rounded-lg object-cover' />
                }
                
            </button>
            {fileUrl && (
                <div className='flex flex-col gap-3'>
                    <button onClick={handleClickFileUpload}>
                        <RiCameraSwitchFill className='w-[25px] h-[25px] fill-black' />
                    </button>
                    <button className='self-center underline text-black' onClick={removePostPhoto}>
                        <FaTrashCan color="#FF3366" className='w-[22px] h-[22px]' />
                    </button>
                </div>
            )}

        </div>
    );
}