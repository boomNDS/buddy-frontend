<template>
    <div class="mx-2 my-5">
        <div class="flex items-center gap-2">
            <Icon
                name="line-md:arrow-left"
                class="bg-[#425F58] w-6 h-6 cursor-pointer rounded"
                @click="router.back()"
                aria-label="Go back"
            />
            <h1 class="text-xl font-semibold text-[#425F58]">Profile</h1>
        </div>

        <div
            class="mt-16 flex flex-col items-center justify-center text-gray-500 space-y-4"
        >
            <Icon
                name="heroicons-outline:inbox"
                class="w-12 h-12"
                aria-hidden="true"
            />
            <p class="text-sm">No data to display</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style scoped></style>
