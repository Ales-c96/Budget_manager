<script setup>
import { ref } from 'vue'
import Alerta from './Alert.vue'

const emit = defineEmits(['define-budget'])

const budget = ref(0)
const error = ref('')

const defineBudget = () => {
    if (budget.value <= 0 || budget.value === '') {
        
        error.value = 'Presupuesto no válido'
        setTimeout(() => {
            error.value = ''
        }, 3000);

        return

    } else {
        emit('define-budget', budget.value)
    }
}

</script>

<template>
    <form class="budget-form" @submit.prevent="defineBudget">
        <Alerta v-if="error">
            <p>{{ error }}</p>
        </Alerta>
        <div class="field">
            <label for="new-budget">Define el presupuesto</label>
            <input type="number" name="new-budget" id="new-budget" placeholder="Añade un nuevo presupuesto" min="0"
                v-model.number="budget">
        </div>
        <input type="submit" name="" id="" value="Definir Presupuesto">
    </form>
</template>

<style lang="scss" scoped>
.budget-form {
    width: 100%;

    & label {
        font-size: 2rem;
        color: var(--blue);
        text-align: center;
    }

    & input[type="number"] {
        background-color: var(--white-gray);
        border-radius: 1rem;
        padding: 1rem;
        border: none;
        font-size: 2.2rem;
        text-align: center;
    }

    & input[type="submit"] {
        background-color: var(--blue);
        border: none;
        padding: 1rem;
        text-align: center;
        font-size: 2rem;
        margin-top: 2rem;
        color: var(--white);
        font-weight: 900;
        width: 100%;
        transition: .5s ease all;

        &:hover {
            background-color: var(--dark-blue);
            cursor: pointer;
        }
    }

    .field {
        display: grid;
        gap: 2rem;
    }
}
</style>