export function formatNumberToPriceBRL(price: number) {
    if (!price) {
        return '0,00';
    }

    return price.toLocaleString('pt-BR',
        {
            minimumFractionDigits: 2,
        });
}
