// CurrencyConverterComponent.test.tsx
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CurrencyConverter from '../CurrencyConverter';

const mockProps = {
    amount: '100',
    from: 'USD',
    to: 'EUR',
    result: 90,
    currencies: [
        { id: 'USD', symbol: '$', name: 'US Dollar' },
        { id: 'EUR', symbol: '€', name: 'Euro' },
    ],
    onAmountChange: jest.fn(),
    onFromChange: jest.fn(),
    onToChange: jest.fn(),
    onSwitchCurrencies: jest.fn(),
};

test('Поле ввода суммы отображает корректное значение', () => {
    render(<CurrencyConverter {...mockProps} />);
    const input = screen.getByPlaceholderText('Введите сумму') as HTMLInputElement;
    expect(input.value).toBe('100');
});

test('onAmountChange вызывается при вводе значения', () => {
    render(<CurrencyConverter {...mockProps} />);
    const input = screen.getByPlaceholderText('Введите сумму');
    fireEvent.change(input, { target: { value: '123.45' } });
    expect(mockProps.onAmountChange).toHaveBeenCalledWith('123.45');
});

test('onFromChange вызывается при выборе другой валюты источника', () => {
    render(<CurrencyConverter {...mockProps} />);
    const selectFrom = screen.getAllByRole('combobox')[0];
    fireEvent.change(selectFrom, { target: { value: 'EUR' } });
    expect(mockProps.onFromChange).toHaveBeenCalledWith('EUR');
});

test('onToChange вызывается при выборе другой валюты назначения', () => {
    render(<CurrencyConverter {...mockProps} />);
    const selectTo = screen.getAllByRole('combobox')[1];
    fireEvent.change(selectTo, { target: { value: 'USD' } });
    expect(mockProps.onToChange).toHaveBeenCalledWith('USD');
});

test('onSwitchCurrencies вызывается при нажатии кнопки переключения', () => {
    render(<CurrencyConverter {...mockProps} />);
    const switchButton = screen.getByRole('button');
    fireEvent.click(switchButton);
    expect(mockProps.onSwitchCurrencies).toHaveBeenCalled();
});

test('Результат конвертации отображается корректно', () => {
    render(<CurrencyConverter {...mockProps} />);
    expect(screen.getByText(/100/)).toBeInTheDocument();
    expect(screen.getByText(/90/)).toBeInTheDocument();
});
