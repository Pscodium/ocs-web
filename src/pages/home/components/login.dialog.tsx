/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import FloatingLabelInput from '@/components/ui/floating-label';
import { LoginInputProps } from '..';

interface LoginDialogProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean;
    inputs: LoginInputProps;
    setInputs: React.Dispatch<React.SetStateAction<LoginInputProps>>;
    submitLogin: (email: string, password: string) => Promise<boolean>;
}

export default function LoginDialog({ open, setOpen, inputs, setInputs, submitLogin }: LoginDialogProps) {
    const [cantCompleteLogin, setCantCompleteLogin] = useState(false);
    const [completedEmail, setCompletedEmail] = useState(true);
    const [completedPassword, setCompletedPassword] = useState(true);

    function handleKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            onClickSubmit();
        }
    }

    async function onClickSubmit() {
        if (!inputs.email) {
            setCompletedEmail(false);
            return;
        }
        if (!inputs.password) {
            setCompletedPassword(false);
            return;
        }
        if (!inputs.email && !inputs.password) {
            setCantCompleteLogin(true);
            return;
        }

        const logged = await submitLogin(inputs.email, inputs.password);

        if (logged) {
            setOpen(!open);
            return;
        } else {
            setCantCompleteLogin(false);
            return;
        }
    }

    useEffect(() => {
        if (inputs.email) {
            setCompletedEmail(true);
        }
        if (inputs.password) {
            setCompletedPassword(true);
        }
        if (inputs.email && inputs.password) {
            setCantCompleteLogin(false);
        }
    }, [inputs]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent onKeyDown={handleKeyPress} className='bg-slate-50 outline-none border-none'>
                <DialogTitle className="text-[24px] text-black">Login</DialogTitle>
                <DialogDescription className="text-[12px] text-black">
                    Realize seu login
                </DialogDescription>
                <div className='flex flex-col gap-4'>
                    <FloatingLabelInput onKeyDown={handleKeyPress} invalid={!completedEmail || cantCompleteLogin} text={inputs.email} onChange={(ev) => setInputs({ ...inputs, email: ev.target.value })} label='E-mail' className='!bg-slate-50' />
                    <FloatingLabelInput onKeyDown={handleKeyPress} invalid={!completedPassword || cantCompleteLogin} text={inputs.password} onChange={(ev) => setInputs({ ...inputs, password: ev.target.value })} label='Password' type='password' security='*' className='!bg-slate-50' />
                </div>
                <div className="flex gap-3">
                    <DialogTrigger>
                        <Button className="rounded-md bg-core-primary text-white hover:bg-forum-navb">
                            Cancel
                        </Button>
                    </DialogTrigger>
                    <Button onClick={onClickSubmit} className="rounded-md bg-core-secondary text-white hover:bg-forum-navb">
                        Login
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}