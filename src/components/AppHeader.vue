<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
    <div class="p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <p class="text-lg font-semibold text-gray-900 dark:text-white">{{ route.meta.title }}</p>
    </div>
</template>
