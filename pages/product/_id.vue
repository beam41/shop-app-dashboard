<template>
  <v-container class="container-height d-flex flex-column">
    <v-row
      no-gutters
      class="d-flex justify-space-between align-center flex-grow-0"
    >
      <h1>แก้ไขสินค้า</h1>
    </v-row>
    <v-row no-gutters class="d-flex justify-center pt-16">
      <ProductForm
        :loading="loading"
        :saving="saving"
        edit-mode
        :initial-value="data"
        @submit="submit"
      />
    </v-row>
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
import { getProductById, editProduct } from '@/api/product'
export default {
  data: () => ({
    loading: false,
    saving: false,
    error: false,
    data: null,
  }),
  mounted() {
    this.getProduct()
  },
  methods: {
    getProduct() {
      this.loading = true
      getProductById(this.$route.params.id)
        .then((res) => {
          this.loading = false
          this.data = res.data
        })
        .catch((err) => {
          this.loading = false
          if (err) this.error = true
        })
    },
    submit(data) {
      this.saving = true
      editProduct(this.$route.params.id, data)
        .then((res) => {
          this.saving = false
          this.$router.push('/product')
        })
        .catch((err) => {
          this.saving = false
          if (err) this.error = true
        })
    },
  },
}
</script>

<style></style>
