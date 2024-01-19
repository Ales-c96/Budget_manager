<script setup>
import closeModal from '../assets/img/cerrar.svg'

defineEmits(['close-modal'])
const props = defineProps({
    modal: {
        type: Object,
        requiered: true
    }
})

</script>

<template>
    <div class="modal">
        <div class="close-modal" @click="$emit('close-modal')">
            <img :src="closeModal" alt="Icono cerrar modal">
        </div>
        <div class="container form-container" :class="[modal.animate ? 'animate' : 'close']">
            <form class="new-budget">
                <legend>
                    Añadir Gasto
                </legend>
                <div class="field">
                    <label for="budget-name">Nombre Gasto:</label>
                    <input type="number" name="budget-name" id="budget-name" placeholder="Añade el nombre del gasto">
                </div>
                <div class="field">
                    <label for="budget-quantity">Cantidad:</label>
                    <input type="number" name="budget-quantity" id="budget-quantity"
                        placeholder="Añade la cantidad del gasto">
                </div>
                <div class="field">
                    <label for="budget-category">Categoría: </label>
                    <select name="budget-category" id="budget-category">
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="transporte">Transporte</option>
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

.new-budget {
    margin: 10rem auto 0 auto;
    display: grid;
    gap: 2rem;
}

.new-budget legend {
    text-align: center;
    color: var(--white);
    font-size: 3rem;
    font-weight: 700;
}

.new-budget input,
.new-budget select {
    background-color: var(--white-gray);
    border-radius: 1rem;
    padding: 1rem;
    border: none;
    font-size: 2.2rem;
}

.new-budget label {
    color: var(--white);
    font-size: 3rem;
}

.new-budget input[type='submit'] {
    background-color: var(--blue);
    color: var(--white);
    font-weight: 700;
    cursor: pointer;
    transition: .3s ease all;
}

.new-budget input[type='submit']:hover {
    background-color: var(--dark-blue);
}

.field {
    display: grid;
    gap: 2rem;
}
</style>