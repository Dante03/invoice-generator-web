<script setup lang="ts">
import { useInvoice } from '@/composables/useInvoice'
const { terms } = useInvoice()
</script>

<template>
  <section class="mt-6">
    <h3 class="text-sm font-semibold text-gray-600 uppercase mb-2">
      Terms
    </h3>

    <textarea v-model="terms" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm" />
  </section>
</template>
