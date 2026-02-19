<script setup lang="ts">
import { reactive, ref, type Component } from 'vue'
import {
    AdjustmentsHorizontalIcon,
    ArrowRightEndOnRectangleIcon,
    ChartBarIcon,
    UsersIcon,
    BookOpenIcon,
    ChatBubbleLeftRightIcon,
    Cog6ToothIcon,
} from '@heroicons/vue/24/solid'
import AppLogo from '@/components/AppLogo.vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore.ts'
import AppButton from '@/components/AppButton.vue'

interface INavigationItem {
    id: number
    logo: Component
    name: string
    link: string
}

const route = useRoute()
const store = useUserStore()
const isActive = ref(false)
const navigation = reactive<INavigationItem[]>([
    {
        id: 1,
        logo: ChartBarIcon,
        name: 'Дашборд',
        link: '/dashboard',
    },
    {
        id: 2,
        logo: UsersIcon,
        name: 'Клиенты',
        link: '/clients',
    },
    {
        id: 3,
        logo: BookOpenIcon,
        name: 'Каталог',
        link: '/catalogs',
    },
    {
        id: 4,
        logo: ChatBubbleLeftRightIcon,
        name: 'Сообщения',
        link: '/messages',
    },
    {
        id: 5,
        logo: Cog6ToothIcon,
        name: 'Настройки',
        link: '/settings',
    },
])

const toggleNavbar = () => {
    isActive.value = !isActive.value
}
</script>

<template>
    <div
        :class="[
            'flex flex-col bg-white dark:bg-gray-900 p-2 h-screen justify-between transition-all duration-300 ease-in-out',
            isActive ? 'w-64' : 'w-20',
        ]"
    >
        <div class="flex flex-col gap-5 transition-all duration-300 ease-in-out">
            <div :class="isActive ? 'opacity-100' : 'opacity-0'">
                <AppLogo />
            </div>

            <div class="flex flex-col items-center">
                <p
                    :class="[
                        'text-s font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider p-2',
                        isActive ? 'opacity-100' : 'opacity-0',
                    ]"
                >
                    Навигация
                </p>
                <nav class="w-full flex flex-col">
                    <AppButton
                        :key="nav.id"
                        v-for="nav in navigation"
                        :to="nav.link"
                        :active="nav.link === route.path"
                        variant="ghost"
                    >
                        <component :is="nav.logo" class="w-6 h-6" />
                        <p :class="['transition-opacity duration-300', isActive ? '' : 'hidden']">
                            {{ nav.name }}
                        </p>
                    </AppButton>
                </nav>
            </div>
        </div>
        <div class="flex flex-col">
            <AppButton variant="ghost-secondary" @click="store.logout()">
                <ArrowRightEndOnRectangleIcon class="w-8 h-8" />
                <p :class="['transition-opacity duration-300', isActive ? '' : 'hidden']">Выйти</p>
            </AppButton>
            <AppButton variant="ghost-secondary" @click="toggleNavbar">
                <AdjustmentsHorizontalIcon class="w-8 h-8" />
            </AppButton>
        </div>
    </div>
</template>
