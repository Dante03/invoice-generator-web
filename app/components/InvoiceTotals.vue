<script setup lang="ts">
defineProps<{ totals: any }>()
</script>

<template>
  <section class="space-y-3 text-sm">
    <h3 class="text-base font-semibold text-gray-800 mb-4">
      Summary
    </h3>

    <div class="flex justify-between">
      <span class="text-gray-600">Subtotal</span>
      <span>${{ totals.subtotal }}</span>
    </div>

    <div class="flex justify-between">
      <span class="text-gray-600">Discount</span>
      <span>- ${{ totals.discount }}</span>
    </div>

    <div class="flex justify-between">
      <span class="text-gray-600">Tax</span>
      <span>${{ totals.taxRate }}</span>
    </div>

    <div class="flex justify-between pt-4 border-t text-lg font-semibold">
      <span>Total</span>
      <span>${{ totals.total }}</span>
    </div>
  </section>
</template>
