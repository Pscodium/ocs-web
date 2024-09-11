import React, { ChangeEvent, useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Uploader from '../uploader';

export interface UploadDialogProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean;
    onClickSubmit: (file: File | undefined) => void;
    mimetype?: FileTypes | undefined;
}

export default function UploadDialog({ isOpen, setOpen, onClickSubmit, mimetype }: UploadDialogProps) {
    const [file, setFile] = useState<File | undefined>(undefined);
    const [fileUrl, setFileUrl] = useState<string | null>(null);

    function handleUploadFile(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setFile(file);
            const url = URL.createObjectURL(file);
            setFileUrl(url);
        }
    }

    useEffect(() => {
        setFile(undefined);
        setFileUrl(null);
    }, [isOpen])

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent className='bg-white outline-none border-none z-[9999]'>
                <DialogTitle className="text-[24px] text-black">Confirme Ação</DialogTitle>
                <DialogDescription className="text-[12px] text-black">
                    <div className='flex gap-1'>Envie um arquivo</div>
                </DialogDescription>
                <Uploader
                    className='flex pr-5 w-[250px] gap-3 items-center'
                    handleUploadFile={handleUploadFile}
                    fileUrl={fileUrl}
                    mimetype={mimetype}
                    setFile={setFile}
                    setFileUrl={setFileUrl}
                />
                <div className="flex gap-3">
                    <DialogTrigger>
                        <Button className="rounded-md bg-gray-500 text-white hover:bg-forum-navb font-bold">
                            CANCELAR
                        </Button>
                    </DialogTrigger>
                    <Button onClick={() => onClickSubmit(file)} className="rounded-md bg-green-400 text-white hover:bg-forum-navb font-bold">
                        ENVIAR
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}