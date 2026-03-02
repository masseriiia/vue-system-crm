<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface AppButtonProps {
    variant?: 'primary' | 'secondary' | 'ghost' | 'ghost-secondary'
    to?: string
    disabled?: boolean
    active?: boolean
}

withDefaults(defineProps<AppButtonProps>(), {
    variant: 'primary',
    disabled: false,
})

const variantClasses = {
    primary: 'btn btn-outline text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700',
    secondary: 'font-medium underline text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white',
    ghost: 'flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-lg transition-colors',
    'ghost-secondary':
        'flex items-center justify-center gap-4 px-4 py-3 rounded-lg cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-lg transition-colors',
}
</script>

<template>
    <component
        :is="to ? RouterLink : 'button'"
        :to="to"
        :class="[variantClasses[variant], active ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : '']"
        :disabled="to ? undefined : disabled"
    >
        <slot></slot>
    </component>
</template>
