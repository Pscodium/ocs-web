import { apiService } from '@/services/api';
import { useQuery } from 'react-query';

export function useUserData() {
    const query = useQuery({
        queryFn: apiService.getUserData,
        queryKey: ['userdata'],
    });

    return query;
}
