<template>
    <div>
        <div class="flex justify-between items-center my-4 mx-5">
            <div class="flex items-center gap-2">
                <div
                    class="bg-gradient-to-br from-[#425F58] to-[#89C5B6] w-[22px] h-[22px] rounded-sm flex items-center justify-center"
                >
                    <Icon
                        :name="icon"
                        class="w-[16px] h-[16px] text-white"
                        :aria-label="iconLabel"
                    />
                </div>
                <h2 class="text-[16px] font-semibold">
                    {{ title }}
                </h2>
            </div>

            <Icon
                v-if="showEdit"
                name="mdi:plus"
                class="w-[16px] h-[16px] cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-110"
                @click="$emit('edit')"
                :aria-label="`Edit ${title}`"
            />
        </div>

        <section class="mx-5">
            <div class="mx-auto">
                <div
                    ref="slider"
                    class="overflow-x-auto scroll-snap-x mandatory scrollbar-hide flex space-x-4"
                    @scroll="onScroll"
                >
                    <div
                        v-for="(item, idx) in items"
                        :key="idx"
                        class="flex-shrink-0 w-full scroll-snap-start"
                    >
                        <div
                            class="bg-white rounded-xl shadow-sm border border-gray-100 p-4"
                        >
                            <div class="grid grid-cols-2 gap-4">
                                <div class="space-y-1">
                                    <div class="text-sm text-gray-500">
                                        Name
                                    </div>
                                    <div class="font-medium">
                                        {{
                                            item.name || `Medication ${idx + 1}`
                                        }}
                                    </div>
                                </div>
                                <div class="space-y-1">
                                    <div class="text-sm text-gray-500">
                                        Dosage
                                    </div>
                                    <div class="font-medium text-right">
                                        {{
                                            item.dosage || `${(idx + 1) * 5} mg`
                                        }}
                                    </div>
                                </div>
                                <div class="space-y-1">
                                    <div class="text-sm text-gray-500">
                                        Frequency
                                    </div>
                                    <div class="font-medium">
                                        {{
                                            item.frequency ||
                                            `${idx + 1} time per day`
                                        }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-4 flex items-center justify-between">
                    <button
                        @click="prev"
                        aria-label="Previous"
                        class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none transition-colors"
                    >
                        <Icon name="heroicons:chevron-left" class="w-4 h-4" />
                    </button>

                    <div
                        v-if="!hideDots"
                        class="flex items-center justify-center gap-2"
                    >
                        <button
                            v-for="(_, index) in items.length"
                            :key="index"
                            @click="goTo(index)"
                            class="relative h-2 w-2 rounded-full transition-all duration-300"
                            :class="[
                                current === index
                                    ? 'bg-[#F57154]'
                                    : 'bg-gray-200',
                            ]"
                            :aria-label="`Go to slide ${index + 1}`"
                        />
                    </div>

                    <button
                        @click="next"
                        aria-label="Next"
                        class="p-2 rounded-full bg-gray-100 hover:bg-gray-200 focus:outline-none transition-colors"
                    >
                        <Icon name="heroicons:chevron-right" class="w-4 h-4" />
                    </button>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useElementSize } from "@vueuse/core";
import { computed, onMounted, ref } from "vue";

interface MedicationItem {
    name?: string;
    dosage?: string;
    frequency?: string;
    [key: string]: unknown;
}

const props = defineProps({
    title: {
        type: String,
        default: "Medications",
    },
    icon: {
        type: String,
        default: "mdi:pill",
    },
    iconLabel: {
        type: String,
        default: "Medication",
    },
    items: {
        type: Array as () => MedicationItem[],
        default: () => [],
    },
    showEdit: {
        type: Boolean,
        default: false,
    },
    hideDots: {
        type: Boolean,
        default: false,
    },
});

// Carousel state
const defaultItems = computed(() => {
    if (Array.isArray(props.items) && props.items.length > 0) {
        return props.items;
    }
    return Array.from({ length: 3 }, (_, i) => ({
        name: `Medication ${i + 1}`,
        dosage: `${(i + 1) * 5} mg`,
        frequency: `${i + 1} time per day`,
    }));
});

const items = ref(defaultItems.value);
const slider = ref<HTMLElement | null>(null);
const current = ref(0);
const { width: sliderWidth } = useElementSize(slider);

const goTo = (idx: number) => {
    if (!slider.value) return;
    const itemWidth = sliderWidth.value;
    slider.value.scrollTo({ left: idx * itemWidth, behavior: "smooth" });
};

const prev = () => {
    const idx = current.value > 0 ? current.value - 1 : items.value.length - 1;
    goTo(idx);
};

const next = () => {
    const idx = current.value < items.value.length - 1 ? current.value + 1 : 0;
    goTo(idx);
};

const onScroll = () => {
    const sliderEl = slider.value;
    if (!sliderEl) return;

    const scrollPosition = sliderEl.scrollLeft;
    const itemWidth = sliderWidth.value;

    if (itemWidth === 0) return;

    const newIndex = Math.round(scrollPosition / itemWidth);
    current.value = Math.max(0, Math.min(newIndex, items.value.length - 1));
};

onMounted(() => {
    // Initialize the carousel
    setTimeout(() => {
        onScroll();
    }, 100);
});

defineEmits(["edit"]);
</script>

<style scoped>
.scroll-snap-x {
    scroll-snap-type: x mandatory;
}
.scroll-snap-start {
    scroll-snap-align: start;
}
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>
