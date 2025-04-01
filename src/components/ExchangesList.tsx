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
        <table className="exchanges-table">
            <thead>
            <tr>
                <th>Рейтинг</th>
                <th>Название</th>
                <th>Объем торгов (24h BTC)</th>
            </tr>
            </thead>
            <tbody>
            {sortedExchanges.map((exchange) => (
                <tr key={exchange.id}>
                    <td>{exchange.trust_score_rank}</td>
                    <td>
                        <a
                            href={exchange.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="exchange-link"
                        >
                            <img
                                src={exchange.image}
                                alt={exchange.name}
                                className="exchange-logo"
                            />
                            {exchange.name}
                        </a>
                    </td>
                    <td>{exchange.trade_volume_24h_btc.toFixed(2)}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ExchangesList;