<script setup lang="ts">
import type { InputType } from '@/app/constants'

const model = defineModel()
const isActive = defineModel('touched')

defineProps<{
    type: InputType
    error: string | null
    placeholder: string
}>()

const onBlur = () => {
    isActive.value = true
}
</script>

<template>
    <input
        :type="type"
        class="input w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
        v-model="model"
        @blur="onBlur"
        :placeholder="placeholder"
    />
    <div class="relative pb-2">
        <span v-show="error && isActive" class="absolute pt-1 text-xs text-red-500">
            {{ error }}
        </span>
    </div>
</template>
