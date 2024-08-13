import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export interface DeleteDialogProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean;
    onClickSubmit: () => void;
    folder?: ITag | undefined;
}

export default function FolderDeleteDialog({ isOpen, setOpen, onClickSubmit, folder }: DeleteDialogProps) {

    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            onClickSubmit();
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent onKeyDown={handleKeyPress} className='bg-white outline-none border-none z-[9999]'>
                <DialogTitle className="text-[24px] text-black">Confirme Ação</DialogTitle>
                <DialogDescription className="text-[12px] text-black">
                    <div className='flex gap-1'>Você realmente deseja deletar a pasta <p className='font-bold'>'{folder?.title}'</p>?</div>
                </DialogDescription>
                <div className="flex gap-3">
                    <DialogTrigger>
                        <Button className="rounded-md bg-gray-500 text-white hover:bg-forum-navb font-bold">
                            CANCELAR
                        </Button>
                    </DialogTrigger>
                    <Button onClick={onClickSubmit} className="rounded-md bg-red-400 text-white hover:bg-forum-navb font-bold">
                        DELETAR
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}