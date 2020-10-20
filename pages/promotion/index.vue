<template>
  <v-container>
    <v-row no-gutters class="d-flex justify-space-between align-center">
      <h1>จัดการโปรโมชัน</h1>

      <v-btn to="/promotion/add"><v-icon>mdi-plus</v-icon> เพิ่มโปรโมชัน</v-btn>
    </v-row>
    <v-row no-gutters>
      <PromotionList :loading="loading" :items="items" />
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
import { getPromotionList } from '@/api/promotion'
export default {
  data: () => ({
    items: [],
    loading: false,
    error: false,
  }),
  mounted() {
    this.loading = true
    getPromotionList()
      .then((res) => {
        this.items = res.data
        this.loading = false
      })
      .catch((err) => {
        if (err) this.error = true
        this.loading = false
      })
  },
}
</script>
