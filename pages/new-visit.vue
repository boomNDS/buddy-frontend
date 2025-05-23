<template>
    <div class="flex flex-col w-full">
        <div class="flex items-center gap-2 mx-2 my-5">
            <Icon
                name="line-md:arrow-left"
                class="bg-[#425F58] w-6 h-6 cursor-pointer"
                @click="router.back()"
            />
            <h1 class="text-lg text-[#425F58]">Add Vet Visit</h1>
        </div>

        <div
            v-if="error"
            class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 mx-4 mb-4 rounded-md shadow-sm flex items-center"
        >
            <Icon
                name="heroicons:exclamation-circle"
                class="w-5 h-5 mr-2 text-red-500"
            />
            <span>{{ error }}</span>
        </div>

        <div
            v-if="isLoading"
            class="flex flex-col justify-center items-center my-12"
        >
            <div
                class="inline-block animate-spin rounded-full h-10 w-10 border-4 border-t-[#425F58] border-r-transparent border-b-[#425F58] border-l-transparent mb-3"
            ></div>
            <span class="text-gray-600 font-medium">Loading clinics...</span>
        </div>

        <form
            v-if="!isLoading"
            class="flex flex-col w-full px-4 space-y-5"
            @submit.prevent="onSubmit"
        >
            <div class="space-y-2">
                <Label for="clinic" class="text-sm font-medium text-gray-700"
                    >Vet Clinic</Label
                >
                <Select v-model="formData.clinic">
                    <SelectTrigger
                        class="w-full bg-white focus:border-[#425F58] focus:ring-1 focus:ring-[#425F58]"
                    >
                        <SelectValue placeholder="Select a clinic" />
                    </SelectTrigger>
                    <SelectContent class="max-h-60 overflow-auto">
                        <SelectGroup>
                            <SelectItem
                                v-for="clinic in clinics"
                                :key="clinic.id"
                                :value="clinic.id.toString()"
                            >
                                {{ clinic.name }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <p
                    v-if="errors.clinic"
                    class="text-sm text-red-500 mt-1 flex items-center"
                >
                    <Icon
                        name="heroicons:exclamation-circle"
                        class="w-4 h-4 mr-1"
                    />
                    {{ errors.clinic }}
                </p>
            </div>

            <div class="space-y-2">
                <Label for="date" class="text-sm font-medium text-gray-700"
                    >Date</Label
                >
                <DatePicker label="Visit Date" v-model="formData.date" />
                <p
                    v-if="errors.date"
                    class="text-sm text-red-500 mt-1 flex items-center"
                >
                    <Icon
                        name="heroicons:exclamation-circle"
                        class="w-4 h-4 mr-1"
                    />
                    {{ errors.date }}
                </p>
            </div>

            <div class="space-y-2">
                <Label for="time" class="text-sm font-medium text-gray-700"
                    >Time</Label
                >
                <div class="time-picker">
                    <TimePicker v-model="formData.time" />
                </div>
                <p
                    v-if="errors.time"
                    class="text-sm text-red-500 mt-1 flex items-center"
                >
                    <Icon
                        name="heroicons:exclamation-circle"
                        class="w-4 h-4 mr-1"
                    />
                    {{ errors.time }}
                </p>
            </div>

            <!-- <div class="space-y-2">
                <Label for="notes" class="text-sm font-medium text-gray-700"
                    >Notes</Label
                >
                <textarea
                    id="notes"
                    v-model="formData.notes"
                    placeholder="Additional notes for the vet visit"
                    class="flex min-h-[80px] w-full rounded-md border border-input bg-white px-4 py-2 text-sm placeholder:text-gray-400 focus:border-[#425F58] focus:ring-1 focus:ring-[#425F58] outline-none transition-colors resize-none"
                ></textarea>
            </div> -->

            <div class="flex flex-col gap-3 pt-4 mt-[12rem]">
                <Button
                    type="submit"
                    class="w-full bg-[#425F58] hover:bg-[#354a45] border-none shadow-sm py-6 text-white font-medium text-base rounded-md transition-all duration-200 flex items-center justify-center"
                    :disabled="isSubmitting"
                    :class="{ 'opacity-70 cursor-not-allowed': isSubmitting }"
                >
                    <div class="flex items-center">
                        <Icon
                            v-if="isSubmitting"
                            name="line-md:loading-twotone-loop"
                            class="w-5 h-5 mr-2 animate-spin"
                        />
                        <span>{{
                            isSubmitting ? "Saving..." : "Save Vet Visit"
                        }}</span>
                    </div>
                </Button>
                <Button
                    variant="ghost"
                    class="w-full text-[#425F58] py-6 rounded-md hover:bg-[#f0f5f4] transition-all duration-200 font-medium text-base"
                    @click="router.back()"
                    :disabled="isSubmitting"
                >
                    Cancel
                </Button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { TimePicker } from "@/components/ui/time-picker";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useVetVisitForm } from "~/composables/useVetVisitForm";

const router = useRouter();
const {
	isLoading,
	clinics,
	formData,
	errors,
	error,
	isSubmitting,
	loadClinics,
	onSubmit,
} = useVetVisitForm();

onMounted(loadClinics);
</script>
