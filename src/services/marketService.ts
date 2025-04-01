import apiClient from './api';

export interface CryptoCurrency {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_24h: number;
    image: string;
    market_cap: number;
}

// Полный интерфейс для ответа API CoinGecko /coins/markets
interface CoinGeckoMarketData {
    id: string;
    name: string;
    symbol: string;
    current_price: number;
    price_change_percentage_24h: number;
    image: string;
    market_cap: number;
    // Дополнительные поля, которые могут быть полезны:
    high_24h?: number;
    low_24h?: number;
    total_volume?: number;
    last_updated?: string;
}

export const fetchMarketData = async (): Promise<CryptoCurrency[]> => {
    try {
        // Явно указываем тип ответа от API
        const response = await apiClient.get<CoinGeckoMarketData[]>('/coins/markets', {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 100,
                page: 1,
                sparkline: false,
            },
        });

        // Теперь TypeScript знает структуру response.data
        return response.data.map((coin: CoinGeckoMarketData) => ({
            id: coin.id,
            name: coin.name,
            symbol: coin.symbol,
            current_price: coin.current_price,
            price_change_percentage_24h: coin.price_change_percentage_24h,
            image: coin.image,
            market_cap: coin.market_cap,
        }));
    } catch (error) {
        // Улучшенная обработка ошибок с сохранением оригинального сообщения
        throw new Error(`Failed to fetch market data: ${
            error instanceof Error ? error.message : 'Unknown error'
        }`);
    }
};