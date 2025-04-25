import { useState } from 'react';
import { NewsItem } from '../../services/newsService';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './news-feed.css';

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
        <div className="news">
            <div className="news__grid">
                {news.map((item) => (
                    <article
                        key={item.id}
                        className="news__card"
                        onClick={() => setSelectedNews(item)}
                    >
                        <div className="news__image-wrapper">
                            <img
                                src={item.imageurl || '/placeholder.jpg'}
                                alt={item.title}
                                className="news__image"
                                loading="lazy"
                                decoding="async"
                                onError={handleImageError}
                            />
                        </div>
                        <h3 className="news__title">{item.title}</h3>
                    </article>
                ))}
            </div>

            {selectedNews && (
                <div className="news__popup" onClick={handleClosePopup}>
                    <div className="news__popup-content">
                        <button
                            className="news__popup-close"
                            onClick={() => setSelectedNews(null)}
                        >
                            &times;
                        </button>
                        <div className="news__popup-image-wrapper">
                            <img
                                src={selectedNews.imageurl?.replace('_small', '_large') || '/placeholder-large.jpg'}
                                alt={selectedNews.title}
                                className="news__popup-image"
                            />
                        </div>
                        <div className="news__popup-body">
                            <h2>{selectedNews.title}</h2>
                            <div className="news__popup-text">
                                {selectedNews.body.split('\n').map((text, i) => (
                                    <p key={i}>{formatText(text)}</p>
                                ))}
                            </div>
                            <a
                                href={selectedNews.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="news__read-more"
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