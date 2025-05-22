<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="[
          'w-full justify-start text-left font-normal',
          !modelValue && 'text-muted-foreground'
        ]"
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ modelValue ? dayjs(modelValue).format('MMMM D, YYYY') : placeholder }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar
        :model-value="modelValue ? dayjs(modelValue).toDate() : undefined"
        @update:model-value="(date: any) => {
          if (date) {
            $emit('update:modelValue', dayjs(date).format('YYYY-MM-DD'));
          }
        }"
        class="border-0"
      />
    </PopoverContent>
  </Popover>
</template>

<script setup lang="ts">
import { useDayjs } from '#imports';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-vue-next';

const dayjs = useDayjs();

defineOptions({
  inheritAttrs: false,
});

defineProps<{
  modelValue?: string;
  placeholder?: string;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>