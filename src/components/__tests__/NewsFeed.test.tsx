// Тестирование попапа (React Testing Library)

import { render, screen } from '@testing-library/react';
import NewsFeed from '../NewsFeed';

describe('NewsFeed', () => {
    it('должен отображать сообщение об ошибке при наличии ошибки', () => {
        render(<NewsFeed news={[]} loading={false} error="Ошибка загрузки новостей" />);

        // Проверяем, что ошибка отображается
        expect(screen.getByText('Ошибка загрузки новостей')).toBeInTheDocument();
    });
});
