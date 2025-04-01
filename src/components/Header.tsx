import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import '../styles';

export const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={`header ${theme}`}>
            <nav>
                <Link to="/" className="logo">CryptoMonitor</Link>
                <div className="nav-links">
                    <Link to="/market">Рынок</Link>
                    <Link to="/news">Новости</Link>
                    <Link to="/exchanges">Биржи</Link>
                    <Link to="/converter">Конвертер</Link>
                </div>
                <button onClick={toggleTheme}>
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </nav>
        </header>
    );
};

export default Header;