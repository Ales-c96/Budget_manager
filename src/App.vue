<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { generateID } from './helpers'

import Budget from './components/Budget.vue'
import BudgetControl from './components/BudgetControl.vue'
import Modal from './components/Modal.vue'
import Expense from './components/Expense.vue'
import Filters from './components/Filters.vue'

//Assets
import newBudgetIcon from './assets/img/nuevo-gasto.svg'

const budget = ref(0)
const availableBudget = ref(0)
const expended = ref(0)
const expenses = ref([])
const filter = ref('')

const expense = reactive({
  id: null,
  date: Date.now(),
  name: '',
  quantity: '',
  category: ''
})

const modal = reactive({
  show: false,
  animate: false
})

watch(expenses, () => {
  const totalExpenses = expenses.value.reduce((total, expense) => expense.quantity + total, 0)
  expended.value = totalExpenses
  availableBudget.value = budget.value - totalExpenses
  localStorage.setItem('expenses', JSON.stringify(expenses.value))
}, {
  deep: true
})

watch(budget, () => {
  localStorage.setItem('budget', budget.value)
})

onMounted(() => {
  const storageBudget = localStorage.getItem('budget')
  const storageExpenses = localStorage.getItem('expenses')
  if(storageBudget) {
    budget.value = Number(storageBudget)
    availableBudget.value = Number(storageBudget)
  }
  if(storageExpenses) {
    expenses.value = JSON.parse(storageExpenses)
  }
}) 

const defineBudget = (quantity) => {
  budget.value = quantity
  availableBudget.value = quantity
}

const showModal = () => {
  modal.show = true
  setTimeout(() => {
    modal.animate = true
  }, 300);
}

const closeModal = () => {
  setTimeout(() => {
    modal.show = false
    //Reload the expense Object
    Object.assign(expense, {
      id: null,
      date: Date.now(),
      name: '',
      quantity: '',
      category: ''
    })
  }, 300);
  modal.animate = false
}

const saveExpense = () => {
  if (expense.id) {
    const id = expense.id
    const index = expenses.value.findIndex((expense => expense.id === id))
    expenses.value[index] = { ...expense }
  } else {
    expenses.value.push({
      ...expense,
      id: generateID()
    })
  }
  //Close the modal after setting an expense
  closeModal()
}

const selectExpense = id => {
  const editExpense = expenses.value.filter(expense => expense.id === id)[0];
  Object.assign(expense, editExpense);
  showModal()
}

const deleteExpense = () => {
  expenses.value = expenses.value.filter(expenseState => expenseState.id !== expense.id)
  closeModal()
}

const filteredExpenses = computed(() => {
  if (filter.value) {
    return expenses.value.filter(expense => expense.category === filter.value)
  }
  return expenses.value
})

const resetBudget = () => {
  if(confirm('¿Deseas resetear todo el presupuesto y sus gastos?')) {
    expenses.value = []
    budget.value = 0
  }
}

</script>

<template>
  <div :class="{ fix: modal.show }">
    <header>
      <h1>Gestor de Gastos</h1>
      <div class="header-container container shadow">
        <Budget v-if="budget === 0" @define-budget="defineBudget" />
        <BudgetControl v-else :budget="budget" :availableBudget="availableBudget" :expended="expended" @reset-budget="resetBudget" />
      </div>
    </header>
    <main v-if="budget > 0">
      <Filters v-model:filter="filter" />
      <div class="expenses-list container">
        <h2>{{ filteredExpenses.length > 0 ? 'Gastos' : 'No hay gastos' }}</h2>
        <Expense v-for="expense in filteredExpenses" :key="expense.id" :expense="expense"
          @select-expense="selectExpense" />
      </div>
      <div class="create-budget">
        <img :src="newBudgetIcon" alt="Icono nuevo gasto" @click="showModal">
      </div>
      <Modal v-if="modal.show" @close-modal="closeModal" @save-expense="saveExpense" :modal="modal"
        v-model:name="expense.name" v-model:category="expense.category" v-model:quantity="expense.quantity"
        :availableBudget="availableBudget" :id="expense.id" @delete-expense="deleteExpense" />
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

.fix {
  overflow: hidden;
  height: 100vh;
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

.expenses-list {
  margin-top: 10rem;
}

.expenses-list h2 {
  font-weight: 900;
  color: var(--dark-gray);
}
</style>
