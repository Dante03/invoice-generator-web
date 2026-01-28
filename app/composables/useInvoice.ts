// useInvoice.ts
import { ref, computed, watch } from 'vue'
import type { InvoiceItem, Totals } from '@/types/invoice'

/* =========================
   EXISTENTE (NO SE TOCA)
========================= */
const items = ref<InvoiceItem[]>([])
const taxRate = ref(0.16)

/* =========================
   NUEVO – HEADER / COMPANY
========================= */
const company = ref({
  name: '',
  street: '',
  city: '',
  email: ''
})

/* =========================
   NUEVO – CLIENT
========================= */
const client = ref({
  name: '',
  email: '',
  address: ''
})

/* =========================
   NUEVO – INVOICE META
========================= */
const invoiceMeta = ref({
  number: 'INV-001',
  date: new Date().toISOString().substring(0, 10),
  dueDate: ''
})

/* =========================
   NUEVO – NOTES / TERMS
========================= */
const notes = ref('')
const terms = ref('')

/* =========================
   EXISTENTE (LÓGICA RESPETADA)
========================= */
const totals = computed<Totals>(() => {
  let subtotal = 0
  let discount = 0
  let tax = 0

  if (!items.value.length) {
    return {
      subtotal,
      discount,
      taxRate: taxRate.value,
      total: 0
    }
  }

  const type = items.value[0]?.type

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

/* =========================
   EXISTENTE – WATCH (NO TOCAR)
========================= */
watch(items, () => {
  const types = [...new Set(items.value.map(i => i.type))]
  if (types.length > 1) {
    alert('No se pueden mezclar productos y servicios')
    items.value.pop()
  }
}, { deep: true })

/* =========================
   NUEVO – PAYLOAD FINAL
========================= */
const invoicePayload = computed(() => ({
  company: company.value,
  client: client.value,
  invoiceMeta: invoiceMeta.value,
  items: items.value,
  notes: notes.value,
  terms: terms.value,
  taxRate: taxRate.value,
  totals: totals.value
}))

/* =========================
   EXPORT
========================= */
export const useInvoice = () => {
  return {
    // existente
    items,
    taxRate,
    totals,

    // nuevo
    company,
    client,
    invoiceMeta,
    notes,
    terms,
    invoicePayload
  }
}
