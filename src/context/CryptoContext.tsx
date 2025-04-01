import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { fetchMarketData } from '../services/marketService';
import { CryptoCurrency } from '../services/marketService';

type CryptoContextType = {
    cryptocurrencies: CryptoCurrency[];
    loading: boolean;
    error: string | null;
    refreshData: () => Promise<void>;
};

const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

export const CryptoProvider = ({ children }: { children: ReactNode }) => {
    const [cryptocurrencies, setCryptocurrencies] = useState<CryptoCurrency[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await fetchMarketData();
            setCryptocurrencies(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch cryptocurrency data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <CryptoContext.Provider value={{
            cryptocurrencies,
            loading,
            error,
            refreshData: fetchData
        }}>
            {children}
        </CryptoContext.Provider>
    );
};

export const useCrypto = () => {
    const context = useContext(CryptoContext);
    if (!context) {
        throw new Error('useCrypto must be used within a CryptoProvider');
    }
    return context;
};