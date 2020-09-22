<template>
  <v-card width="100%">
    <v-data-table
      calculate-widths
      :headers="headers"
      :items="items"
      :loading="loading"
      :items-per-page="5"
      dense
      @click:row="rowClick"
    >
      <template v-slot:top>
        <v-subheader>สินค้าในประเภท</v-subheader>
      </template>
      <template v-slot:[`item.isVisible`]="{ item }">
        <v-simple-checkbox v-model="item.isVisible" disabled />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
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
        { text: 'แสดงในร้านค้า', value: 'isVisible' },
      ]
      return head.map((v) => ({ ...v, width: `${(1 / head.length) * 100}%` }))
    },
  },
  methods: {
    rowClick(item) {
      this.$router.push(`/product-type/${item.id}`)
    },
  },
}
</script>
