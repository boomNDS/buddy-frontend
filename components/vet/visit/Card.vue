<template>
    <div class="flex space-x-4 py-2">
        <NuxtImg
            :src="item.imageSrc"
            class="w-12 h-12 rounded-full object-cover"
            :alt="`${item.hospitalName} Logo`"
        />
        <div class="flex-1">
            <div class="flex items-center space-x-2 mb-1">
                <Badge :variant="badgeVariant">
                    <span class="text-[8px]">{{ displayLabel }}</span>
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

interface VetVisitItem {
	imageSrc: string;
	hospitalName: string;
	appointmentDate: string; // ISO
	status?: "pending" | "completed" | "cancelled";
	statusLabel?: string;
}

const { $dayjs: dayjs } = useNuxtApp();

const props = defineProps({
	item: {
		type: Object as PropType<VetVisitItem>,
		required: true,
	},
});

const formattedDate = computed(() =>
	dayjs(props.item.appointmentDate).format("DD MMM, YYYY"),
);

const { displayLabel, badgeVariant } = (() => {
	const appt = dayjs(props.item.appointmentDate);
	const now = dayjs();
	const diff = appt.diff(now, "day");

	return {
		displayLabel: computed(() => {
			if (props.item.status === "completed") return "Completed";
			if (props.item.status === "cancelled") return "Cancelled";
			if (diff > 0) return `In ${diff} day${diff > 1 ? "s" : ""}`;
			if (diff === 0) return "Today";
			const daysLate = Math.abs(diff);
			return `Late ${daysLate} day${daysLate > 1 ? "s" : ""}`;
		}),
		badgeVariant: computed(() => {
			if (props.item.status === "completed") return "secondary";
			if (props.item.status === "cancelled") return "outline";
			if (diff < 0) return "destructive";
			return "orange";
		}),
	};
})();
</script>

<style scoped></style>
