import { useCurrencyConverter } from '../hooks/useCurrencyConverter';
import CurrencyConverter from '../components/CurrencyConverter';

const ConverterPage = () => {
    const converter = useCurrencyConverter();

    return (
        <div className="page-container">
            <h1>Криптоконвертер</h1>
            <CurrencyConverter
                amount={converter.params.amount}
                from={converter.params.from}
                to={converter.params.to}
                result={converter.result}
                currencies={converter.currencies}
                onAmountChange={converter.setAmount}
                onFromChange={converter.setFrom}
                onToChange={converter.setTo}
                onSwitchCurrencies={converter.switchCurrencies}
            />
        </div>
    );
};

export default ConverterPage;