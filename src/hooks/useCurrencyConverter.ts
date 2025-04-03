import { useState, useEffect } from 'react';

interface ConverterParams {
    from: string;
    to: string;
    amount: string;
}

// Статические курсы валют (примерные значения)
const EXCHANGE_RATES: { [key: string]: { [key: string]: number } } = {
    'bitcoin': {
        'ethereum': 16.5,
        'tether': 45000,
        'binancecoin': 3500,
        'usd-coin': 45000
    },
    'ethereum': {
        'bitcoin': 0.06,
        'tether': 2700,
        'binancecoin': 210,
        'usd-coin': 2700
    },
    'tether': {
        'bitcoin': 0.000022,
        'ethereum': 0.00037,
        'binancecoin': 0.077,
        'usd-coin': 1
    },
    'binancecoin': {
        'bitcoin': 0.00029,
        'ethereum': 0.0048,
        'tether': 13,
        'usd-coin': 13
    },
    'usd-coin': {
        'bitcoin': 0.000022,
        'ethereum': 0.00037,
        'tether': 1,
        'binancecoin': 0.077
    }
};

const CRYPTO_LIST = [
    { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin' },
    { id: 'ethereum', symbol: 'ETH', name: 'Ethereum' },
    { id: 'tether', symbol: 'USDT', name: 'Tether' },
    { id: 'binancecoin', symbol: 'BNB', name: 'BNB' },
    { id: 'usd-coin', symbol: 'USDC', name: 'USD Coin' }
];

export const useCurrencyConverter = () => {
    const [result, setResult] = useState<number | null>(null);
    const [params, setParams] = useState<ConverterParams>({
        from: 'bitcoin',
        to: 'ethereum',
        amount: ''
    });

    const convert = () => {
        if (!params.amount) {
            setResult(null);
            return;
        }

        const numericAmount = parseFloat(params.amount);
        const rate = EXCHANGE_RATES[params.from][params.to];
        setResult(numericAmount * rate);
    };

    useEffect(convert, [params]);

    const switchCurrencies = () => {
        setParams(prev => ({
            ...prev,
            from: prev.to,
            to: prev.from
        }));
    };

    return {
        result,
        currencies: CRYPTO_LIST,
        params,
        setFrom: (from: string) => setParams(prev => ({ ...prev, from })),
        setTo: (to: string) => setParams(prev => ({ ...prev, to })),
        setAmount: (amount: string) => setParams(prev => ({ ...prev, amount })),
        switchCurrencies
    };
};