<script setup lang="ts">

const model = defineModel()

defineProps<{
  type: 'text' | 'email' | 'password' | 'checkbox' | 'number'
  error: string
  placeholder: string
}>()
</script>

<template>
  <input :type="type" class="input w-full" v-model="model" :placeholder="placeholder"/>
  <div class="relative pb-2">
    <span v-show="error" class="absolute pt-1 text-xs text-red-500">
      {{ error }}
    </span>
  </div>
</template>
