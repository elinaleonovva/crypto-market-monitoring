// Юнит-тестирование (Jest)
import { renderHook, waitFor } from '@testing-library/react';
import { useFetch } from '../useFetch';

beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ data: 'test' }),
        } as Response)
    );
});

afterEach(() => {
    jest.restoreAllMocks();
});

test('Успешный запрос обновляет данные', async () => {
    const { result } = renderHook(() => useFetch('/api/data', null));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual({ data: 'test' });
});

test('Ошибка сети устанавливает error', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
        Promise.reject(new Error('Network error'))
    );

    const { result } = renderHook(() => useFetch('/api/data', null));

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.error).toBe('Network error');
});