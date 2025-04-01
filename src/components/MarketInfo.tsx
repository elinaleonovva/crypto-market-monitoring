// components/MarketInfo.tsx
import { useEffect, useState } from 'react';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import { fetchMarketData } from '../services/marketService';
import '../styles/components/market-info.css';

interface CryptoData {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
}

const MarketInfo = () => {
    const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchMarketData();
                setCryptoData(data.slice(0, 20));
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
        <section className="market-section">
            <div className="market-grid">
                {cryptoData.map((crypto) => (
                    <div key={crypto.id} className="crypto-card">
                        <div className="crypto-header">
                            <span className="crypto-symbol">{crypto.symbol.toUpperCase()}</span>
                            <span className="crypto-name">{crypto.name}</span>
                        </div>
                        <div className="crypto-price">
                            ${crypto.current_price.toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MarketInfo;