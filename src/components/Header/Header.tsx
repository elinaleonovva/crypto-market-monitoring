import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className={`header header--${theme}`}>
            <nav className="header__nav">
                <div className="header__side header__side--left">
                    <button
                        onClick={toggleTheme}
                        className="header__theme-toggle"
                        aria-label="Сменить тему"
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                </div>

                <div className="header__center">
                    <Link to="/" className="header__link">Главная</Link>
                    <Link to="/market" className="header__link">Рынок</Link>
                    <Link to="/news" className="header__link">Новости</Link>
                    <Link to="/exchanges" className="header__link">Биржи</Link>
                    <Link to="/converter" className="header__link">Конвертер</Link>
                </div>

                <div className="header__side header__side--right"></div>
            </nav>
        </header>
    );
};

export default Header;