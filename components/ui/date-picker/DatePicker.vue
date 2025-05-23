<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button
                variant="outline"
                :class="
                    cn(
                        'w-full justify-start text-left font-normal',
                        !modelValue && 'text-muted-foreground',
                    )
                "
            >
                <CalendarIcon class="mr-2 h-4 w-4" />
                <span>
                    {{
                        modelValue
                            ? dayjs(modelValue).format(formatString)
                            : "Pick a date"
                    }}
                </span>
            </Button>
        </PopoverTrigger>

        <PopoverContent class="w-auto p-0">
            <Calendar
                mode="single"
                v-model:selected="modelValue"
                initial-focus
                :min-value="minDate"
                :max-value="maxDate"
            />
        </PopoverContent>
    </Popover>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useDayjs } from "#imports";
import { useVModel } from "@vueuse/core";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const dayjs = useDayjs();

const props = defineProps({
    modelValue: { type: String, default: "" },
    defaultValue: { type: String, default: "" },
    min: { type: String, default: "" },
    max: { type: String, default: "" },
    formatString: { type: String, default: "MMM D, YYYY" },
});

const emits = defineEmits<{
    "update:modelValue": (v: string) => void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
    defaultValue: props.defaultValue,
    passive: true,
});

const minDate = computed<CalendarDate | undefined>(() => {
    if (!props.min) return undefined;
    const [y, m, d] = props.min.split("-").map(Number) as [
        number,
        number,
        number,
    ];
    return new CalendarDate(y, m, d);
});
const maxDate = computed<CalendarDate>(() => {
    if (props.max) {
        const [y, m, d] = props.max.split("-").map(Number) as [
            number,
            number,
            number,
        ];
        return new CalendarDate(y, m, d);
    }
    return today(getLocalTimeZone());
});
</script>

<style scoped>
/* no extra styles */
</style>
