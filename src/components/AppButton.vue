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
    primary: 'btn btn-outline',
    secondary: 'font-medium underline',
    ghost: 'flex items-center gap-4 px-4 py-3 rounded-lg cursor-pointer hover:bg-slate-700 hover:shadow-lg',
    'ghost-secondary':
        'flex items-center justify-center gap-4 px-4 py-3 rounded-lg cursor-pointer hover:bg-slate-700 hover:shadow-lg',
}
</script>

<template>
    <component
        :is="to ? RouterLink : 'button'"
        :to="to"
        :class="[variantClasses[variant], active ? 'bg-slate-700' : '']"
        :disabled="to ? undefined : disabled"
    >
        <slot></slot>
    </component>
</template>
