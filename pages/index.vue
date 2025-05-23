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
                :items="vetVisits"
                :showEdit="true"
                :hideDots="true"
            />
        </section>
    </section>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { computed, onMounted } from "vue";
import { useDashboard } from "~/composables/useDashboard";

const { isLoading, dashboardData, loadDashboard } = useDashboard();

const fields = computed(() => {
    const pet = dashboardData.value?.pet;
    if (!pet) return [];
    return [
        { label: "Sex", value: pet.sex },
        { label: "Birth Date", value: pet.birthDate },
        { label: "Breed", value: pet.breed },
        { label: "Weight", value: pet.weight },
        { label: "Microchip No.", value: pet.microchip },
        { label: "Color", value: pet.color },
    ];
});

const feedingFields = computed(() => {
    const diet = dashboardData.value?.diet ?? [];
    const first = diet[0] ?? {};
    return [
        { label: "Brand & Line", value: first.brand },
        { label: "Feeding Amount", value: first.amount },
        { label: "Schedule", value: first.schedule },
    ];
});

const vetVisits = computed(() => {
    return (dashboardData.value?.visits ?? []).map((v) => {
        const visitTime = dayjs(v.time);
        return {
            imageSrc: "/images/thonglor.png", // or v.clinicLogo if you have one
            hospitalName: v.clinicName, // from your API
            appointmentDate: visitTime.toISOString(), // pass ISO into your card
            status: visitTime.isBefore(dayjs()) ? "completed" : "pending",
        };
    });
});

// const mockVetVisits = [
//     {
//         imageSrc: "thonglor.png",
//         hospitalName: "Thonglor Pet Hospital",
//         appointmentDate: dayjs().toISOString(),
//         status: "pending",
//     },
//     {
//         imageSrc: "thonglor.png",
//         hospitalName: "Thonglor Pet Hospital",
//         appointmentDate: dayjs().add(2, "day").toISOString(),
//         status: "pending",
//     },
//     {
//         imageSrc: "thonglor.png",
//         hospitalName: "Thonglor Pet Hospital",
//         appointmentDate: dayjs().subtract(3, "day").toISOString(),
//         status: "completed",
//     },
//     {
//         imageSrc: "thonglor.png",
//         hospitalName: "Thonglor Pet Hospital",
//         appointmentDate: dayjs().subtract(1, "day").toISOString(),
//         status: "pending",
//     },
// ];

onMounted(loadDashboard);
</script>
