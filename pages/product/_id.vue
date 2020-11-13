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
        @archive="archive"
      />
    </v-row>
    <v-snackbar v-model="error">
      เกิดปัญหาขึ้น
      <template #action="{ attrs }">
        <v-btn color="secondary" text v-bind="attrs" @click="error = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { getProductById, editProduct, archiveProduct } from '@/api/product'
export default {
  data: () => ({
    loading: false,
    saving: false,
    error: false,
    data: null,
  }),
  computed: {
    currId() {
      return this.$route.params.id
    },
  },
  mounted() {
    this.getProduct()
  },
  methods: {
    getProduct() {
      this.loading = true
      getProductById(this.currId)
        .then((res) => {
          this.data = res.data
          this.loading = false
        })
        .catch((err) => {
          if (err) this.error = true
          this.loading = false
        })
    },
    submit(data) {
      this.saving = true
      editProduct(this.currId, data)
        .then((res) => {
          this.$router.push('/product')
          this.saving = false
        })
        .catch((err) => {
          if (err) this.error = true
          this.saving = false
        })
    },
    archive() {
      this.saving = true
      archiveProduct(this.currId)
        .then((res) => {
          this.$router.push('/product')
          this.saving = false
        })
        .catch((err) => {
          if (err) this.error = true
          this.saving = false
        })
    },
  },
}
</script>

<style></style>
