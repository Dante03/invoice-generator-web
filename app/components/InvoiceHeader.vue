<script setup lang="ts">
import { useInvoice } from '@/composables/useInvoice'
const { company, invoiceMeta } = useInvoice()
</script>

<template>
  <section class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

    <!-- LEFT: COMPANY INFO -->
    <div class="space-y-3">
      <input v-model="company.name" placeholder="Your company" class="input-lg font-semibold" />

      <input v-model="company.street" placeholder="Street address" class="input" />

      <input v-model="company.city" placeholder="City, State ZIP" class="input" />

      <input v-model="company.email" placeholder="country@email.com" class="input" />
    </div>

    <!-- RIGHT: INVOICE META -->
    <div class="space-y-3 text-sm md:text-right">
      <div>
        <label class="font-semibold text-gray-600">Invoice #</label>
        <input v-model="invoiceMeta.number" class="input-sm ml-2" />
      </div>

      <div>
        <label class="font-semibold text-gray-600">Invoice date</label>
        <input type="date" v-model="invoiceMeta.date" class="input-sm ml-2" />
      </div>

      <div>
        <label class="font-semibold text-gray-600">Due date</label>
        <input type="date" v-model="invoiceMeta.dueDate" class="input-sm ml-2" />
      </div>
    </div>

  </section>
</template>

<style scoped>
.input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-200;
}

.input-lg {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md text-xl focus:ring-2 focus:ring-blue-200;
}

.input-sm {
  @apply px-2 py-1 border border-gray-300 rounded text-sm;
}
</style>
