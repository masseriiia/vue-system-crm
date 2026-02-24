<script setup lang="ts">
interface AppAppearanceProps {
    title: string
    description: string,
}
const model = defineModel()
const emit = defineEmits<{
    (e: 'change-event', value: string): void
}>()

function setTheme(value: string) {
    emit('change-event', value)
}

withDefaults(defineProps<AppAppearanceProps>(), {})
</script>
<template>
    <div class="flex flex-col gap-4">
        <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ title }}</h2>
            <p class="text-gray-600 dark:text-gray-400">{{ description }}</p>
        </div>

        <div>
            <div class="flex flex-col gap-2">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Тема
                </label>
                <select
                    v-model="model"
                    @change="setTheme(model)"
                    class="w-full max-w-xs px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="light">Светлая</option>
                    <option value="dark">Тёмная</option>
                </select>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                    Выберите цветовую схему интерфейса
                </p>
            </div>
        </div>
    </div>
</template>
