import { useCurrencyConverter } from '../hooks/useCurrencyConverter';
import CurrencyConverter from '../components/CurrencyConverter';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

const Converter = () => {
    const converter = useCurrencyConverter();

    return (
        <div className="converter-page">
            <h1>Конвертер криптовалют</h1>
            {converter.error && <ErrorMessage message={converter.error} />}
            {converter.loading ? (
                <Loader />
            ) : (
                <CurrencyConverter
                    amount={converter.params.amount.toString()}
                    from={converter.params.from}
                    to={converter.params.to}
                    result={converter.result}
                    onAmountChange={(value) => converter.setAmount(Number(value))}
                    onFromChange={converter.setFrom}
                    onToChange={converter.setTo}
                />
            )}
        </div>
    );
};

export default Converter;