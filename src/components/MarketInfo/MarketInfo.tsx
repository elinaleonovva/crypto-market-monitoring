// components/MarketInfo.tsx
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { fetchMarketData } from '../../services/marketService';
import './market-info.css';

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
        <section className="market-info">
            <div className="market-info__grid">
                {cryptoData.map((crypto) => (
                    <div key={crypto.id} className="market-info__card">
                        <div className="market-info__header">
                            <span className="market-info__symbol">{crypto.symbol.toUpperCase()}</span>
                            <span className="market-info__name">{crypto.name}</span>
                        </div>
                        <div className="market-info__price">
                            ${crypto.current_price.toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default MarketInfo;