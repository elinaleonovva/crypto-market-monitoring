import { useState } from 'react';
import ExchangesList from '../components/ExchangesList';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const Exchanges = () => {
    const [sortBy, setSortBy] = useState<'volume' | 'rating'>('volume');

    return (
        <div className="exchanges-page">
            <h1>Криптобиржи</h1>
            <div className="filters">
                <button
                    onClick={() => setSortBy('volume')}
                    className={sortBy === 'volume' ? 'active' : ''}
                >
                    По объему
                </button>
                <button
                    onClick={() => setSortBy('rating')}
                    className={sortBy === 'rating' ? 'active' : ''}
                >
                    По рейтингу
                </button>
            </div>
            <ExchangesList sortBy={sortBy} />
        </div>
    );
};

export default Exchanges;