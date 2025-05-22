<template>
    <div
        v-if="isLoading"
        class="flex flex-col justify-center items-center my-12"
    >
        <div
            class="inline-block animate-spin rounded-full h-10 w-10 border-4 border-t-[#425F58] border-r-transparent border-b-[#425F58] border-l-transparent mb-3"
        ></div>
        <span class="text-gray-600 font-medium">Loading dashboard...</span>
    </div>
    <section v-else>
        <LayoutHeader />
        <section>
            <DashboardPetInfo
                title="Lucky"
                :fields="fields"
                :show-edit="true"
            />
            <DashboardDietInfo
                title="Diet"
                icon="mdi:pets"
                iconLabel="Pets"
                :fields="feedingFields"
            />
            <DashboardMedicationCarousel
                title="Medications"
                icon="fluent:pill-16-filled"
                iconLabel="Pets"
                :items="[
                    {
                        name: 'Antinol EAB',
                        dosage: '15 mg',
                        frequency: '1 time per day (evening)',
                    },
                    {
                        name: 'Vitamin C',
                        dosage: '500 mg',
                        frequency: '2 times per day',
                    },
                    {
                        name: 'Vitamin C',
                        dosage: '500 mg',
                        frequency: '2 times per day',
                    },
                    {
                        name: 'Vitamin C',
                        dosage: '500 mg',
                        frequency: '2 times per day',
                    },
                ]"
                :showEdit="true"
                :hideDots="false"
            />
            <DashboardVetVisitCarousel
                title="Vet Visits"
                icon="mdi:pets"
                iconLabel="Pets"
                :items="mockVetVisits"
                :showEdit="true"
                :hideDots="true"
            />
        </section>
    </section>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import { useDashboard } from "~/composables/useDashboard";

const { isLoading, loadDashboard } = useDashboard();

const fields = ref([
	{ label: "Sex", value: "Male" },
	{ label: "Birth Date", value: "12.03.2023" },
	{ label: "Breed", value: "American Shorthair" },
	{ label: "Weight", value: "4.5kg" },
	{ label: "Microchip No.", value: "9001330003382" },
	{ label: "Color", value: "White" },
]);

const feedingFields = ref([
	{ label: "Brand & Line", value: "Royal Canine, Adult Cat" },
	{ label: "Feeding Amount", value: "26 gr" },
	{ label: "Schedule", value: "2 times per day" },
]);

const mockVetVisits = [
	{
		imageSrc: "thonglor.png",
		hospitalName: "Thonglor Pet Hospital",
		appointmentDate: dayjs().toISOString(),
		status: "pending",
	},
	{
		imageSrc: "thonglor.png",
		hospitalName: "Thonglor Pet Hospital",
		appointmentDate: dayjs().add(2, "day").toISOString(),
		status: "pending",
	},
	{
		imageSrc: "thonglor.png",
		hospitalName: "Thonglor Pet Hospital",
		appointmentDate: dayjs().subtract(3, "day").toISOString(),
		status: "completed",
	},
	{
		imageSrc: "thonglor.png",
		hospitalName: "Thonglor Pet Hospital",
		appointmentDate: dayjs().subtract(1, "day").toISOString(),
		status: "pending",
	},
];

onMounted(loadDashboard);
</script>
