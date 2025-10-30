<script setup lang="ts">
defineProps<{
    to?: string
    disabled?: boolean
}>()
</script>

<template>
    <component
        :is="to ? 'RouterLink' : 'button'"
        :to="to"
        :class="to ? 'font-medium underline' : 'btn btn-outline'"
        :disabled="to ? undefined : disabled"
    >
        <slot></slot>
    </component>
</template>
