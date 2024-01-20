<script setup>
import { formatQuantity, formaDate } from '../helpers'
import IconoAhorro from '../assets/img/icono_ahorro.svg'
import IconoCasa from '../assets/img/icono_casa.svg'
import IconoComida from '../assets/img/icono_comida.svg'
import IconoGastos from '../assets/img/icono_gastos.svg'
import IconoOcio from '../assets/img/icono_ocio.svg'
import IconoSalud from '../assets/img/icono_salud.svg'
import IconoSuscripciones from '../assets/img/icono_suscripciones.svg'

const iconsDictionary = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones
}

const props = defineProps({
    expense: {
        type: Object,
        required: true
    }
})

defineEmits(['select-expense'])

</script>

<template>
    <div class="expense shadow">
        <div class="content">
            <img :src="iconsDictionary[expense.category]" alt="Icono de gasto" class="icon">
            <div class="details">
                <p class="category">Categoría:
                    <span>{{ expense.category }}</span>
                </p>
                <p @click="$emit('select-expense', expense.id)" class="name">Nombre del gasto:
                    <span>{{ expense.name }}</span>
                </p>
                <p class="date">Fecha:
                    <span>{{ formaDate(expense.date) }}</span>
                </p>
            </div>
        </div>
        <p class="quantity">{{ formatQuantity(expense.quantity) }}</p>
    </div>
</template>

<style scoped>
.expense {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.content {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.icon {
    width: 5rem;
}

.detail p {
    margin: 0 0 1rem 0;
}

.category {
    color: var(--gray);
    font-size: 1.2rem;
    text-transform: uppercase;
    font-weight: 900;
}

.name {
    color: var(--dark-gray);
    font-size: 2.4rem;
    font-weight: 700;
    cursor: pointer;
}

.date {
    color: var(--dark-gray);
    font-size: 1.6rem;
    font-weight: 900;
}

.date span {
    font-weight: 400;
}

.quantity {
    font-size: 3rem;
    font-weight: 900;
    margin: 0;
}</style>