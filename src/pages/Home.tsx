// pages/Home.tsx
import { useCrypto } from '../context/CryptoContext';
import Loader from '../components/Loader';
import { CryptoCurrency } from '../services/marketService';

const Home = () => {
    const { cryptocurrencies, loading } = useCrypto();

    return (
        <div className="home-page">
            <h1>Обзор крипторынка</h1>
            {loading ? (
                <Loader />
            ) : (
                <div className="market-overview">
                    <h2>Топ-5 криптовалют</h2>
                    <div className="market-grid">
                        {cryptocurrencies.slice(0, 5).map((crypto: CryptoCurrency) => (
                            <div key={crypto.id} className="crypto-card">
                                <h3>{crypto.name}</h3>
                                <p>Цена: ${crypto.current_price.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home; // Важно!