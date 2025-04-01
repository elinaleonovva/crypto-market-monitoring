import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { fetchNews } from '../services/newsService';
import { NewsItem } from '../services/newsService';

type NewsContextType = {
    news: NewsItem[];
    loading: boolean;
    error: string | null;
    refreshNews: () => Promise<void>;
};

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNewsData = async () => {
        try {
            setLoading(true);
            const data = await fetchNews();
            setNews(data.Data.slice(0, 20));
            setError(null);
        } catch (err) {
            setError('Failed to fetch news');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNewsData();
    }, []);

    return (
        <NewsContext.Provider value={{
            news,
            loading,
            error,
            refreshNews: fetchNewsData
        }}>
            {children}
        </NewsContext.Provider>
    );
};

export const useNews = () => {
    const context = useContext(NewsContext);
    if (!context) {
        throw new Error('useNews must be used within a NewsProvider');
    }
    return context;
};