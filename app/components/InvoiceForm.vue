<script setup lang="ts">
import { ref } from 'vue'
import { useInvoice } from '@/composables/useInvoice'
import type { InvoiceItem } from '@/types/invoice'

const { items, taxRate, typeRef, discountRef } = useInvoice()

const newItem = ref<InvoiceItem>({
  id: 0,
  description: '',
  type: typeRef.value,
  price: 0,
  quantity: 1,
  discount: 0
})

const addItem = () => {
  newItem.value.id++
  newItem.value.type = typeRef.value
  newItem.value.discount = discountRef.value
  items.value.push({ ...newItem.value })
  newItem.value.description = ''
}
</script>

<template>
  <section class="space-y-6">

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label class="block text-sm font-semibold text-gray-600 mb-1">
          Tax rate (%)
        </label>
        <input type="number" v-model.number="taxRate" class="w-32 input" />
      </div>
      <div>
        <label class="block text-sm font-semibold text-gray-600 mb-1">
          Type
        </label>
        <select v-model="typeRef" class="input">
          <option value="SERVICE">Service</option>
          <option value="PRODUCT">Product</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-semibold text-gray-600 mb-1">
          Discount
        </label>
        <input type="number" v-model.number="discountRef" placeholder="Discount %" class="input" />
      </div>
    </div>

    <h2 class="text-lg font-semibold text-gray-800">
      Add line item
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-6 gap-4">
      <input v-model="newItem.description" placeholder="Description" class="md:col-span-2 input" />
      <input type="number" v-model.number="newItem.price" placeholder="Price" class="input" />
      <input type="number" v-model.number="newItem.quantity" placeholder="Qty" class="input" />
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
