<template>
    <div class="flex items-center gap-2 mx-2 my-5">
        <Icon
            name="line-md:arrow-left"
            class="bg-[#425F58] w-6 h-6 cursor-pointer"
            @click="router.back()"
        />
        <h1 class="text-lg text-[#425F58]">Add Vet Visit</h1>
    </div>

    <Form
        class="flex flex-col w-full px-4 space-y-2"
        :validation-schema="formSchema"
        @submit="onSubmit"
    >
        <FormField name="clinic">
            <FormItem>
                <FormLabel>Vet Clinic</FormLabel>
                <FormControl>
                    <Select v-model="form.values.clinic">
                        <SelectTrigger class="w-full bg-white">
                            <SelectValue placeholder="Select a clinic" />
                        </SelectTrigger>
                        <SelectContent class="max-h-60 overflow-auto">
                            <SelectGroup>
                                <SelectItem value="clinic-a"
                                    >Clinic A</SelectItem
                                >
                                <SelectItem value="clinic-b"
                                    >Clinic B</SelectItem
                                >
                                <SelectItem value="clinic-c"
                                    >Clinic C</SelectItem
                                >
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>

        <FormField name="date">
            <FormItem class="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                    <PopoverTrigger as-child>
                        <FormControl>
                            <Button
                                variant="outline"
                                class="w-full justify-start bg-white text-left font-normal"
                            >
                                {{
                                    form.values.date
                                        ? df.format(dayjs(form.values.date))
                                        : "Pick a date"
                                }}
                                <CalendarIcon
                                    class="ms-auto h-4 w-4 opacity-50"
                                />
                            </Button>
                            <input hidden />
                        </FormControl>
                    </PopoverTrigger>
                    <PopoverContent class="w-auto p-0">
                        <Calendar
                            v-model="form.values.date"
                            calendar-label="Visit Date"
                            initial-focus
                            :min-value="new CalendarDate(2000, 1, 1)"
                            :max-value="today(getLocalTimeZone())"
                            @update:model-value="
                                (v) => (form.values.date = v || '')
                            "
                        />
                    </PopoverContent>
                </Popover>
                <FormMessage />
            </FormItem>
        </FormField>

        <FormField name="time">
            <FormItem>
                <FormLabel>Time</FormLabel>
                <FormControl>
                    <Input
                        type="time"
                        v-model="form.values.time"
                        class="w-full bg-white"
                    />
                </FormControl>
            </FormItem>
        </FormField>

        <div class="flex flex-col gap-2 pt-4 mt-[18rem]">
            <Button variant="green" type="submit" class="w-full">Save</Button>
            <Button variant="ghost" class="w-full" @click="router.back()">
                Cancel
            </Button>
        </div>
    </Form>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	CalendarDate,
	DateFormatter,
	getLocalTimeZone,
	today,
} from "@internationalized/date";
import { toTypedSchema } from "@vee-validate/zod";
import dayjs from "dayjs";
import { CalendarIcon } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";
import * as z from "zod";

const df = new DateFormatter("en-US", { dateStyle: "long" });
const router = useRouter();

const formSchema = toTypedSchema(
	z.object({
		clinic: z.string().min(1, "Please select a vet clinic"),
		date: z.string().min(1, "Please select a date"),
		time: z.string().min(1, "Please select a time"),
	}),
);

const form = useForm({
	validationSchema: formSchema,
	initialValues: { clinic: "", date: "", time: "" },
});

const onSubmit = form.handleSubmit((values) => {
	console.log({
		clinic: values.clinic,
		date: values.date,
		time: form.values.time,
	});
});
</script>
