<template>
    <div class="relative w-full">
        <input
            type="text"
            :value="displayValue"
            class="py-2.5 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-[#425F58] focus:ring-1 focus:ring-[#425F58] disabled:opacity-50 disabled:pointer-events-none bg-white"
            placeholder="HH:MM"
            readonly
            @click="isOpen = !isOpen"
        />

        <div class="absolute inset-y-0 end-0 flex items-center pe-3">
            <button
                type="button"
                class="size-7 inline-flex justify-center items-center rounded-full bg-white text-gray-500 hover:bg-gray-100"
                @click="isOpen = !isOpen"
            >
                <span class="sr-only">Open time picker</span>
                <svg
                    class="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
            </button>
        </div>

        <!-- Time Picker Dropdown -->
        <div
            v-if="isOpen"
            class="absolute z-10 mt-1 bg-white border border-gray-200 shadow-lg rounded-lg w-[100px]"
        >
            <div class="flex flex-row divide-x divide-gray-200">
                <div class="p-1 max-h-56 overflow-y-auto">
                    <div v-for="hour in 24" :key="`hour-${hour - 1}`">
                        <button
                            type="button"
                            class="w-10 p-1.5 text-center text-sm rounded-md"
                            :class="[
                                selectedHour ===
                                (hour - 1).toString().padStart(2, '0')
                                    ? 'bg-[#425F58] text-white'
                                    : 'text-gray-800 hover:bg-gray-100',
                            ]"
                            @click="
                                selectHour(
                                    (hour - 1).toString().padStart(2, '0'),
                                )
                            "
                        >
                            {{ (hour - 1).toString().padStart(2, "0") }}
                        </button>
                    </div>
                </div>

                <div class="p-1 max-h-56 overflow-y-auto">
                    <div
                        v-for="minute in minuteOptions"
                        :key="`minute-${minute}`"
                    >
                        <button
                            type="button"
                            class="w-10 p-1.5 text-center text-sm rounded-md"
                            :class="[
                                selectedMinute === minute
                                    ? 'bg-[#425F58] text-white'
                                    : 'text-gray-800 hover:bg-gray-100',
                            ]"
                            @click="selectMinute(minute)"
                        >
                            {{ minute }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from "vue";

const props = defineProps<{
    modelValue: string;
    name?: string;
}>();

const emit = defineEmits<{
    "update:modelValue": [value: string];
}>();

const isOpen = ref(false);
const selectedHour = ref("");
const selectedMinute = ref("");

const minuteOptions = [
    "00",
    "05",
    "10",
    "15",
    "20",
    "25",
    "30",
    "35",
    "40",
    "45",
    "50",
    "55",
];

const displayValue = computed(() => {
    if (selectedHour.value && selectedMinute.value) {
        return `${selectedHour.value}:${selectedMinute.value}`;
    }
    return props.modelValue || "";
});

const parseInitialValue = () => {
    if (props.modelValue) {
        const [hour, minute] = props.modelValue.split(":");
        selectedHour.value = hour;

        if (minute) {
            const minuteNum = Number.parseInt(minute, 10);
            const closestMinute = minuteOptions.reduce((prev, curr) => {
                return Math.abs(Number.parseInt(curr, 10) - minuteNum) <
                    Math.abs(Number.parseInt(prev, 10) - minuteNum)
                    ? curr
                    : prev;
            });
            selectedMinute.value = closestMinute;
        }
    }
};

const selectHour = (hour: string) => {
    selectedHour.value = hour;
    if (!selectedMinute.value) {
        selectedMinute.value = "00";
    }
    updateValue();
};

const selectMinute = (minute: string) => {
    selectedMinute.value = minute;
    if (!selectedHour.value) {
        selectedHour.value = "00";
    }
    updateValue();
};

const updateValue = () => {
    if (selectedHour.value && selectedMinute.value) {
        const timeValue = `${selectedHour.value}:${selectedMinute.value}`;
        emit("update:modelValue", timeValue);
        isOpen.value = false;
    }
};

const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const timePickerElement = document.querySelector(".time-picker");
    if (timePickerElement && !timePickerElement.contains(target)) {
        isOpen.value = false;
    }
};

onMounted(() => {
    parseInitialValue();
    document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});

watch(() => props.modelValue, parseInitialValue);
</script>

<style scoped>
::-webkit-scrollbar {
    width: 4px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
}

.overflow-y-auto {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: thin; /* Firefox */
    scrollbar-color: rgba(0, 0, 0, 0.1) transparent;
}
</style>
