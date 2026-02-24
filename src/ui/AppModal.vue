<script setup lang="ts"></script>

<template>
    <div class="flex bg-gray-50 dark:bg-gray-800 items-center justify-center min-h-screen">
        <div class="card bg-gray-50 dark:bg-gray-900 shadow-xl w-96">
            <div class="card-body p-4">
                <slot />
            </div>
        </div>
    </div>
</template>
