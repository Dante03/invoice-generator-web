<script setup lang="ts">
import { ref } from 'vue'
import { useInvoice } from '@/composables/useInvoice'
import type { InvoiceItem } from '@/types/invoice'

const { items, taxRate } = useInvoice()

const newItem = ref<InvoiceItem>({
  id: 0,
  name: '',
  type: 'SERVICE',
  price: 0,
  quantity: 1,
  discount: 0
})

const addItem = () => {
  newItem.value.id++
  items.value.push({ ...newItem.value })
  newItem.value.name = ''
}
</script>

<template>
  <section class="space-y-6">

    <!-- TAX -->
    <div>
      <label class="block text-sm font-semibold text-gray-600 mb-1">
        Tax rate (%)
      </label>
      <input type="number" v-model.number="taxRate" class="w-32 input" />
    </div>

    <h2 class="text-lg font-semibold text-gray-800">
      Add line item
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
      <input v-model="newItem.name" placeholder="Description" class="md:col-span-2 input" />
      <select v-model="newItem.type" class="input">
        <option value="SERVICE">Service</option>
        <option value="PRODUCT">Product</option>
      </select>
      <input type="number" v-model.number="newItem.price" placeholder="Price" class="input" />
      <input type="number" v-model.number="newItem.quantity" placeholder="Qty" class="input" />
      <input type="number" v-model.number="newItem.discount" placeholder="Discount %" class="input" />
    </div>

    <button @click="addItem" class="px-5 py-2 rounded-md bg-gray-900 text-white text-sm hover:bg-black">
      + Add item
    </button>

  </section>
</template>

<style scoped>
.input {
  @apply px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-200 focus:outline-none;
}
</style>
