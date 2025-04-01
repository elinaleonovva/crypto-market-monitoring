import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={`header ${theme}`}>
            <nav className="header-nav">
                {/* Левая часть - Иконка темы */}
                <div className="header-side left">
                    <button
                        onClick={toggleTheme}
                        className="theme-toggle"
                        aria-label="Сменить тему"
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                </div>

                {/* Центральная часть - Навигация */}
                <div className="nav-center">
                    <Link to="/" className="nav-link">Главная</Link>
                    <Link to="/market" className="nav-link">Рынок</Link>
                    <Link to="/news" className="nav-link">Новости</Link>
                    <Link to="/exchanges" className="nav-link">Биржи</Link>
                    <Link to="/converter" className="nav-link">Конвертер</Link>
                </div>

                {/* Правая часть - Для баланса */}
                <div className="header-side right"></div>
            </nav>
        </header>
    );
};

export default Header;