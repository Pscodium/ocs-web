/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { apiService, UserProps, LoginProps } from "@/services/api";
import { AxiosResponse } from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UseMutateFunction } from "react-query";

interface LoginPropsMutation extends LoginProps {
    mutate: UseMutateFunction<AxiosResponse<UserProps, UserProps>, unknown, LoginProps, unknown>
}

interface AuthContextProps {
    user: UserProps | null;
    Login: ({ email, password, mutate }: LoginPropsMutation) => void;
    Logout: () => void;
    CheckAuth: () => void;
    isLogged: boolean;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProps | null>(null);
    const [logged, setLogged] = useState(false);
    const [checkedAuth, setCheckedAuth] = useState(false);

    async function Login({ email, password, mutate }: LoginPropsMutation) {
        mutate({ email, password }, {
            onSuccess: ({ data }) => {
                if (data) {
                    setUser(data);
                    setLogged(true);
                }
            },
            onError: (err) => {
                setLogged(false);
                console.error(err);
            }
        });
    }

    async function Logout() {
        try {
            const logout = await apiService.logout();

            if (logout) {
                setLogged(false);
                return;
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    async function checkAuth() {
        try {
            const loggedUser = await apiService.checkAuth();

            if (loggedUser) {
                setUser(loggedUser);
                setLogged(true);
            } else {
                setLogged(false);
            }
        } catch (err) {
            setLogged(false);
        } finally {
            setCheckedAuth(true);
        }
    }

    useEffect(() => {
        if (!checkedAuth) {
            checkAuth();
        }
    }, [checkedAuth]);

    return (
        <AuthContext.Provider
            value={{
                user,
                Login,
                Logout,
                isLogged: logged,
                CheckAuth: checkAuth
            }}
        >
            <>{children}</>
        </AuthContext.Provider>
    );
}

const useAuth = () => {
    const context = useContext(AuthContext);
    return context;
};

export { AuthProvider, useAuth, AuthContext };