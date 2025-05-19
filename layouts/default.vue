<template>
    <main
        class="flex justify-center items-center w-screen h-screen bg-[#F3F4F6]"
    >
        <div
            :class="[
                'bg-[#FFF9F3] overflow-auto transition-all',
                isDesktop
                    ? 'w-full max-w-[375px] h-full max-h-[812px] shadow-xl border-6 border-gray-700 rounded-lg m-auto'
                    : 'w-screen h-screen',
            ]"
        >
            <slot />
        </div>
    </main>
</template>

<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";

const isDesktop = useMediaQuery("(min-width: 1024px)", {
	// avoid hydration mismatch in SSR
	ssrWidth: 768,
});
</script>

<style scoped>
.transition-all {
    transition: all 0.3s ease-in-out;
}
</style>
