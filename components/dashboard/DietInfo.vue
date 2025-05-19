<template>
    <div>
        <div class="flex justify-between items-center my-4 mx-5">
            <div class="flex items-center gap-2">
                <div
                    class="bg-linear-65 from-[#425F58] to-[#89C5B6] w-[22px] h-[22px] rounded-sm flex items-center justify-center"
                >
                    <Icon
                        :name="icon"
                        class="w-[16px] h-[16px] bg-white"
                        :aria-label="iconLabel"
                    />
                </div>
                <h2 class="text-[16px] font-semibold">
                    {{ title }}
                </h2>
            </div>

            <Icon
                name="basil:edit-outline"
                class="w-[16px] h-[16px] cursor-pointer transform transition-transform duration-500 ease-in-out hover:scale-[0.98]"
                :aria-label="`Edit ${title}`"
            />
        </div>

        <section class="mx-5">
            <BuddyCard>
                <div
                    v-for="(field, index) in fields"
                    :key="index"
                    class="flex items-center justify-between mx-2 mb-2 last:mb-0"
                >
                    <h6 class="text-[12px] text-[#425F58] font-400">
                        {{ field.label }}
                    </h6>
                    <p class="text-[12px] text-[#36414F] font-600">
                        {{ field.value }}
                    </p>
                </div>
            </BuddyCard>
        </section>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

interface Field {
    label: string;
    value: string;
}

defineProps<{
    title: string;
    icon: string;
    iconLabel?: string;
    fields: Field[];
    showEdit?: boolean;
}>();
</script>

<style scoped></style>
