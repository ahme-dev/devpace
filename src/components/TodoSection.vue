<script setup lang="ts">
	import { PlusFilled } from "@vicons/material";
	import { NList, NListItem, NButton, NText, NInput, NIcon } from "naive-ui";

	import { defineProps } from "vue";
	const props = defineProps<{ data: string[] }>();
</script>

<template>
	<!-- show data -->
	<NList hoverable clickable v-if="props.data.length">
		<NListItem v-for="item in props.data">
			<NInput type="textarea" :value="item"></NInput>
		</NListItem>
	</NList>

	<!-- when there's no data -->
	<NList v-else>
		<NListItem>
			<NText> Nothing to show! </NText>
		</NListItem>
	</NList>

	<!-- add button -->
	<NButton style="margin-top: 1rem" circle>
		<template #icon>
			<NIcon>
				<PlusFilled></PlusFilled>
			</NIcon>
		</template>
	</NButton>
</template>
