<template>
    <section>
        <LayoutHeader />
        <section>
            <DashboardPetInfo
                title="Lucky"
                :fields="fields"
                :show-edit="true"
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
</script>
