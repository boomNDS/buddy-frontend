<template>
    <div class="mt-10 mb-4 relative text-white">
        <div class="overflow-hidden px-4">
            <img
                src="/images/navbar_curve.svg"
                alt="Navbar Curve"
                class="w-full block"
            />
        </div>

        <div
            class="absolute inset-x-4 top-0 mt-6 flex items-center justify-between px-12"
        >
            <NuxtLink to="/my-pets" class="flex flex-col items-center gap-1">
                <NuxtImg
                    src="https://placehold.co/24x24"
                    class="w-6 h-6 rounded-full p-0.5 border border-white"
                    alt="My Pets"
                />
                <span class="text-xs">My Pets</span>
            </NuxtLink>

            <NuxtLink to="/profile" class="flex flex-col items-center gap-1">
                <Icon
                    name="iconoir:profile-circle"
                    class="w-5 h-5"
                    aria-label="Profile"
                />
                <span class="text-xs">Profile</span>
            </NuxtLink>
        </div>

        <div class="absolute inset-x-0 -top-10 mt-2 flex justify-center">
            <NuxtLink
                to="/new-visit"
                class="flex items-center justify-center w-14 h-14 rounded-full bg-[#F57154] text-white shadow-[0_15px_30px_rgba(0,0,0,0.3)] border-5 border-[#FFF9F3]"
            >
                <PlusIcon class="w-7 h-7" />
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PlusIcon } from "lucide-vue-next";
</script>

<style scoped></style>
