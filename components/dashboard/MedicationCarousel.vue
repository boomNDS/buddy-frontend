<template>
    <CarouselWrapper
        :title="title"
        :icon="icon"
        :iconLabel="iconLabel"
        :items="itemsToDisplay"
        :hideDots="hideDots"
        :showEdit="showEdit"
    >
        <template #default="{ item, idx }">
            <MedicationCard :item="item" :idx="idx" />
        </template>
    </CarouselWrapper>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { MedicationItem } from "~/composables/useDefaultItems";
import { useDefaultItems } from "~/composables/useDefaultItems";

const props = defineProps({
	title: { type: String, default: "Medications" },
	icon: { type: String, default: "mdi:pill" },
	iconLabel: { type: String, default: "Medication" },
	items: { type: Array as () => MedicationItem[], default: () => [] },
	hideDots: { type: Boolean, default: false },
	showEdit: { type: Boolean, default: true },
});

const itemsToDisplay = computed(() => useDefaultItems(props.items).value);
</script>

<style scoped></style>
