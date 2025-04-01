import { useEffect, useState } from 'react';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import { fetchMarketData } from '../services/marketService';
import '../styles';

interface CryptoData {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_24h: number;
}

const MarketInfo = () => {
    const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchMarketData();
                setCryptoData(data);
            } catch (err) {
                setError('Ошибка загрузки данных о рынке');
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="market-grid">
            {cryptoData.map((crypto) => (
                <div key={crypto.id} className="crypto-card">
                    <h3>{crypto.name} ({crypto.symbol.toUpperCase()})</h3>
                    <p>${crypto.current_price.toLocaleString()}</p>
                    <p className={crypto.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
                        {crypto.price_change_percentage_24h.toFixed(2)}%
                    </p>
                </div>
            ))}
        </div>
    );
};

export default MarketInfo;