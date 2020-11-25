<template>
  <v-container class="container-height d-flex flex-column">
    <v-row
      no-gutters
      class="d-flex justify-space-between align-center flex-grow-0"
    >
      <h1>เพิ่มประเภทสินค้า</h1>
    </v-row>
    <v-row no-gutters class="d-flex justify-center align-center">
      <TypeForm :saving="loading" @submit="submit" />
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
import { addType } from '@/api/type'
export default {
  data: () => ({
    loading: false,
    error: false,
  }),
  methods: {
    submit(data) {
      this.loading = true
      addType(data)
        .then((res) => {
          this.$router.push('/product-type')
          this.loading = false
        })
        .catch((err) => {
          if (err) this.error = true
          this.loading = false
        })
    },
  },
  head: () => ({
    title: 'เพิ่มประเภทสินค้า',
  }),
}
</script>

<style></style>
