import { useEffect, useState } from 'react';

function useDebounce(value, delay = 600) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        // cleanup function
        return () => {
            clearTimeout(timeOutId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debounceValue;
}

export default useDebounce;
