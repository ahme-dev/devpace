<script setup lang="ts">
	import { PlayArrowFilled } from "@vicons/material";
	import {
		NCard,
		NText,
		NSpace,
		NSlider,
		NGrid,
		NGridItem,
		NTimeline,
		NTimelineItem,
		NButton,
		NIcon,
	} from "naive-ui";
</script>

<template>
	<NCard>
		<NGrid :cols="2">
			<NGridItem>
				<NSpace vertical :size="40">
					<NText size="large" type="primary">do</NText>
					<NSlider></NSlider>
					<NSlider></NSlider>
					<NSlider></NSlider>
					<NSlider></NSlider>

					<NText> Something about your session </NText>

					<NButton style="margin-top: 1rem">
						<template #icon>
							<NIcon> <PlayArrowFilled></PlayArrowFilled> </NIcon>
						</template>
						Start
					</NButton>
				</NSpace>
			</NGridItem>
			<NGridItem>
				<NSpace justify="center" style="overflow: auto">
					<NTimeline>
						<NTimelineItem content="Something" time="22:00" />
						<NTimelineItem content="Something" time="22:00" />
					</NTimeline>
				</NSpace>
			</NGridItem>
		</NGrid>
	</NCard>
</template>
