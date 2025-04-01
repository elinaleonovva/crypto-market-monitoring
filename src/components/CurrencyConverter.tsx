import * as React from 'react';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import '../styles';

interface CurrencyConverterProps {
    amount: string;
    from: string;
    to: string;
    result: number | null;
    onAmountChange: (value: string) => void;
    onFromChange: (value: string) => void;
    onToChange: (value: string) => void;
    loading?: boolean;
    error?: string | null;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
                                                                 amount,
                                                                 from,
                                                                 to,
                                                                 result,
                                                                 onAmountChange,
                                                                 onFromChange,
                                                                 onToChange,
                                                                 loading = false,
                                                                 error = null
                                                             }) => {
    return (
        <div className="converter-container">
            <div className="converter-inputs">
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => onAmountChange(e.target.value)}
                    min="0"
                />
                <select value={from} onChange={(e) => onFromChange(e.target.value)}>
                    <option value="bitcoin">Bitcoin (BTC)</option>
                    <option value="ethereum">Ethereum (ETH)</option>
                    <option value="tether">Tether (USDT)</option>
                </select>
                <span>→</span>
                <select value={to} onChange={(e) => onToChange(e.target.value)}>
                    <option value="ethereum">Ethereum (ETH)</option>
                    <option value="bitcoin">Bitcoin (BTC)</option>
                    <option value="tether">Tether (USDT)</option>
                </select>
            </div>

            {loading && <Loader />}
            {error && <ErrorMessage message={error} />}
            {result !== null && !loading && (
                <div className="conversion-result">
                    {amount} {from.toUpperCase()} = {result.toFixed(6)} {to.toUpperCase()}
                </div>
            )}
        </div>
    );
};

export default CurrencyConverter;