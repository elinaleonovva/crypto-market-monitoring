// Юнит-тестирование (Jest)
import { renderHook, act } from '@testing-library/react'; // Добавлен act
import { useTheme } from '../useTheme';

test('Переключение темы обновляет localStorage и DOM', () => {
    const { result } = renderHook(() => useTheme());

    act(() => {
        result.current.toggleTheme();
    });

    // Проверяем localStorage
    expect(localStorage.getItem('theme')).toBe('dark');

    // Проверяем атрибут в DOM
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
});