import { useEffect, useState } from 'react';
import { Desktop } from './components/desktop';
import { Files } from './components/files';
import { apiService } from '@/services/api';
import { useAuth } from '@/contexts/auth';
import { FaPlus } from 'react-icons/fa6';
import UploadDialog from './components/dialog/upload';
import { toast } from '@/components/ui/use-toast';
import ContentDialog from './components/dialog/content';

export interface ImagesProps {}

export default function Images() {
    const { user }= useAuth();
    const [openUploadDialog, setOpenUploadDialog] = useState(false);
    const [openContentDialog, setOpenContentDialog] = useState(false);
    const [images, setImages] = useState<IImageReponse>([]);
    const [image, setImage] = useState<IImage>();

    useEffect(() => {
        getImages()
    }, [])

    async function getImages() {
        try {
            const data = await apiService.getImages();

            if (!data) return;

            setImages(data);
        } catch (err) {
            console.error(err);
        }
    }

    async function uploadImageSubmit(file: File | undefined) {
        try {
            if (!file) return;

            const image = await apiService.uploadImage(file);

            if (image) {
                toast({
                    variant: "destructive",
                    title: "SUCESSO",
                    description: "A imagem foi enviada com sucesso",
                    className: "outline-none border-none bg-green-600 text-white",
                });
    
                getImages();
                setOpenUploadDialog(false);
            }
            
        } catch (err) {
            toast({
                variant: "destructive",
                title: "ERRO",
                description: "Erro ao tentar enviar a imagem",
                className: "outline-none border-none bg-red-600 text-white",
            });

            console.error(err);
        }
    }

    async function deleteImage() {
        try {
            if (!image) return;

            await apiService.deleteImage(image.id);

            toast({
                variant: "destructive",
                title: "SUCESSO",
                description: "A imagem foi deletada com sucesso",
                className: "outline-none border-none bg-green-600 text-white",
            });
            setOpenContentDialog(false);
            getImages();
        } catch (err) {
            toast({
                variant: "destructive",
                title: "ERRO",
                description: "Erro ao tentar deletar a imagem",
                className: "outline-none border-none bg-red-600 text-white",
            });

            console.error(err);
        }
    }

    function openImageDialog(image: IImage) {
        setImage(image);
        setOpenContentDialog(true);
    }

    return (
        <div className='min-h-screen w-full items-center justify-center'>
            
            <Desktop.Root>
                <Desktop.Window>
                    <>
                        {user && user?.role === 'owner' && (
                            <div onClick={() => setOpenUploadDialog(true)} className="absolute inset-y-[25px] ml-1 cursor-pointer">
                                <FaPlus />
                            </div>
                        )}
                        <Desktop.WindowHeader>
                        Images
                        </Desktop.WindowHeader>
                    </>
                    <Desktop.WindowContent>
                        <Files.Root className="flex flex-wrap gap-3">
                            {images.map((image, index) => (
                                <Files.Body onClick={() => openImageDialog(image)} hover={image.name} key={index} className="p-5 hover:bg-blue-gray-50 w-32 rounded-md text-center relative cursor-pointer">
                                    <Files.Icon url={image.url} />
                                    <Files.Title>{image.name}</Files.Title>
                                </Files.Body>
                            ))}
                        </Files.Root>
                    </Desktop.WindowContent>
                </Desktop.Window>
            </Desktop.Root>
            <UploadDialog
                isOpen={openUploadDialog}
                setOpen={setOpenUploadDialog}
                onClickSubmit={uploadImageSubmit}
            />
            <ContentDialog 
                image={image}
                isOpen={openContentDialog}
                setOpen={setOpenContentDialog}
                deleteImage={deleteImage}
            />
        </div>
    );
}