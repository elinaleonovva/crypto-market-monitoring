import { useState, useEffect } from 'react';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchOptions {
    method?: HttpMethod;
    headers?: HeadersInit;
    body?: BodyInit;
}

export const useFetch = <T,>(
    url: string,
    initialValue: T,
    options?: FetchOptions
) => {
    const [data, setData] = useState<T>(initialValue);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, {
                    method: options?.method || 'GET',
                    headers: options?.headers,
                    body: options?.body,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const json = await response.json();
                setData(json);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, options?.method, options?.headers, options?.body]);

    return { data, loading, error };
};