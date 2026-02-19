<script setup lang="ts">
import { ref } from 'vue'
import { UserCircleIcon, PaintBrushIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline'
import AppButton from '@/components/AppButton.vue'
import { useTheme } from '@/composables/useTheme.ts'
import { SETTINGS_TYPE, type SettingsType } from '@/constants/settings'

const { theme, setTheme } = useTheme()
const activeTab = ref<SettingsType>('profile')

const toggleTab = (tab: SettingsType) => {
    activeTab.value = tab
}
</script>

<template>
    <div class="p-6 flex flex-col gap-3">
        <h1 class="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Настройки</h1>
        <p class="text-gray-600 dark:text-gray-400">Управляйте настройками вашего аккаунта и системы</p>

        <div class="flex gap-5 items-start">
            <!-- меню -->
            <div class="flex flex-col bg-white dark:bg-gray-900 rounded-lg p-2 border border-gray-200 dark:border-gray-700">
                <AppButton
                    :active="activeTab === 'profile'"
                    variant="ghost-secondary"
                    @click="toggleTab('profile')"
                >
                    <UserCircleIcon class="w-5 h-5" />
                    <p class="font-medium">Профиль</p>
                </AppButton>
                <AppButton
                    :active="activeTab === 'appearance'"
                    variant="ghost-secondary"
                    @click="toggleTab('appearance')"
                >
                    <PaintBrushIcon class="w-5 h-5" />
                    <p class="font-medium">Внешний вид</p>
                </AppButton>
                <AppButton
                    :active="activeTab === 'security'"
                    variant="ghost-secondary"
                    @click="toggleTab('security')"
                >
                    <ShieldCheckIcon class="w-5 h-5" />
                    <p class="font-medium">Безопасность</p>
                </AppButton>
            </div>

            <!-- контент -->
            <div v-if="activeTab === SETTINGS_TYPE.PROFILE" class="flex-1 bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Профиль</h2>
                <p class="text-gray-600 dark:text-gray-400">Настройки профиля</p>
            </div>
            <div v-if="activeTab === SETTINGS_TYPE.APPEARANCE" class="flex-1 bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <div class="flex flex-col gap-4">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Настройки внешнего вида</h2>
                        <p class="text-gray-600 dark:text-gray-400">Настройте интерфейс под себя</p>
                    </div>

                    <div>
                        <div class="flex flex-col gap-2">
                            <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Тема
                            </label>
                            <select
                                v-model="theme"
                                @change="setTheme(theme)"
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
            </div>
            <div v-if="activeTab === SETTINGS_TYPE.SECURITY" class="flex-1 bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Безопасность</h2>
                <p class="text-gray-600 dark:text-gray-400">Настройки безопасности</p>
            </div>
        </div>
    </div>
</template>
