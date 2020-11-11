<template>
  <v-card width="100%" class="mt-3">
    <v-data-table
      calculate-widths
      :headers="headers"
      :items="items"
      :loading="loading"
      :items-per-page="15"
      height="calc(100vh - 143px)"
      @click:row="rowClick"
    >
      <template #[`item.createdBy`]="{ item }">
        {{ item.createdBy.username }} ({{ item.createdBy.fullName }})
      </template>
      <template #[`item.createdDate`]="{ item }">
        {{ dayjs(item.createdDate).format('D MMM BB H:mm') }}
      </template>
      <template #[`item.updatedDate`]="{ item }">
        {{ dayjs(item.updatedDate).format('D MMM BB H:mm') }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import dayjs from 'dayjs'

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    loading: Boolean,
  },
  computed: {
    headers() {
      const head = [
        { text: 'ID', value: 'id' },
        { text: 'สร้างโดย', value: 'createdBy' },
        { text: 'จำนวนสินค้าต่างชนิด', value: 'productsCount' },
        { text: 'จำนวนสินค้าทั้งหมด', value: 'amountCount' },
        { text: 'ราคาทั้งหมด', value: 'totalPrice' },
        { text: 'วันที่สร้าง', value: 'createdDate' },
        { text: 'วันที่อัพเดทล่าสุด', value: 'updatedDate' },
      ]
      return head.map((v) => ({ ...v, width: `${(1 / head.length) * 100}%` }))
    },
  },
  methods: {
    rowClick(item) {
      this.$router.push(`/order/${item.id}`)
    },
    dayjs,
  },
}
</script>
