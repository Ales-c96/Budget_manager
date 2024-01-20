<script setup>
import { ref, computed } from 'vue'
import Alert from './Alert.vue'
import closeModal from '../assets/img/cerrar.svg'

const error = ref('')

const emit = defineEmits(['close-modal', 'save-expense', 'update:name', 'update:category', 'update:quantity', 'delete-expense'])
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
    },
    id: {
        type: [String, null],
        requiered: true
    },
    isEdit: {
        type: Boolean,
        required: true
    }
})

const showErrorMessage = msg => {
    error.value = msg
    setTimeout(() => {
        error.value = ''
    }, 3000);
}

const oldQuantity = props.quantity;

const addExpense = () => {
    const { name, category, quantity, availableBudget, id } = props
    if ([name, category, quantity].includes('')) {
        showErrorMessage('Todos los campos son obligatorios')
        return
    }

    if (quantity <= 0) {
        showErrorMessage('Cantidad no válida')
        return
    }

    //Validate avalible budget
    if (id) {
        
        if (quantity > oldQuantity + availableBudget) {
            showErrorMessage('El gasto ha excedido el presupuesto')
            return
        }

    } else {

        if (quantity > availableBudget) {
            showErrorMessage('El gasto ha excedido el presupuesto')
            return
        }

    }

    emit('save-expense')

}

const isEdit = computed(() => {
    return props.id
})
</script>

<template>
    <div class="modal">
        <div class="close-modal" @click="$emit('close-modal')">
            <img :src="closeModal" alt="Icono cerrar modal">
        </div>
        <div class="container form-container" :class="[modal.animate ? 'animate' : 'close']">
            <form class="new-expense" @submit.prevent="addExpense">
                <legend>{{ isEdit ? 'Editar Gasto' : 'Añadir un nuevo gasto' }}</legend>
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
                <input type="submit" :value="[isEdit ? 'Guardar cambios' : 'Añadir gasto']">
            </form>
            <button type="button" class="delete" v-if="isEdit" @click="$emit('delete-expense')">Eliminar Gasto</button>
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

.delete {
    border: none;
    padding: 1rem;
    width: 100%;
    background-color: var(--red);
    font-weight: 700;
    font-size: 1.2rem;
    color: var(--white);
    margin-top: 5rem;
    cursor: pointer;
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