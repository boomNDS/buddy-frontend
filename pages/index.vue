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
    { label: "Age", value: "29" },
    { label: "Location", value: "Bangkok" },
    { label: "Role", value: "Developer" },
    { label: "Status", value: "Active" },
    { label: "Joined", value: "2021" },
]);
</script>
