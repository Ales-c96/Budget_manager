<script setup>
import { ref, reactive } from 'vue'
import Budget from './components/Budget.vue'
import BudgetControl from './components/BudgetControl.vue'
import Modal from './components/Modal.vue'

//Assets
import newBudgetIcon from './assets/img/nuevo-gasto.svg'

const budget = ref(0)
const availableBudget = ref(0)
const modal = reactive({
  show: false,
  animate: false
})

const showModal = () => {
  modal.show = true
  modal.animate = true
}

const closeModal = () => {
  modal.show = false
  modal.animate = false
}

const defineBudget = (quantity) => {
  budget.value = quantity
  availableBudget.value = quantity
}

</script>

<template>
  <div>
    <header>
      <h1>Gestor de Gastos</h1>
      <div class="header-container container shadow">
        <Budget v-if="budget === 0" @define-budget="defineBudget" />
        <BudgetControl v-else :budget="budget" :availableBudget="availableBudget" />
      </div>
    </header>
    <main v-if="budget > 0">
      <div class="create-budget">
        <img :src="newBudgetIcon" alt="Icono nuevo gasto" @click="showModal">
      </div>
      <Modal v-if="modal.show" @close-modal="closeModal"/>
    </main>
  </div>
</template>

<style>
:root {
  --blue: #3b82f6;
  --dark-blue: #1048a4;
  --red: #b91c1c;
  --light-red: #db155e;
  --dark-red: #b7155e;
  --white: #fff;
  --white-gray: #f5f5f5;
  --gray: #94a3b8;
  --dark-gray: #64748b;
  --back: #000;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  font-size: 1.6rem;
  font-family: "Lato", sans-serif;
  background-color: var(--white-gray);
}

h1 {
  font-size: 4rem;
}

h2 {
  font-size: 3rem;
}

header {
  background-color: var(--blue);
}

header h1 {
  padding: 3rem 0;
  margin: 0;
  color: var(--white);
  text-align: center;
}

.container {
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
}

.header-container {
  margin-top: -5rem;
  transform: translateY(5rem);
  padding: 5rem;
}

.shadow {
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: var(--white);
  border-radius: 1.2rem;
  padding: 5rem;
}

.create-budget {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
}

.create-budget img {
  width: 5rem;
  cursor: pointer;
}
</style>
