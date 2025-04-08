import apiClient from './api';

export interface Exchange {
    id: string;
    name: string;
    trust_score_rank: number;
    trade_volume_24h_btc: number;
    url: string;
    image: string;
}

// Интерфейс для ответа API
interface ExchangeApiResponse {
    id: string;
    name: string;
    trust_score_rank: number;
    trade_volume_24h_btc: number;
    url: string;
    image: string;
}

export const fetchExchanges = async (): Promise<Exchange[]> => {
    try {
        // Явно указываем тип массива ExchangeApiResponse
        const response = await apiClient.get<ExchangeApiResponse[]>('/exchanges', {
            params: {
                per_page: 100,
                page: 1,
            },
        });

        // Теперь response.data имеет тип ExchangeApiResponse[]
        return response.data.map((exchange: ExchangeApiResponse) => ({
            id: exchange.id,
            name: exchange.name,
            trust_score_rank: exchange.trust_score_rank,
            trade_volume_24h_btc: exchange.trade_volume_24h_btc,
            url: exchange.url,
            image: exchange.image,
        }));
    } catch (error) {
        // Улучшенная обработка ошибок
        throw new Error(`Failed to fetch exchanges data: ${error instanceof Error ? error.message : String(error)}`);
    }
};