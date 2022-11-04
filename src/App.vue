<script setup lang="ts">
  import { useMainStore } from "./store";

  const store = useMainStore();
</script>

<template>
  <h1>{{ store.count }}</h1>
  <button @click="store.increment">Add</button>
</template>
