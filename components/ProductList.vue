<template>
  <v-card width="100%" class="mt-3">
    <v-data-table
      calculate-widths
      :headers="headers"
      :items="items"
      height="calc(100vh - 143px)"
    />
  </v-card>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      headers: [
        { text: 'ชื่อ', value: 'name' },
        { text: 'ราคา', value: 'price' },
        { text: 'ประเภท', value: 'type' },
        { text: 'แสดงในร้านค้า', value: 'isVisible' },
        { text: 'อยู่ในโปรโมชั่น', value: 'inPromotion' },
        { text: 'ราคาในโปรโมชั่น', value: 'newPrice' },
      ],
    }
  },
}
</script>
