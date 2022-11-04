<script setup lang="ts">
  import { useCounterStore } from "./stores/counter";

  const counterStore = useCounterStore();
</script>

<template>
  <h1>{{ counterStore.count }}</h1>
  <button @click="counterStore.increment"></button>
</template>
