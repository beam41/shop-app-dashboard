<template>
  <v-container>
    <v-row no-gutters class="d-flex justify-space-between align-center">
      <h1>จัดการประเภทสินค้า</h1>

      <v-btn to="/product-type/add">
        <v-icon>mdi-plus</v-icon> เพิ่มประเภทสินค้า
      </v-btn>
    </v-row>
    <v-row no-gutters><TypeList :loading="loading" :items="items" /></v-row>
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
import { getTypeList } from '@/api/type'
export default {
  data: () => ({
    items: [],
    loading: false,
    error: false,
  }),
  mounted() {
    this.loading = true
    getTypeList()
      .then((res) => {
        this.items = res.data
        this.loading = false
      })
      .catch((err) => {
        if (err) this.error = true
        this.loading = false
      })
  },
   head: () => ({
    title: 'จัดการประเภทสินค้า',
  }),
}
</script>
