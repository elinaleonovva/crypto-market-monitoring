import { useState, useEffect } from 'react';
import { convertCurrency } from '../services/converterService';

interface ConverterParams {
    from: string;
    to: string;
    amount: number;
}

export const useCurrencyConverter = (initialFrom = 'bitcoin', initialTo = 'ethereum') => {
    const [result, setResult] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [params, setParams] = useState<ConverterParams>({
        from: initialFrom,
        to: initialTo,
        amount: 1
    });

    const convert = async () => {
        setLoading(true);
        try {
            const rate = await convertCurrency(params.from, params.to, params.amount);
            setResult(rate);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Conversion failed');
            setResult(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        convert();
    }, [params.from, params.to, params.amount]);

    return {
        result,
        loading,
        error,
        setFrom: (from: string) => setParams(prev => ({ ...prev, from })),
        setTo: (to: string) => setParams(prev => ({ ...prev, to })),
        setAmount: (amount: number) => setParams(prev => ({ ...prev, amount })),
        params
    };
};