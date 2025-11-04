<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
    <div class="p-4 bg-gray-900">
        <p class="text-lg font-semibold">{{ route.meta.title }}</p>
    </div>
</template>
