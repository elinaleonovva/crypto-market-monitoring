import { useEffect, useState } from 'react';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import { fetchExchanges } from '../services/exchangesService';
import '../styles';

interface Exchange {
    id: string;
    name: string;
    trust_score_rank: number;
    trade_volume_24h_btc: number;
    url: string;
    image: string;
}

interface ExchangesListProps {
    sortBy: 'volume' | 'rating';
}

const ExchangesList = ({ sortBy }: ExchangesListProps) => {
    const [exchanges, setExchanges] = useState<Exchange[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadExchanges = async () => {
            try {
                const data = await fetchExchanges();
                setExchanges(data.slice(0, 20));
                setError(null);
            } catch (err) {
                setError('Ошибка загрузки списка бирж');
            } finally {
                setLoading(false);
            }
        };
        loadExchanges();
    }, []);

    const sortedExchanges = [...exchanges].sort((a, b) => {
        if (sortBy === 'volume') {
            return b.trade_volume_24h_btc - a.trade_volume_24h_btc;
        }
        return a.trust_score_rank - b.trust_score_rank;
    });

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="exchanges-container">
            <div className="table-header">
                <div className="header-cell">Рейтинг</div>
                <div className="header-cell">Название</div>
                <div className="header-cell">Объем торгов (24h BTC)</div>
            </div>

            <div className="exchanges-list">
                {sortedExchanges.map((exchange) => (
                    <a
                        key={exchange.id}
                        href={exchange.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="exchange-item"
                    >
                        <div className="exchange-rank">{exchange.trust_score_rank}</div>
                        <div className="exchange-info">
                            <img
                                src={exchange.image}
                                alt={exchange.name}
                                className="exchange-logo"
                            />
                            <span className="exchange-name">{exchange.name}</span>
                        </div>
                        <div className="exchange-volume">
                            {exchange.trade_volume_24h_btc.toFixed(2)}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default ExchangesList;