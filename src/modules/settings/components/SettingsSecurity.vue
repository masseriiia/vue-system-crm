<script setup lang="ts">
interface AppSecurityProps {
    title: string
    description: string,
}

withDefaults(defineProps<AppSecurityProps>(), {})
</script>
<template>
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ title }}</h2>
    <p class="text-gray-600 dark:text-gray-400">{{ description }}</p>
</template>