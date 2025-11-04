<script setup lang="ts">
import AppSideNav from '@/components/AppSideNav.vue'
import AppHeader from '@/components/AppHeader.vue'
import { currentUserStore } from '@/stores/currentUser.ts'
import AppLoading from './components/AppLoading.vue'

const store = currentUserStore()
</script>

<template>
    <RouterView v-if="!store.isLoggedIn" />

    <div v-else class="flex">
        <AppSideNav />
        <div class="flex-1 flex flex-col">
            <AppHeader />
            <AppLoading v-if="store.isLoading" />
            <RouterView v-else />
        </div>
    </div>
</template>
