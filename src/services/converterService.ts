import apiClient from './api';

// Определяем интерфейс для ответа API
interface CoinGeckoConversionResponse {
    [fromCurrency: string]: {
        [toCurrency: string]: number;
    };
}

export const convertCurrency = async (
    from: string,
    to: string,
    amount: number
): Promise<number> => {
    try {
        // Явно указываем тип ответа
        const response = await apiClient.get<CoinGeckoConversionResponse>('/simple/price', {
            params: {
                ids: from,
                vs_currencies: to,
            },
        });

        const rate = response.data[from][to];
        if (!rate) throw new Error('Invalid conversion');

        return amount * rate;
    } catch (error) {
        // Улучшенная обработка ошибок
        throw new Error(`Failed to convert currency: ${error instanceof Error ? error.message : String(error)}`);
    }
};