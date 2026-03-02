<script setup lang="ts">
import AppSideNav from '@/ui/AppSideNav.vue'
import AppHeader from '@/components/AppHeader.vue'
import { useUserStore } from '@/app/stores/useUserStore.ts'
import AppLoading from '@/ui/AppLoading.vue'

const userStore = useUserStore()
</script>

<template>
    <RouterView v-if="!userStore.isLoggedIn" />

    <div v-else class="flex">
        <AppSideNav />
        <div class="flex-1 flex flex-col bg-gray-50 dark:bg-gray-800">
            <AppHeader />
            <AppLoading v-if="userStore.isLoading" />
            <RouterView v-else />
        </div>
    </div>
</template>
