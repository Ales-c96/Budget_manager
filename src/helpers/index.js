export const formatQuantity = quantity => {
    return Number(quantity).toLocaleString('es-US', {
        style: 'currency',
        currency: 'USD'
    })
}

export const generateID = () => {
    const fecha = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2)
    return fecha + random
}

export const formaDate = date => {
    const newDate = new Date(date)
    const options = {
        year: 'numeric',
        month: 'long',
        date: '2-digit'
    }
    return newDate.toLocaleDateString('es-ES', options)
}