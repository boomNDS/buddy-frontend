<template>
    <Button @click="router.back()">Back</Button>
    <div class="mx-2 my-5"><h1>my pets</h1></div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>
