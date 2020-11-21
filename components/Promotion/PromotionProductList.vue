<template>
  <v-card width="100%" :class="hasActiveInOther ? 'red lighten-5' : null">
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
      :class="hasActiveInOther ? 'red lighten-5' : null"
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
      <template #[`item.onSale`]="{ item }">
        <template v-if="item.onSale">
          <span v-if="item.onSaleCurrPromotion"> ใช่ </span>
          <span v-else class="red--text text--darken-4"> ไม่ </span>
        </template>
        <span v-else> - </span>
      </template>
      <template #[`item.actions`]="{ item }">
        <v-icon small @click="deleteItem(item.id)"> mdi-delete </v-icon>
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
    editMode: Boolean,
    hasActiveInOther: Boolean,
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
      if (this.editMode) {
        head.push(
          { text: 'กำลังลดราคาในโปรโมชันนี้', value: 'onSale' },
          { text: '', value: 'actions', sortable: false }
        )
      }
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
  methods: {
    deleteItem(id) {
      this.$emit('delete', id)
    },
  },
}
</script>
