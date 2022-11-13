<script setup lang="ts">
	import { useMainStore } from "./store";
	import { PlusFilled } from "@vicons/material";
	import {
		NGrid,
		NGridItem,
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
		<NGrid>
			<NGridItem>
				<NCard>
					<NGradientText :size="40">
						{{ store.count }}
					</NGradientText>
					<br />
					<NButton @click="store.increment">
						<NIcon size="40" :component="PlusFilled"></NIcon>
					</NButton>
				</NCard>
			</NGridItem>

			<NGridItem>
				<NCard>
					<NGradientText :size="40">
						{{ store.count }}
					</NGradientText>
				</NCard>
			</NGridItem>
		</NGrid>
		<!-- style to body -->
		<NGlobalStyle></NGlobalStyle>
	</NConfigProvider>
</template>
