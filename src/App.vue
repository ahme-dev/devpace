<script setup lang="ts">
  import { useMainStore } from "./store";
  import { PlusFilled } from "@vicons/material";
  import {
    NGradientText,
    NCard,
    NIcon,
    NButton,
    NGlobalStyle,
    NConfigProvider,
    darkTheme,
  } from "naive-ui";

  const store = useMainStore();
</script>

<template>
  <NConfigProvider :theme="darkTheme">
    <!-- app -->
    <NCard title="App">
      <NGradientText :size="40">
        {{ store.count }}
      </NGradientText>
      <br />
      <NButton @click="store.increment">
        <NIcon size="40" :component="PlusFilled"></NIcon>
      </NButton>
    </NCard>

    <!-- style to body -->
    <NGlobalStyle></NGlobalStyle>
  </NConfigProvider>
</template>

<style scoped></style>
