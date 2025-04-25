import * as React from 'react';
import './currency-converter.css';

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

    const handleAmountChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const isValidInput = /^(\d+)?([.]?\d{0,8})?$/.test(value);
        const hasMultipleDots = (value.match(/\./g) || []).length > 1;

        if ((isValidInput && !hasMultipleDots) || value === '') {
            onAmountChange(value);
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [onAmountChange]);

    const formattedAmount = React.useMemo(() => {
        if (amount === '' || amount === '.') return amount;
        if (amount.endsWith('.')) return amount;

        const numberValue = parseFloat(amount);
        return Number.isInteger(numberValue)
            ? numberValue.toString()
            : numberValue.toFixed(6).replace(/0+$/, '').replace(/\.$/, '');
    }, [amount]);

    const CurrencyOption = React.memo(({ currency }: { currency: typeof currencies[0] }) => (
        <option value={currency.id}>
            {currency.name} ({currency.symbol})
        </option>
    ));

    return (
        <div className="converter">
            <div className="converter__inputs">
                <div className="converter__input-group">
                    <label className="converter__label">Сумма:</label>
                    <input
                        type="text"
                        value={formattedAmount}
                        onChange={handleAmountChange}
                        placeholder="Введите сумму"
                        className={`converter__amount-input ${!isValid ? 'converter__amount-input--invalid' : ''}`}
                    />
                    {!isValid && (
                        <div className="converter__validation-error">
                            Введите цифры (допустимый разделитель — точка)
                        </div>
                    )}
                </div>

                <div className="converter__selectors">
                    <div className="converter__selector">
                        <label className="converter__label">Из:</label>
                        <select
                            value={from}
                            onChange={(e) => onFromChange(e.target.value)}
                            className="converter__select"
                        >
                            {currencies.map(currency => (
                                <CurrencyOption key={currency.id} currency={currency} />
                            ))}
                        </select>
                    </div>

                    <button
                        className="converter__switch-button"
                        onClick={onSwitchCurrencies}
                        type="button"
                    >
                        ↔
                    </button>

                    <div className="converter__selector">
                        <label className="converter__label">В:</label>
                        <select
                            value={to}
                            onChange={(e) => onToChange(e.target.value)}
                            className="converter__select"
                        >
                            {currencies.map(currency => (
                                <CurrencyOption key={currency.id} currency={currency} />
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {result !== null && (
                <div className="converter__result">
                    {parseFloat(amount).toLocaleString()} {currencies.find(c => c.id === from)?.symbol} ={' '}
                    {result.toLocaleString(undefined, {
                        maximumFractionDigits: 6,
                        minimumFractionDigits: 0,
                    })} {currencies.find(c => c.id === to)?.symbol}
                </div>
            )}
        </div>
    );
};

export default React.memo(CurrencyConverter);
