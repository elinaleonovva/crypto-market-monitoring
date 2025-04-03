import * as React from 'react';

interface CurrencyConverterProps {
    amount: string;
    from: string;
    to: string;
    result: number | null;
    currencies: Array<{ id: string; symbol: string; name: string }>;
    onAmountChange: (value: string) => void;
    onFromChange: (value: string) => void;
    onToChange: (value: string) => void;
    onSwitchCurrencies: () => void;
}

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({
                                                                 amount,
                                                                 from,
                                                                 to,
                                                                 result,
                                                                 currencies,
                                                                 onAmountChange,
                                                                 onFromChange,
                                                                 onToChange,
                                                                 onSwitchCurrencies,
                                                             }) => {
    const [isValid, setIsValid] = React.useState(true);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const isValidInput = /^(\d+)?([.]?\d{0,8})?$/.test(value);
        const hasMultipleDots = (value.match(/\./g) || []).length > 1;

        if ((isValidInput && !hasMultipleDots) || value === '') {
            onAmountChange(value);
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    };

    const formatDisplayValue = (value: string) => {
        if (value === '' || value === '.') return value;
        if (value.endsWith('.')) return value;

        const numberValue = parseFloat(value);
        return Number.isInteger(numberValue)
            ? numberValue.toString()
            : numberValue.toFixed(6).replace(/0+$/, '').replace(/\.$/, '');
    };

    return (
        <div className="converter-container">
            <div className="converter-inputs">
                <div className="input-group">
                    <label>Сумма:</label>
                    <input
                        type="text"
                        value={formatDisplayValue(amount)}
                        onChange={handleAmountChange}
                        placeholder="Введите сумму"
                        className={`amount-input ${!isValid ? 'invalid' : ''}`}
                    />
                    {!isValid && (
                        <div className="validation-error">
                            Введите цифры (допустимый разделитель — точка)
                        </div>
                    )}
                </div>

                <div className="currency-selectors">
                    <div className="selector-group">
                        <label>Из:</label>
                        <select
                            value={from}
                            onChange={(e) => onFromChange(e.target.value)}
                            className="currency-select"
                        >
                            {currencies.map(currency => (
                                <option
                                    key={currency.id}
                                    value={currency.id}
                                >
                                    {currency.name} ({currency.symbol})
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        className="switch-button"
                        onClick={onSwitchCurrencies}
                        type="button"
                    >
                        ↔
                    </button>

                    <div className="selector-group">
                        <label>В:</label>
                        <select
                            value={to}
                            onChange={(e) => onToChange(e.target.value)}
                            className="currency-select"
                        >
                            {currencies.map(currency => (
                                <option
                                    key={currency.id}
                                    value={currency.id}
                                >
                                    {currency.name} ({currency.symbol})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {result !== null && (
                <div className="conversion-result">
                    {parseFloat(amount).toLocaleString()} {currencies.find(c => c.id === from)?.symbol} = {' '}
                    {result.toLocaleString(undefined, {
                        maximumFractionDigits: 6,
                        minimumFractionDigits: 0
                    })} {currencies.find(c => c.id === to)?.symbol}
                </div>
            )}
        </div>
    );
};

export default CurrencyConverter;