<script setup>
defineProps(['filter'])
defineEmits(['update:filter'])
</script>

<template>
    <div class="filter shadow container">
        <form>
            <div class="field">
                <label for="filterExpense">Filtrar Gastos</label>
                <select name="filterExpense" id="filterExpense" :value="filter"
                    @input="$emit('update:filter', $event.target.value)">
                    <option value="">-- Todos los gastos --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>
        </form>
    </div>
</template>



<style lang="scss" scoped>
.filter {
    margin-top: 10rem;
}

.filter .field {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.filter label {
    font-size: 3rem;
    font-weight: 900;
    color: var(--dark-gray);
}

.filter select {
    flex: 1;
    padding: 1rem;
    border: none;
    border-radius: 1rem;
    background-color: var(--white-gray);
    text-align: center;
}
</style>