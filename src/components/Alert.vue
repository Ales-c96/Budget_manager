<template>
    <div class="alert">
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.alert {
    padding: 1rem;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 1.6rem;
    text-align: center;
    background-color: var(--white);
    border-left: 3px solid var(--red);
    color: var(--red);
    margin-bottom: 2rem;
}
</style>