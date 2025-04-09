import { useState } from 'react';
import { NewsItem } from '../services/newsService';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import '../styles/components/news-feed.css';

interface NewsFeedProps {
    news: NewsItem[];
    loading: boolean;
    error: string | null;
}

const NewsFeed = ({ news, loading, error }: NewsFeedProps) => {
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

    const handleClosePopup = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).classList.contains('popup-overlay')) {
            setSelectedNews(null);
        }
    };

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none'; // Скрыть битое изображение
    };

    // Функция для форматирования текста с учетом требований
    const formatText = (text: string) => {
        if (text.length > 700) {
            return `${text.slice(0, 700).trim()}...`;
        }
        if (text.length > 0 && !/[.!?]$/.test(text)) {
            return `${text}.`;
        }
        return text;
    };

    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="news-container">
            <div className="news-grid">
                {news.map((item) => (
                    <article
                        key={item.id}
                        className="news-card"
                        onClick={() => setSelectedNews(item)}
                    >
                        <div className="image-wrapper">
                            <img
                                src={item.imageurl || '/placeholder.jpg'} // Добавлен fallback
                                alt={item.title}
                                className="news-image"
                                loading="lazy" // Ленивая загрузка
                                decoding="async" // Улучшение производительности рендеринга
                                onError={handleImageError}
                            />
                        </div>
                        <h3 className="news-title">{item.title}</h3>
                    </article>
                ))}
            </div>

            {selectedNews && (
                <div className="popup-overlay" onClick={handleClosePopup}>
                    <div className="popup-content">
                        <button
                            className="close-btn"
                            onClick={() => setSelectedNews(null)}
                        >
                            &times;
                        </button>
                        <div className="image-container">
                            <img
                                src={selectedNews.imageurl?.replace('_small', '_large') || '/placeholder-large.jpg'} // Пример увеличения разрешения
                                alt={selectedNews.title}
                                className="popup-image"
                            />
                        </div>
                        <div className="popup-body">
                            <h2>{selectedNews.title}</h2>
                            <div className="popup-text">
                                {selectedNews.body.split('\n').map((text, i) => (
                                    <p key={i}>
                                        {formatText(text)}
                                    </p>
                                ))}
                            </div>
                            <a
                                href={selectedNews.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="read-more"
                            >
                                Читать далее
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsFeed;