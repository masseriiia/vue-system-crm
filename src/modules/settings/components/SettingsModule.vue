<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Component } from 'vue'
import { UserCircleIcon, PaintBrushIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline'
import AppButton from '@/ui/AppButton.vue'
import { useTheme } from '@/modules/settings/composables/useTheme.ts'
import { SETTINGS_TYPE, type SettingsType } from '@/modules/settings/constants/settings'
import { useUserStore } from '@/app/stores/useUserStore.ts'
import SettingsProfile from '@/modules/settings/SettingsProfile.vue'
import SettingsSecurity from '@/modules/settings/components/SettingsSecurity.vue'
import SettingsAppearance from '@/modules/settings/components/SettingsAppearance.vue'

interface ITabs {
    id: number
    title: string,
    active: SettingsType,
    icon: Component
}

const { user } = useUserStore()
const { theme, setTheme } = useTheme()
const tabs: ITabs[] = [
    {
        id: 1,
        title: 'Профиль',
        active: SETTINGS_TYPE.PROFILE,
        icon: UserCircleIcon
    },
    {
        id: 2,
        title: 'Внешний вид',
        active: SETTINGS_TYPE.APPEARANCE,
        icon: PaintBrushIcon
    },
    {
        id: 3,
        title: 'Безопасность',
        active: SETTINGS_TYPE.SECURITY,
        icon: ShieldCheckIcon
    },
]

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
                <AppButton v-for="tab of tabs" :key="tab.id"
                           :active="activeTab === tab.active"
                           variant="ghost-secondary"
                           @click="toggleTab(tab.active)"
                >
                    <tab.icon class="w-5 h-5" />
                    <p class="font-medium">{{ tab.title }}</p>
                </AppButton>
            </div>

            <!-- контент -->
            <div v-if="activeTab === SETTINGS_TYPE.PROFILE" class="flex-1 bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <SettingsProfile title="Профиль" description="Настройки профиля" :data="user"/>
            </div>
            <div v-if="activeTab === SETTINGS_TYPE.APPEARANCE" class="flex-1 bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <SettingsAppearance
                    title="Настройки внешнего вида"
                    description="Настройте интерфейс под себя"
                    v-model="theme"
                    @change-event="setTheme"
                />
            </div>
            <div v-if="activeTab === SETTINGS_TYPE.SECURITY" class="flex-1 bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <SettingsSecurity
                    title="Безопасность"
                    description="Настройки безопасности"
                />
            </div>
        </div>
    </div>
</template>
