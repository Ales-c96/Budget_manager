<script setup>
import { watch, computed, onMounted } from 'vue'
import image from '../assets/img/grafico.jpg'
import { formatQuantity } from '../helpers'

const props = defineProps({
    budget: {
        type: Number,
        requiered: true
    },
    availableBudget: {
        type: Number,
        requiered: true
    }
})

const calculateAvalibleBudget = computed(() => {
    return 
})

</script>

<template>
    <div class="two-columns">
        <div class="container-graph">
            <img :src="image" alt="">
        </div>
        <div class="budget-container">
            <button class="budget-reset">
                Resetear Presupusto
            </button>
            <p><span>Presupuesto: </span>{{ formatQuantity(budget) }}</p>
            <p><span>Disponible: </span>{{ formatQuantity(availableBudget) }}</p>
            <p><span>Gastado: </span> $0</p>
        </div>
    </div>
</template>

<style scoped>
.two-columns {
    display: flex;
    flex-direction: column;
}

.two-columns> :first-child {
    margin-bottom: 3rem;
}

.container-graph {}

.budget-container {
    width: 100%;
}

.budget-container p {
    font-size: 2.4rem;
    text-align: center;
    color: var(--dark-gray);
}

.budget-container span {
    font-weight: 900;
    color: var(--blue);
}

.budget-reset {
    background-color: var(--light-red);
    border: none;
    padding: 1rem;
    width: 100%;
    color: var(--white);
    font-weight: 900;
    text-transform: uppercase;
    border-radius: 1rem;
    transition: .5s ease all;
}

.budget-reset:hover {
    cursor: pointer;
    background-color: var(--dark-red);
}

@media (min-width: 768px) {
    .two-columns {
        flex-direction: row;
        gap: 4rem;
        align-items: center;
    }

    .two-columns> :first-child {
        margin-bottom: 0;
    }

    .budget-container p {
        text-align: left;
    }
}
</style>