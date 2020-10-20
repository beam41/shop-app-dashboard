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
      <template #[`item.isBroadcasted`]="{ item }">
        <v-simple-checkbox v-model="item.isBroadcasted" disabled />
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
        { text: 'เผยแพร่แล้ว', value: 'isBroadcasted' },
        { text: 'จำนวนสินค้า', value: 'promotionItemsCount' },
      ]
      return head.map((v) => ({ ...v, width: `${(1 / head.length) * 100}%` }))
    },
  },
  methods: {
    nullish,
    rowClick(item) {
      this.$router.push(`/promotion/${item.id}`)
    },
  },
}
</script>
