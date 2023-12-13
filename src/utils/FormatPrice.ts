const formatPrice = (price: string) => {
    return Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'BRL',
    }).format(Number(price));
};

export default formatPrice;
