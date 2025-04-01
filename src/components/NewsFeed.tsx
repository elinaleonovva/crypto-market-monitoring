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
                        <img
                            src={item.imageurl}
                            alt={item.title}
                            className="news-image"
                        />
                        <h3 className="news-title">{item.title}</h3>
                    </article>
                ))}
            </div>

            {selectedNews && (
                <div
                    className="popup-overlay"
                    onClick={handleClosePopup}
                >
                    <div className="popup-content">
                        <button
                            className="close-btn"
                            onClick={() => setSelectedNews(null)}
                        >
                            &times;
                        </button>
                        <div className="image-container">
                            <img
                                src={selectedNews.imageurl}
                                alt={selectedNews.title}
                                className="popup-image"
                            />
                        </div>
                        <div className="popup-body">
                            <h2>{selectedNews.title}</h2>
                            <div className="popup-text">
                                {selectedNews.body.split('\n').map((text, i) => (
                                    <p key={i}>{text}</p>
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