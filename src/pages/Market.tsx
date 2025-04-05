import { useCrypto } from '../context/CryptoContext';
import MarketInfo from '../components/MarketInfo';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const Market = () => {
    const {loading, error } = useCrypto();

    return (
        <div className="market-page">
            <h1>Рыночные данные</h1>
            {error && <ErrorMessage message={error} />}
            {loading ? <Loader /> : <MarketInfo />}
        </div>
    );
};

export default Market;