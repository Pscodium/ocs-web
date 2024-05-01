import { apiService } from '@/services/api';
import { useQuery } from 'react-query';

export function useCheckAuth() {
    const query = useQuery({
        queryFn: apiService.checkAuth,
        queryKey: ['check-auth'],
    });

    return query;
}
