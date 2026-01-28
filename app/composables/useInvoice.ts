// useInvoice.ts
import { ref, computed, watch } from 'vue'
import type { InvoiceItem, Totals } from '@/types/invoice'

const items = ref<InvoiceItem[]>([])
const typeRef = ref('SERVICE')
const discountRef = ref(0)
const taxRate = ref(0.16)

const company = ref({
  name: '',
  city: '',
  country: '',
  address: '',
  email: ''
})

const client = ref({
  name: '',
  email: '',
  address: '',
  city: '',
  country: ''
})

const invoiceMeta = ref({
  number: 'INV-001',
  date: new Date().toISOString().substring(0, 10),
  dueDate: ''
})

const notes = ref('')
const terms = ref('')

const totals = computed<Totals>(() => {
  let subtotal = 0
  let discount = 0
  let tax = 0

  if (!items.value.length) {
    return {
      subtotal,
      discount: discountRef.value,
      taxRate: taxRate.value,
      total: 0
    }
  }

  const type = typeRef.value

  items.value.forEach(i => {
    const base = i.price * i.quantity
    const d = base * (i.discount / 100)

    subtotal += base
    discount += d

    tax += type === 'SERVICE'
      ? (base - d) * taxRate.value
      : base * taxRate.value
  })

  return {
    subtotal,
    discount,
    taxRate: taxRate.value,
    total: subtotal - discount + tax
  }
})

watch(items, () => {
  const types = [...new Set(items.value.map(i => i.type))]
  if (types.length > 1) {
    alert('No se pueden mezclar productos y servicios')
    items.value.pop()
  }
}, { deep: true })


const invoicePayload = computed(() => ({
  seller: company.value,
  client: client.value,
  invoiceMeta: invoiceMeta.value,
  items: items.value,
  notes: notes.value,
  terms: terms.value,
  type: typeRef.value,
  taxRate: taxRate.value,
  discount: discountRef.value,
  totals: totals.value
}))

export const useInvoice = () => {
  return {
    items,
    taxRate,
    totals,
    typeRef,
    discountRef,
    company,
    client,
    invoiceMeta,
    notes,
    terms,
    invoicePayload
  }
}
