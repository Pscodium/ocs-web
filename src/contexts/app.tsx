import React from 'react';
import { AuthProvider } from "./auth";
import { LoginDialogProvider } from './login.dialog';

export function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <LoginDialogProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </LoginDialogProvider>
    );
}