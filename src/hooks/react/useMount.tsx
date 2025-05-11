// src/hooks/react/useMount.tsx
import { useEffect, useRef } from 'react';

const useDidMount = (callback: () => void | Promise<void>) => {
    const hasRun = useRef(false);

    useEffect(() => {
        if (!hasRun.current) {
            hasRun.current = true;
            callback();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};

export default useDidMount;