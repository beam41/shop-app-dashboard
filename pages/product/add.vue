<template>
  <v-container class="container-height d-flex flex-column">
    <v-row
      no-gutters
      class="d-flex justify-space-between align-center flex-grow-0"
    >
      <h1>เพิ่มสินค้า</h1>
    </v-row>
    <v-row no-gutters class="d-flex justify-center pt-16">
      <ProductForm :saving="loading" @submit="submit" />
    </v-row>
    <v-snackbar v-model="error">
      {{ dupe ? 'Id ของสินค้าซ้ำ' : 'เกิดปัญหาขึ้น' }}
      <template #action="{ attrs }">
        <v-btn color="secondary" text v-bind="attrs" @click="error = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { addProduct } from '@/api/product'
export default {
  data: () => ({
    loading: false,
    error: false,
    dupe: false,
  }),
  methods: {
    submit(data) {
      this.loading = true
      addProduct(data)
        .then((res) => {
          this.loading = false
          this.$router.push('/product')
        })
        .catch((err) => {
          this.loading = false
          if (err) {
            this.error = true
            this.dupe = err.response.data.message === 'duplicate'
          }
        })
    },
  },
  head: () => ({
    title: 'เพิ่มสินค้า',
  }),
}
</script>

<style></style>
