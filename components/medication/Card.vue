<template>
    <div class="flex flex-col space-y-2">
        <div class="flex justify-between text-[12px]">
            <span class="font-[400] text-gray-500">Name</span>
            <span class="font-[600]">{{ item.name }}</span>
        </div>
        <div class="flex justify-between text-[12px]">
            <span class="font-[400] text-gray-500">Dosage</span>
            <span class="font-[600]">{{ item.dosage }}</span>
        </div>
        <div class="flex justify-between text-[12px]">
            <span class="font-[400] text-gray-500">Frequency</span>
            <span class="font-[600]">{{ item.frequency }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { MedicationItem } from "~/composables/useDefaultItems";

defineProps<{
	item: MedicationItem;
}>();
</script>
