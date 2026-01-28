<script setup lang="ts">
import { useInvoice } from '@/composables/useInvoice'
const { items } = useInvoice()

const removeItem = (index: number) => {
  items.value.splice(index, 1)
}
</script>

<template>
  <section>
    <table class="w-full text-sm">
      <thead class="text-gray-500 border-b">
        <tr>
          <th class="py-3 text-left">Item</th>
          <th class="py-3 text-left">Type</th>
          <th class="py-3 text-right">Price</th>
          <th class="py-3 text-right">Qty</th>
          <th class="py-3 text-right">Discount</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(item, i) in items" :key="i" class="border-b last:border-none">
          <td class="py-4">{{ item.name }}</td>
          <td class="py-4">
            <span class="text-xs px-2 py-1 rounded bg-gray-200">
              {{ item.type }}
            </span>
          </td>
          <td class="py-4 text-right">${{ item.price }}</td>
          <td class="py-4 text-right">{{ item.quantity }}</td>
          <td class="py-4 text-right">{{ item.discount }}%</td>
          <td class="py-4 text-right">
            <button @click="removeItem(i)" class="text-gray-400 hover:text-red-600">
              ✕
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
