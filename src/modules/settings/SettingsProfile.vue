<script setup lang="ts">
import type { IUser } from '@/modules/auth/interfaces';

interface AppProfileProps {
    title: string
    description: string,
    data: IUser | null
}

defineProps<AppProfileProps>()

</script>

<template>
    <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">{{ title}}</h2>
        <p class="text-gray-600 dark:text-gray-400">{{ description }}</p>
        <div v-if="data">
            <p>{{ `Номер пользователя: ${data.id}` }}</p>
            <p>{{ `Почта пользователя: ${data.email}` }}</p>
            <p>{{ `Роль пользователя: ${data.role}` }}</p>
        </div>
    </div>
</template>

<style>

</style>
