<script setup lang="ts">
import axios from 'axios'
const { invoicePayload } = useInvoice()

const config = useRuntimeConfig()
const { items, totals, taxRate } = useInvoice()

const generateInvoice = async () => {
    try {
        const { data } = await axios.post(
            `${config.public.apiBase}/invoices`,
            invoicePayload.value
        )
        alert('Invoice generated')

        const fileUrl = `${config.public.apiBase}/download/invoice/${data.pdf_url}`

        setTimeout(async () => {
            const response = await axios.get(fileUrl, { responseType: 'blob' })
            const blob = new Blob([response.data], { type: 'application/pdf' })
            const url = window.URL.createObjectURL(blob)
            const fileName = data.pdf_url.split('/').pop()
            const link = document.createElement('a')
            link.href = url
            link.download = fileName
            link.click()
            window.URL.revokeObjectURL(url)
        }, 5000)

    } catch (e) {
        alert('Error generating invoice')
    }
}
</script>

<template>
    <main class="min-h-screen bg-gray-100 py-10">
        <div class="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-10">

            <!-- HEADER -->
            <header class="mb-10">
                <h1 class="text-4xl font-serif text-gray-900">
                    Invoice
                </h1>
            </header>

            <!-- GRID -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">

                <!-- LEFT -->
                <div class="lg:col-span-2 space-y-10">
                    <InvoiceHeader />
                    <BillTo />

                    <InvoiceForm />
                    <InvoiceNotes />
                    <InvoiceItems />
                </div>

                <!-- RIGHT -->
                <aside class="bg-gray-50 rounded-xl p-6 h-fit sticky top-10">
                    <InvoiceTotals :totals="totals" />

                    <button @click="generateInvoice"
                        class="w-full mt-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                        Generate invoice
                    </button>
                </aside>

            </div>
        </div>
    </main>
</template>
