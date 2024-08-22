import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog';
import { FaSquareCheck, FaCheck, FaCopy, FaTrashCan } from 'react-icons/fa6';
import { useAuth } from '@/contexts/auth';


export interface ContentDialogProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    isOpen: boolean;
    image: IImage | undefined;
    deleteImage: () => void;
}

export default function ContentDialog({ isOpen, setOpen, image, deleteImage }: ContentDialogProps) {
    const [successCopy, setSuccessCopy] = useState(false);
    const { user } = useAuth();
    const [confirming, setConfirming] = useState(false);
    const [timer, setTimer] = useState<null | number>(null);

    useEffect(() => {
        if (confirming && timer) {
        const countdown = setTimeout(() => {
            setConfirming(false);
            clearTimeout(timer);
            setTimer(null);
        }, 3000);

        return () => clearTimeout(countdown);
        }
    }, [confirming, timer]);

    const handleDeleteClick = () => {
        if (confirming) {
            deleteImage();
            setConfirming(false);
            clearTimeout(timer? timer : undefined);
            setTimer(null);
        } else {
            setConfirming(true);
            setTimer(Date.now());
        }
    };

    function copyToClipboard() {
        if (!image?.url) return;
        navigator.clipboard.writeText(image.url);
        setSuccessCopy(true);


        setTimeout(() => {
            setSuccessCopy(false);
        }, 1000);
    }

    
    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogContent className='bg-white outline-none border-none z-[9999] flex flex-col overflow-y-auto max-h-screen'>
                <DialogTitle className="text-[24px] text-black">Image</DialogTitle>
                <DialogDescription>{image?.name}</DialogDescription>
                <div className='flex w-full' >
                    <img src={image?.url} className='w-full' />
                </div>
                <div className='w-full flex justify-between'>
                    <div onClick={copyToClipboard} className='cursor-pointer'>
                        {successCopy ? <FaCheck className='fill-gray-500' /> : <FaCopy className='fill-gray-500' />}
                    </div>

                    {user?.role == 'owner' && (
                        <button className='self-center' onClick={handleDeleteClick}>
                            {confirming? 
                                <FaSquareCheck color="#ffcc00" className='h-4 w-4' />
                                :
                                <FaTrashCan color="#FF3366" className='h-4 w-4' />
                            }
                        </button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}