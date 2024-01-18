export const formatQuantity = quantity => {
    return Number(quantity).toLocaleString('es-US', {
        style: 'currency',
        currency: 'USD'
    })
}