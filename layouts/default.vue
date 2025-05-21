<template>
    <main
        class="flex justify-center items-center w-screen h-screen bg-[#F3F4F6]"
    >
        <div
            :class="[
                'bg-[#FFF9F3] transition-all overflow-hidden relative',
                isDesktop
                    ? 'w-full max-w-[375px] h-full max-h-[812px] shadow-xl border border-gray-700 rounded-lg'
                    : 'w-screen h-screen',
            ]"
        >
            <div class="overflow-auto h-full pb-36">
                <slot />
            </div>

            <div class="absolute bottom-0 left-0 right-0">
                <LayoutNavbar />
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";

const isDesktop = useMediaQuery("(min-width: 1024px)", {
	ssrWidth: 768,
});
</script>

<style scoped>
.transition-all {
    transition: all 0.3s ease-in-out;
}
</style>
