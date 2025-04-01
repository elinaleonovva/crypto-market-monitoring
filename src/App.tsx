import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { CryptoProvider } from './context/CryptoContext';
import { NewsProvider } from './context/NewsContext';
import Header  from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import News from './pages/News';
import Market from './pages/Market';
import Exchanges from './pages/Exchanges';
import Converter from './pages/Converter';
import NotFound from './pages/NotFound';
import './styles';

const App = () => {
    return (
        <ThemeProvider>
            <AuthProvider>
                <CryptoProvider>
                    <NewsProvider>
                        <Router>
                            <div className="app">
                                <Header />

                                <main className="main-content">
                                    <Routes>
                                        <Route path="/" element={<Home />} />
                                        <Route path="/news" element={<News />} />
                                        <Route path="/market" element={<Market />} />
                                        <Route path="/exchanges" element={<Exchanges />} />
                                        <Route path="/converter" element={<Converter />} />
                                        <Route path="*" element={<NotFound />} />
                                    </Routes>
                                </main>

                                <Footer />
                            </div>
                        </Router>
                    </NewsProvider>
                </CryptoProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;