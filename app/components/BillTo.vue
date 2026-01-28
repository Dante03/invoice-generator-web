<script setup lang="ts">
import { useInvoice } from '@/composables/useInvoice'
const { client } = useInvoice()
</script>

<template>
  <section class="mb-10">
    <h3 class="text-sm font-semibold text-gray-600 uppercase mb-2">
      Bill to
    </h3>

    <input v-model="client.name" placeholder="Client name" class="input mb-2" />

    <input v-model="client.email" placeholder="Client email" class="input mb-2" />
    <input v-model="client.city" placeholder="Client city" class="input mb-2" />
    <input v-model="client.country" placeholder="Client coutry" class="input mb-2" />

    <textarea v-model="client.address" placeholder="Client address" rows="3" class="input" />
  </section>
</template>

<style scoped>
.input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-200;
}
</style>
