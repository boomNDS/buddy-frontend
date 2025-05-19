<template>
    <nav class="app-navbar px-4 py-3 flex items-center justify-between">
        <NuxtLink
            to="/my-pets"
            class="flex flex-col items-center gap-1"
            :class="{ 'text-primary': route.path === '/my-pets' }"
        >
            <PawPrintIcon class="w-6 h-6" />
            <span class="text-xs">My Pets</span>
        </NuxtLink>

        <div class="relative -mt-8">
            <NuxtLink
                to="/new-visit"
                class="flex items-center justify-center w-14 h-14 rounded-full bg-[#F57154] text-white shadow-lg"
            >
                <PlusIcon class="w-7 h-7" />
            </NuxtLink>
        </div>

        <NuxtLink
            to="/profile"
            class="flex flex-col items-center gap-1"
            :class="{ 'text-primary': route.path === '/profile' }"
        >
            <UserIcon class="w-6 h-6" />
            <span class="text-xs">Profile</span>
        </NuxtLink>
    </nav>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

import { PawPrintIcon, PlusIcon, UserIcon } from "lucide-vue-next";
const route = useRoute();
</script>
