import { NewsItem } from '../services/newsService';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import '../styles';

interface NewsFeedProps {
    news: NewsItem[];
    loading: boolean;
    error: string | null;
}

const NewsFeed = ({ news, loading, error }: NewsFeedProps) => {
    if (loading) return <Loader />;
    if (error) return <ErrorMessage message={error} />;

    return (
        <div className="news-grid">
            {news.map((item) => (
                <article key={item.id} className="news-card">
                    <img src={item.imageurl} alt={item.title} className="news-image" />
                    <h3>{item.title}</h3>
                    <p>{item.body.substring(0, 100)}...</p>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                        Читать далее
                    </a>
                </article>
            ))}
        </div>
    );
};

export default NewsFeed;