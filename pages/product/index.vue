<template>
  <v-container>
    <v-row no-gutters class="d-flex justify-space-between align-center">
      <h1>จัดการข้อมูลสินค้า</h1>

      <v-btn to="/product/add"><v-icon>mdi-plus</v-icon> เพิ่มสินค้า</v-btn>
    </v-row>
    <v-row no-gutters><ProductList :loading="loading" :items="items" /></v-row>
    <v-snackbar v-model="error">
      เกิดปัญหาขึ้น
      <template v-slot:action="{ attrs }">
        <v-btn color="secondary" text v-bind="attrs" @click="error = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { getProductList } from '@/api/product'
export default {
  data: () => ({
    items: [],
    loading: false,
    error: false,
  }),
  mounted() {
    this.loading = true
    getProductList()
      .then((res) => {
        this.loading = false
        this.items = res.data
      })
      .catch((err) => {
        this.loading = false
        if (err) this.error = true
      })
  },
}
</script>
