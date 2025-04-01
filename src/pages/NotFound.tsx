import '../styles';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found">
            <h1>404 - Страница не найдена</h1>
            <p>Запрошенная страница не существует.</p>
            <Link to="/" className="home-link">
                Вернуться на главную
            </Link>
        </div>
    );
};

export default NotFound;