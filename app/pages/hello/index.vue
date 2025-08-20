<template>
  <div>
    <h1 class="text-3xl font-bold underline">Hello World</h1>
    <HelloComponent />
    <div v-if="isPending">Loading…</div>
    <div v-if="error">{{ error.message }}</div>
    <div v-if="data">{{ data.data.hello }}</div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import HelloComponent from "./_components/HelloComponent.vue";

const { data, isPending, error } = useQuery<BaseResponse<{ hello: string }>>({
  queryKey: ["hello"],
  queryFn: async () =>
    useAPI<BaseResponse<{ hello: string }>>("/hello").then((res) => res.data.value!),
});
</script>
