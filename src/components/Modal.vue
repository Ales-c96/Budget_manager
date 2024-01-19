<script setup>
import { ref } from 'vue'
import Alert from './Alert.vue'
import closeModal from '../assets/img/cerrar.svg'

const error = ref('')

const emit = defineEmits(['close-modal', 'save-expense', 'update:name', 'update:category', 'update:quantity'])
const props = defineProps({
    modal: {
        type: Object,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: [String, Number],
        required: true
    },
    availableBudget: {
        type: Number,
        required: true
    }
})

const addExpense = () => {
    const { name, category, quantity, availableBudget } = props
    if ([name, category, quantity].includes('')) {
        error.value = 'Todos los campos son obligatorios'
        setTimeout(() => {
            error.value = ''
        }, 3000);
        return
    }

    if (quantity <= 0) {
        error.value = 'Cantidad no válida'
        setTimeout(() => {
            error.value = ''
        }, 3000);
        return
    }

    //Validate avalible budget
    if (quantity > availableBudget) {
        error.value = 'El gasto ha excedido el presupuesto'
        setTimeout(() => {
            error.value = ''
        }, 3000);
        return
    }
    
    emit('save-expense')

}
</script>

<template>
    <div class="modal">
        <div class="close-modal" @click="$emit('close-modal')">
            <img :src="closeModal" alt="Icono cerrar modal">
        </div>
        <div class="container form-container" :class="[modal.animate ? 'animate' : 'close']">
            <form class="new-expense" @submit.prevent="addExpense">
                <legend>Añadir Gasto</legend>
                <Alert v-if="error">{{ error }}</Alert>
                <div class="field">
                    <label for="expense-name">Nombre Gasto:</label>
                    <input type="text" name="expense-name" id="expense-name" placeholder="Añade el nombre del gasto"
                        :value="name" @input="$emit('update:name', $event.target.value)">
                </div>
                <div class="field">
                    <label for="expense-quantity">Cantidad:</label>
                    <input type="number" name="expense-quantity" id="expense-quantity"
                        placeholder="Añade la cantidad del gasto" :value="quantity"
                        @input="$emit('update:quantity', +$event.target.value)">
                </div>
                <div class="field">
                    <label for="expense-category">Categoría: </label>
                    <select name="expense-category" id="expense-category" :value="category"
                        @input="$emit('update:category', $event.target.value)">
                        <option value="" disabled>-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>
                <input type="submit" value="Añadir Gasto">
            </form>
        </div>
    </div>
</template>

<style scoped>
.form-container {
    transition: 300ms ease-in all;
    opacity: 0;
}

.form-container.animate {
    opacity: 1;
}

.form-container.close {
    opacity: 0;
}

.modal {
    position: absolute;
    background-color: rgb(0 0 0 / 0.9);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.close-modal {
    position: absolute;
    top: 3rem;
    right: 3rem;
}

.close-modal img {
    width: 3rem;
    cursor: pointer;
}

.new-expense {
    margin: 10rem auto 0 auto;
    display: grid;
    gap: 2rem;
}

.new-expense legend {
    text-align: center;
    color: var(--white);
    font-size: 3rem;
    font-weight: 700;
}

.new-expense input,
.new-expense select {
    background-color: var(--white-gray);
    border-radius: 1rem;
    padding: 1rem;
    border: none;
    font-size: 2.2rem;
}

.new-expense label {
    color: var(--white);
    font-size: 3rem;
}

.new-expense input[type='submit'] {
    background-color: var(--blue);
    color: var(--white);
    font-weight: 700;
    cursor: pointer;
    transition: .3s ease all;
}

.new-expense input[type='submit']:hover {
    background-color: var(--dark-blue);
}

.field {
    display: grid;
    gap: 2rem;
}
</style>