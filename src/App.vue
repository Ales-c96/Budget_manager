<script setup>
import { ref } from 'vue'
import Budget from './components/Budget.vue'
import BudgetControl from './components/BudgetControl.vue'

const budget = ref(0)

const defineBudget = (quantity) => {
  budget.value = quantity
}

</script>

<template>
  <div>
    <header>
      <h1>Gestor de Gastos</h1>
      <div class="header-container container shadow">
        <Budget v-if="budget === 0" @define-budget="defineBudget" />
        <BudgetControl v-else />
      </div>
    </header>
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
</style>
