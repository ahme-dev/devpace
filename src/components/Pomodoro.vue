<script setup lang="ts">
	import { useMainStore } from "@/store";
	import { NGradientText, NCard } from "naive-ui";

	const store = useMainStore();
</script>

<template>
	<NCard>
		<NGradientText :size="40">
			{{ store.count }}
		</NGradientText>
	</NCard>
</template>
