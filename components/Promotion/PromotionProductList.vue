<template>
  <v-card width="100%">
    <v-card-title>
      <v-autocomplete
        v-model="append"
        :search-input.sync="search"
        :items="searchResult"
        label="ค้นหาสินค้า"
        single-line
        hide-details
        dense
      />
    </v-card-title>

    <v-data-table
      calculate-widths
      :headers="headers"
      :items="items"
      :loading="loading"
      :items-per-page="5"
      dense
    >
      <template #top>
        <v-subheader>สินค้าในโปรโมชัน</v-subheader>
      </template>
      <template #[`item.isVisible`]="{ item }">
        <v-simple-checkbox v-model="item.isVisible" disabled />
      </template>
      <template #[`item.newPrice`]="{ item }">
        <v-text-field v-model="item.newPrice" type="number" />
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { searchProduct } from '@/api/product'
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    loading: Boolean,
  },
  data: () => ({
    search: '',
    searchResult: [],
    searchLoading: false,
    append: null,
  }),
  computed: {
    headers() {
      const head = [
        { text: 'ID', value: 'id' },
        { text: 'ชื่อ', value: 'name' },
        { text: 'แสดงในร้านค้า', value: 'isVisible' },
        { text: 'ราคาปกติ', value: 'price' },
        { text: 'ราคาใหม่', value: 'newPrice' },
      ]
      return head.map((v) => ({ ...v, width: `${(1 / head.length) * 100}%` }))
    },
  },
  watch: {
    search(next) {
      if (next?.length > 0) {
        this.searchLoading = true
        searchProduct(next).then((res) => {
          this.searchResult = res.data.map((e) => ({
            text: `${e.id} - ${e.name}`,
            value: e,
          }))
          this.searchLoading = false
        })
      } else {
        this.searchResult = []
      }
    },
    append(next) {
      console.log(next)
      this.items.push({ ...next, newPrice: next.price })
    },
  },
}
</script>
