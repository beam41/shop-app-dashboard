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
      <template #[`item.isVisible`]="{ item }">
        <v-simple-checkbox v-model="item.isVisible" disabled />
      </template>
      <template #[`item.inPromotion`]="{ item }">
        <v-simple-checkbox v-model="item.inPromotion" disabled />
      </template>
      <template #[`item.newPrice`]="{ item }">
        {{ nullish(item.newPrice, '-') }}
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { nullish } from '@/utils/nullish'
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
        { text: 'ชื่อ', value: 'name' },
        { text: 'ราคา', value: 'price' },
        { text: 'ประเภท', value: 'type' },
        { text: 'แสดงในร้านค้า', value: 'isVisible' },
        { text: 'อยู่ในโปรโมชั่น', value: 'inPromotion' },
        { text: 'ราคาในโปรโมชั่น', value: 'newPrice' },
      ]
      return head.map((v) => ({ ...v, width: `${(1 / head.length) * 100}%` }))
    },
  },
  methods: {
    nullish,
    rowClick(item) {
      this.$router.push(`/product/${item.id}`)
    },
  },
}
</script>
