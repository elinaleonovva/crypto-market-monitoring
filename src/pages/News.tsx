import { useNews } from '../context/NewsContext';
import NewsFeed from '../components/NewsFeed';

const News = () => {
    const { news, loading, error } = useNews();

    return (
        <div className="news-page">
            <h1>Последние новости</h1>
            <NewsFeed
                news={news}
                loading={loading}
                error={error}
            />
        </div>
    );
};

export default News;