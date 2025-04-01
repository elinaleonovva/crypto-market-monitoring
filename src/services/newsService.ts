import axios from 'axios';

export interface NewsItem {
    id: string;
    title: string;
    url: string;
    imageurl: string;
    body: string;
    published_on: number;
}

export interface NewsApiResponse {
    Data: NewsItem[];
    // Другие поля ответа, если есть
}

export const fetchNews = async (): Promise<NewsApiResponse> => {
    try {
        const response = await axios.get<NewsApiResponse>(
            'https://min-api.cryptocompare.com/data/v2/news/?lang=EN'
        );
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch news');
    }
};