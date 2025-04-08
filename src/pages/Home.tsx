import { useEffect } from 'react';
import '../styles/pages/home.css';

const Home = () => {
    useEffect(() => {
        document.body.classList.add('home-page');
        return () => document.body.classList.remove('home-page');
    }, []);

    return (
        <div className="home-container">
            {/* Герой-секция */}
            <section className="hero-section">
                <div className="content-wrapper">
                    <h1 className="main-title">
                        Добро пожаловать на информационный портал,<br/> посвященный криптовалютам
                    </h1>
                    <p className="main-description">
                        Мы создали этот ресурс для того, чтобы предоставить вам самую актуальную и полезную
                        информацию о разнообразных аспектах криптовалютного мира. Наш информационный сайт
                        призван стать вашим надежным проводником в этом инновационном мире, где каждый день
                        приносит новые открытия и возможности.
                    </p>
                </div>
            </section>

            {/* Секция о технологиях */}
            <section className="blockchain-section">
                <div className="content-wrapper">
                    <h2 className="section-title">Технологии блокчейн торговли</h2>

                    <div className="info-grid">
                        <div className="text-block">
                            <div className="definitions">
                                <p className="highlight-text">
                                    <span className="term crypto">Криптовалюта</span> -
                                    цифровые деньги, которые используют шифрование для безопасных
                                    и анонимных финансовых операций в интернете.<br/><br/>

                                    <span className="term blockchain">Блокчейн</span> -
                                    децентрализованная цифровая запись транзакций, совместно используемых
                                    в сети, которая является неизменной.
                                </p>
                            </div>

                            <div className="aspects-list">
                                <h3 className="aspects-title">Основные аспекты:</h3>
                                <ul>
                                    <li>🔹 Смарт-контракты – автоматическое выполнение условий сделки без посредников</li>
                                    <li>🔹 Трекинг поставок – цепочка поставок фиксируется в блокчейне, предотвращая подделки</li>
                                    <li>🔹 Децентрализованные платформы – торговля без центров управления, снижая комиссии</li>
                                    <li>🔹 Криптовалютные платежи – быстрые и безопасные международные расчёты</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;