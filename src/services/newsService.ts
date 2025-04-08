import axios from 'axios';

export interface NewsItem {
    id: string;
    title: string;
    url: string;
    imageurl: string;
    body: string;
    published_on?: number;
}

export interface NewsApiResponse {
    Data: NewsItem[];
}

export const fetchNews = async (): Promise<NewsApiResponse> => {
    try {
        const response = await axios.get<NewsApiResponse>(
            'https://min-api.cryptocompare.com/data/v2/news/?lang=EN',
            {
                headers: {
                    "Authorization": `Apikey ${process.env.c87a6c190fd31d303b98d5c663427a266b087552e0330957d70cb755c41e4114}`
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch news');
    }
};