<script setup lang="ts">
  import { currentUserStore } from '@/stores/currentUser.ts'

  const store = currentUserStore()

  console.log(store.user)
</script>
<template>
  <p>123</p>
</template>
