import { apiService, LoginProps } from "@/services/api";
import { useMutation } from "react-query";

export default function useLogin() {
    const mutate = useMutation({
        mutationFn: ({ login, password }: LoginProps) => apiService.login({ login, password }),
    });

    return mutate;
}