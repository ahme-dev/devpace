<script setup lang="ts">
	import { useMainStore } from "@/store";
	import { PlusFilled } from "@vicons/material";
	import { NGradientText, NCard, NIcon, NButton } from "naive-ui";

	const store = useMainStore();
</script>

<template>
	<NCard>
		<NGradientText :size="40">
			{{ store.count }}
		</NGradientText>
		<br />
		<NButton @click="store.increment">
			<NIcon size="40" :component="PlusFilled"></NIcon>
		</NButton>
	</NCard>
</template>
