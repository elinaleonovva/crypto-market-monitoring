// Юнит-тестирование (Jest)
import { renderHook, act } from '@testing-library/react'; // Импорт из основной библиотеки
import { useCurrencyConverter } from '../useCurrencyConverter';

describe('useCurrencyConverter', () => {
    test('Корректная конвертация BTC в ETH', () => {
        const { result } = renderHook(() => useCurrencyConverter());
        act(() => {
            result.current.setAmount('1');
            result.current.setFrom('bitcoin');
            result.current.setTo('ethereum');
        });
        expect(result.current.result).toBeCloseTo(16.5); // 1 BTC → 16.5 ETH
    });

    test('Переключение валют обновляет курс', () => {
        const { result } = renderHook(() => useCurrencyConverter());
        act(() => {
            result.current.switchCurrencies();
        });
        expect(result.current.params.from).toBe('ethereum');
        expect(result.current.params.to).toBe('bitcoin');
    });
});