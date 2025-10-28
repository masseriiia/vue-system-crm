<script setup lang="ts">
const model = defineModel()
const isActive = defineModel('touched')

defineProps<{
    type: 'text' | 'email' | 'password' | 'checkbox' | 'number'
    error: string | null
    placeholder: string
}>()

const onBlur = () => {
  isActive.value = true
}

</script>

<template>
    <input :type="type" class="input w-full" v-model="model" @blur="onBlur" :placeholder="placeholder" />
    <div class="relative pb-2">
        <span v-show="error && isActive" class="absolute pt-1 text-xs text-red-500">
            {{ error }}
        </span>
    </div>
</template>
