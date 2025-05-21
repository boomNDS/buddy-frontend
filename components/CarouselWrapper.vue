<template>
    <div>
        <div class="flex justify-between items-center my-4 mx-5">
            <div class="flex items-center gap-2">
                <div
                    class="bg-gradient-to-br from-[#425F58] to-[#89C5B6] w-6 h-6 rounded-sm flex items-center justify-center"
                >
                    <Icon
                        :name="icon"
                        class="w-4 h-4 text-white"
                        :aria-label="iconLabel"
                    />
                </div>
                <h2 class="text-base font-semibold">{{ title }}</h2>
            </div>
            <Icon
                v-if="showEdit"
                name="mdi:plus"
                class="w-[16px] h-[16px] cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110"
                :aria-label="`Edit ${title}`"
            />
        </div>

        <section class="px-5">
            <div>
                <div
                    ref="slider"
                    class="flex space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory touch-pan-x -webkit-overflow-scrolling-touch cursor-grab active:cursor-grabbing"
                    @scroll="onScroll"
                    @wheel.prevent="onWheel"
                    @mousedown="onDragStart"
                    @mousemove="onDragMove"
                    @mouseup="onDragEnd"
                    @mouseleave="onDragEnd"
                >
                    <div
                        v-for="(item, idx) in items"
                        :key="idx"
                        class="flex-shrink-0 w-64 snap-start mb-2"
                    >
                        <div
                            class="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between h-full"
                        >
                            <slot :item="item" :idx="idx">
                                <div class="text-center text-gray-700">
                                    {{ item }}
                                </div>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>

            <div
                v-if="!hideDots"
                class="mt-4 flex justify-center items-center gap-3"
            >
                <button
                    v-for="(_, dotIdx) in items.length"
                    :key="dotIdx"
                    @click="goTo(dotIdx)"
                    class="w-2 h-2 rounded-full transition-all"
                    :class="
                        current === dotIdx
                            ? 'bg-[#F57154] w-3 h-3'
                            : 'bg-gray-300'
                    "
                    :aria-label="`Go to slide ${dotIdx + 1}`"
                />
            </div>
        </section>
    </div>
</template>

<script setup lang="ts" generic="T">
import { ref, onMounted } from "vue";
import { useElementSize } from "@vueuse/core";

const props = defineProps<{
    title: string;
    icon: string;
    iconLabel: string;
    items: T[];
    hideDots: boolean;
    showEdit: boolean;
}>();

const items = ref(props.items);
const slider = ref<HTMLElement | null>(null);
const current = ref(0);
const { width: sliderWidth } = useElementSize(slider);

function onWheel(e: WheelEvent) {
    slider?.value?.scrollBy({ left: e.deltaY, behavior: "smooth" });
}

let isDragging = false;
let startX = 0;
let scrollStart = 0;

function onDragStart(e: MouseEvent) {
    if (!slider.value) return;
    isDragging = true;
    slider.value.classList.add("cursor-grabbing");
    startX = e.pageX - slider.value.offsetLeft;
    scrollStart = slider.value.scrollLeft;
}

function onDragMove(e: MouseEvent) {
    if (!isDragging || !slider.value) return;
    e.preventDefault();
    const x = e.pageX - slider.value.offsetLeft;
    const walk = x - startX;
    slider.value.scrollLeft = scrollStart - walk;
}

function onDragEnd() {
    if (!slider.value) return;
    isDragging = false;
    slider.value.classList.remove("cursor-grabbing");
}

function goTo(idx: number) {
    slider?.value?.scrollTo({
        left: idx * sliderWidth.value,
        behavior: "smooth",
    });
}

function onScroll() {
    if (!slider.value) return;
    const newIndex = Math.round(slider.value.scrollLeft / sliderWidth.value);
    current.value = Math.min(Math.max(newIndex, 0), items.value.length - 1);
}

onMounted(() => {
    setTimeout(onScroll, 50);
});
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
.touch-pan-x {
    touch-action: pan-x;
}
.cursor-grab {
    cursor: grab;
}
.cursor-grabbing {
    cursor: grabbing;
}
</style>
