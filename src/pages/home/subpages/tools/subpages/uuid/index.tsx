import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { FaCopy } from "react-icons/fa6";

export interface UuidGeneratorProps { }

export default function UuidGenerator() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uuid, setUUID] = useState(uuidv4());
    const [successCopy, setSuccessCopy] = useState(false);

    const generateUUID = () => {
        const newUUID = uuidv4();
        setUUID(newUUID);
    };

    const copyToClipboard = () => {
        setSuccessCopy(true);
        navigator.clipboard.writeText(uuid);
        setTimeout(() => {
            setSuccessCopy(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen w-full items-center justify-center flex">
            <div className="p-10 max-w-[80%] rounded-md bg-core-light">
                <Label className="text-[30px]">UUID Generator</Label>
                <p>Discover the simplicity of generating UUIDs effortlessly with our tool. Craft unique identifiers seamlessly for your projects, ensuring data integrity and efficiency. Say goodbye to duplication headaches and embrace precision with our user-friendly UUID generator.</p>
                <div className="pt-6 flex flex-row gap-3">
                    <div className="relative w-full h-[45px]">
                        <input
                            ref={inputRef}
                            type='text'
                            value={uuid}
                            className="w-full px-3 font-normal text-[22px] h-full rounded-md border-1 border border-core-secondary focus:outline-none outline-none bg-core-light"
                            readOnly
                        />
                        <Button className="absolute inset-y-0 right-1 self-center bg-core-primary hover:bg-core-secondary" size='sm' onClick={copyToClipboard}>
                            {successCopy ?
                                <FaCheck />
                                :
                                <FaCopy />
                            }
                        </Button>
                    </div>
                    <Button className="bg-core-primary hover:bg-core-secondary" onClick={generateUUID}>Generate UUID</Button>
                </div>
            </div>
        </div>
    );
}