import React, { ChangeEvent, useRef } from 'react';
import { RiCameraSwitchFill } from 'react-icons/ri';
import { FaUpload } from 'react-icons/fa';
import Image from './image';
import { FaTrashCan } from 'react-icons/fa6';

export interface UploaderProps extends React.ComponentProps<'div'> {
    setFile:  React.Dispatch<React.SetStateAction<File | undefined>>;
    setImageUrl: React.Dispatch<React.SetStateAction<string | null>>;
    imageUrl: string | null;
    handleUploadImage: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function Uploader({ setFile, setImageUrl, imageUrl, handleUploadImage, ...props }: UploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleClickImageUpload() {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    function removePostPhoto() {
        setImageUrl(null);
        setFile(undefined);
    }

    return (
        <div {...props}>
            <button onClick={handleClickImageUpload} className='hover:bg-blue-gray-50 rounded-md h-[180px] w-[180px] hover:opacity-70 animate-fade-down'>
                <input
                    type='file'
                    accept='image/*'
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleUploadImage}
                />
                {!imageUrl && (
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <FaUpload className='w-[30px] h-[30px] fill-black' />
                    </div>
                )}
                {imageUrl ? <Image source={imageUrl} className='h-[180px] w-[180px] rounded-lg object-cover bg-forum-seachbar' /> : <div className='h-[180px] w-[180px] rounded-lg object-cover bg-forum-seachbar' />}
                
            </button>
            {imageUrl && (
                <div className='flex flex-col gap-3'>
                    <button onClick={handleClickImageUpload}>
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