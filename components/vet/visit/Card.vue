<template>
    <div class="flex space-y-2">
        <NuxtImg
            :src="item.imageSrc"
            class="w-12 h-12 rounded-full object-cover"
            :alt="`${item.hospitalName} Logo`"
        />
        <div class="flex-1">
            <div class="flex items-center space-x-2 mb-1">
                <Badge
                    :variant="item.status === 'completed' ? 'green' : 'orange'"
                >
                    <span class="text-[8px]">{{
                        item.statusLabel || "2 Days Ago"
                    }}</span>
                </Badge>
            </div>
            <h5 class="text-[12px] font-[600] text-gray-800">
                {{ item.hospitalName }}
            </h5>
            <span class="text-[10px] text-gray-500">{{ formattedDate }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { PropType } from "vue";
import { useNuxtApp } from "#app";

const { $dayjs: dayjs } = useNuxtApp();

interface VetCardItem {
	imageSrc: string;
	hospitalName: string;
	status: "pending" | "completed";
	statusLabel: string;
	date: string; // ISO date string
}

const props = defineProps({
	item: {
		type: Object as PropType<VetCardItem>,
		required: true,
	},
});

const formattedDate = computed(() => {
	return dayjs(props.item.date).format("DD MMM, YYYY");
});
</script>

<style scoped></style>
