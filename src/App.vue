<script setup lang="ts">
	import Pomodoro from "./components/Pomodoro.vue";
	import Todo from "./components/Todo.vue";

	import {
		NGrid,
		NGridItem,
		NGlobalStyle,
		NConfigProvider,
		darkTheme,
	} from "naive-ui";
</script>

<template>
	<NConfigProvider :theme="darkTheme">
		<NGrid :cols="2" :xGap="8">
			<NGridItem>
				<Todo></Todo>
			</NGridItem>

			<NGridItem>
				<Pomodoro></Pomodoro>
			</NGridItem>
		</NGrid>
		<!-- style to body -->
		<NGlobalStyle></NGlobalStyle>
	</NConfigProvider>
</template>
