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

// Мемоизация списка валют и форматирования
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

    // Мемоизация обработчика ввода
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

    // Мемоизация форматированного значения
    const formattedAmount = React.useMemo(() => {
        if (amount === '' || amount === '.') return amount;
        if (amount.endsWith('.')) return amount;

        const numberValue = parseFloat(amount);
        return Number.isInteger(numberValue)
            ? numberValue.toString()
            : numberValue.toFixed(6).replace(/0+$/, '').replace(/\.$/, '');
    }, [amount]);

    // Мемоизация элементов списка валют
    const CurrencyOption = React.memo(({ currency }: { currency: typeof currencies[0] }) => (
        <option value={currency.id}>
            {currency.name} ({currency.symbol})
        </option>
    ));

    return (
        <div className="converter-container">
            <div className="converter-inputs">
                <div className="input-group">
                    <label>Сумма:</label>
                    <input
                        type="text"
                        value={formattedAmount}
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
                                <CurrencyOption key={currency.id} currency={currency} />
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
                                <CurrencyOption key={currency.id} currency={currency} />
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

export default React.memo(CurrencyConverter); // Мемоизация всего компонента