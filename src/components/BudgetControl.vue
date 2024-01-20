<script setup>
import { computed } from 'vue'
import { formatQuantity } from '../helpers'
import CircleProgress from 'vue3-circle-progress'
import "vue3-circle-progress/dist/circle-progress.css"

const props = defineProps({
    budget: {
        type: Number,
        requiered: true
    },
    availableBudget: {
        type: Number,
        requiered: true
    },
    expended: {
        type: Number,
        requiered: true
    }
})

defineEmits(['reset-budget'])

const getPercentage = computed(() => {
    return parseInt(((props.budget - props.availableBudget) / props.budget) * 100);
})

</script>

<template>
    <div class="two-columns">
        <div class="container-graph">
            <p class="percent">{{ getPercentage }}%</p>
            <CircleProgress :percent="getPercentage" :size="250" :border-width="32" :border-bg-width="30"
                fill-color="#3b82f6" empty-color="#e1e1e1" />
        </div>
        <div class="budget-container">
            <button class="budget-reset" type="button" @click="$emit('reset-budget')">
                Resetear Presupusto
            </button>
            <p><span>Presupuesto: </span>{{ formatQuantity(budget) }}</p>
            <p><span>Disponible: </span>{{ formatQuantity(availableBudget) }}</p>
            <p><span>Gastado: </span>{{ formatQuantity(expended) }}</p>
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

.container-graph {
    position: relative;
}

.percent {
    position: absolute;
    margin: auto;
    top: calc(50% - 1.5rem);
    left: 0;
    right: 0;
    text-align: center;
    z-index: 1;
    font-size: 3rem;
    font-weight: 900;
    color: var(--dark-gray);
}

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