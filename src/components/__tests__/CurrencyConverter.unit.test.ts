// CurrencyConverter.unit.test.ts
// ЮНИТ-ТЕСТЫ — проверка изолированной логики

describe('CurrencyConverter - formattedAmount logic', () => {
    const formatAmount = (amount: string): string => {
        if (amount === '' || amount === '.') return amount;
        if (amount.endsWith('.')) return amount;

        const numberValue = parseFloat(amount);
        return Number.isInteger(numberValue)
            ? numberValue.toString()
            : numberValue.toFixed(6).replace(/0+$/, '').replace(/\.$/, '');
    };

    it('should return empty string when input is empty', () => {
        expect(formatAmount('')).toBe('');
    });

    it('should preserve trailing dot for input like "123."', () => {
        expect(formatAmount('123.')).toBe('123.');
    });

    it('should remove extra zeroes for decimals', () => {
        expect(formatAmount('123.450000')).toBe('123.45');
    });

    it('should return integer as string when no decimals', () => {
        expect(formatAmount('100')).toBe('100');
    });
});

export {};
