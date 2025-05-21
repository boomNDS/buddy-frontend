<template>
    <section>
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
                :items="[
                    {
                        imageSrc: 'thonglor.png',
                        hospitalName: 'Thonglor Pet Hospital',
                        appointmentDate: new Date().toISOString(),
                        status: 'Pending',
                    },
                    {
                        imageSrc: 'thonglor.png',
                        hospitalName: 'Thonglor Pet Hospital',
                        appointmentDate: new Date().toISOString(),
                        status: 'Pending',
                    },
                ]"
                :showEdit="true"
                :hideDots="true"
            />
        </section>
    </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

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
</script>
