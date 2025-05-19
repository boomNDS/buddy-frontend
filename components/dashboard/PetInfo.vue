<template>
    <div>
        <div class="flex justify-between items-center my-4 mx-5">
            <h2 class="text-[16px] font-semibold">{{ title }}</h2>
            <Icon
                v-if="showEdit"
                name="basil:edit-outline"
                class="w-[16px] h-[16px] cursor-pointer transform transition-transform duration-500 ease-in-out hover:scale-[0.98]"
                @click="$emit('edit')"
                aria-label="Edit {{ title }}"
            />
        </div>
        <section>
            <div class="grid grid-cols-3 grid-rows-2 gap-[10px] mx-5">
                <BuddyCard v-for="(field, idx) in fields" :key="idx">
                    <h6 class="text-[8px] text-[#959595] font-medium">
                        {{ field.label }}
                    </h6>
                    <p class="text-[9px] text-[#36414F]">
                        {{ field.value }}
                    </p>
                </BuddyCard>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps<{
    title: string;
    fields: { label: string; value: string }[];
    showEdit?: boolean;
}>();
</script>

<style scoped>
/* Add any scoped styles if needed */
</style>
