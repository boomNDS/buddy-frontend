<template>
    <Button @click="router.back()">Back</Button>
    <div class="mx-2 my-5"><h1>new visit</h1></div>
    <Input type="email" placeholder="Email" />
    <Input type="date" placeholder="Email" />
    <Input type="time" placeholder="Email" />
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>
