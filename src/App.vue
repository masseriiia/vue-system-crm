<script setup lang="ts">
import AppSideNav from '@/components/AppSideNav.vue'
import AppHeader from '@/components/AppHeader.vue'
import { useUserStore } from '@/stores/useUserStore.ts'
import AppLoading from './components/AppLoading.vue'

const store = useUserStore()
</script>

<template>
    <RouterView v-if="!store.isLoggedIn" />

    <div v-else class="flex">
        <AppSideNav />
        <div class="flex-1 flex flex-col bg-gray-50 dark:bg-gray-800">
            <AppHeader />
            <AppLoading v-if="store.isLoading" />
            <RouterView v-else />
        </div>
    </div>
</template>
