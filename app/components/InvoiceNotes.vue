<script setup lang="ts">
import { useInvoice } from '@/composables/useInvoice'
const { notes } = useInvoice()
</script>

<template>
  <section class="mt-10">
    <h3 class="text-sm font-semibold text-gray-600 uppercase mb-2">
      Notes
    </h3>

    <textarea v-model="notes" rows="4" placeholder="Additional notes"
      class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
  </section>
</template>
