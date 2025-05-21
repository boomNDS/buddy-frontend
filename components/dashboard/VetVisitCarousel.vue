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
            <VetVisitCard :item="item" :idx="idx" />
        </template>
    </CarouselWrapper>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { VetVisitItem } from "~/composables/useVetVisitItems";
import { useVetVisitItems } from "~/composables/useVetVisitItems";

const props = defineProps({
    title: { type: String, default: "Vet Visits" },
    icon: { type: String, default: "mdi:pet" },
    iconLabel: { type: String, default: "Vet Visits" },
    items: { type: Array as () => VetVisitItem[], default: () => [] },
    hideDots: { type: Boolean, default: false },
    showEdit: { type: Boolean, default: true },
});

const itemsToDisplay = computed(() => useVetVisitItems(props.items).value);
</script>

<style scoped></style>
